
import Oas from 'oas'
import type { Root } from './api-type'
import type { paths } from './generated-types'
import type { OASDocument, SchemaObject } from 'oas/types'

// Put this in environment variable
export const url = 'https://api.cde.agency/v3/docs/swagger.json'
export const apiSchema = await fetch(url)
    .then(res => res.json() as unknown as Promise<OASDocument> as Promise<Root>)



export const schema = new Oas(apiSchema)

export const version = schema.getVersion()

export const authObject = apiSchema?.components?.securitySchemes

export const auth = {
    oauth: Object.keys(authObject!)[0],
    apiKey: Object.keys(authObject!)[1],
}

export const oauth = {
    type: authObject![auth.oauth].type! as string,
    scope: Object.values(authObject?.oauth2.flows!.authorizationCode.scopes)[0],
    authUrl: 'https://id.daytona.domain.com/realms/default/protocol/openid-connect/auth',
    tokenUrl: 'https://id.daytona.domain.com/realms/default/protocol/openid-connect/token',
    refreshUrl: 'https://id.daytona.domain.com/realms/default/protocol/openid-connect/token',
}

// This is not needed for now because we don't expose workspaceToken to end users.
// const apiKey = {
//     type: authObject![auth.apiKey].type! as string,
//     in: authObject![auth.apiKey].in as string,
//     name: authObject![auth.apiKey].name as string,
// }



// This returns all the response examples for a given method in a route
const responseExamples = schema.operation("/cluster", "get").getResponseExamples()

// This returns all status code for a given method in a route
// const statusCodes = schema.operation("/cluster", "get").getResponseStatusCodes()

function getSchema(refValue: string) {

    if (typeof refValue === "string" && refValue !== undefined && refValue !== null) {

        const schemaString = refValue.split("/").pop() as keyof OASDocument["components"]
        return apiSchema.components?.schemas[schemaString]["properties"]
    }
    return

}



// A function to resolve circular reference in the schema, still WIP
// pram represents the depth of nodes we are visiting, start with 0
function getRef(obj: any, pram: number) {

    if (typeof obj !== undefined && typeof obj !== null) return obj

    const keys = Object.keys(obj)
    try {
        // for every keys in the object
        for (const key of keys) {

            // if the key is "required" delete it
            // if (key === "required") delete obj[key]

            if (key == "$ref") {

                // if it is return the value of the key and strip it to get the schema
                const schemaValue = getSchema(obj[key])

                // current: if gitContext's key is ref, then key "Ref" value should be the schema

                // Should be: if gitContext's key is ref, then object["gitContex"] = schema
                obj[key] = schemaValue

            }

            if (key !== "$ref" && typeof obj[key] === "object") {

                // console.log(pram, "indices -> ", indice)
                // if it is not a $ref and it is an object
                // get the object and call the function again to check if there is a $ref in keys
                const newObj = obj[key]

                getRef(newObj, pram + 1)

            }
        }
    } catch (error) {
        console.log(error)
    }
    return obj
    // return initialObj
}


function finalResult(stepTwoSchema: any) {

    if (!stepTwoSchema) return


    const properties = stepTwoSchema.properties

    if (!properties) return
    for (let key in properties) {

        Object.keys(properties).map(key => {

            if (!key) return


            if (key === "$ref") {
                // think we should do something here? 

            }
            else if (typeof properties[key] === "object" && properties[key] !== null && properties[key] !== undefined) {

                const nested = Object.keys(properties[key])

                if (!nested) return
                nested.forEach(key2 => {
                    if (!key2) return


                    if (!Object.keys((properties[key][key2]))) return


                    const deph = Object.keys((properties[key][key2]))


                    if (key2 === "$ref") {

                        //assign the value of the $ref key to the base key
                        // create a new object with the base key and the value of the $ref key
                        //deepcopy the object
                        const layer1 = properties[key] = getSchema(properties[key][key2])
                    }


                    deph.map(key3 => {

                        if (!key3) return
                        if (key3 === "$ref") {


                            //assign the value of the $ref key to the base key 
                            // create a new object with the base key and the value of the $ref key
                            //deepcopy the object
                            const layer2 = properties[key][key2] = getSchema(properties[key][key2][key3])


                        }
                    })

                })

            }
        })


    }
    return properties
}

export function transformResponse(route: keyof paths, method?: string) {

    // in each method we get all the status code if there is more than one
    const getStatusCodes = schema.operation(route, method).getResponseStatusCodes()
    let schemaObject: SchemaObject | undefined

    // loop through each status code if there is more than one
    for (const statusCode of getStatusCodes) {

        // get the example json response for each status code

        schema
            .operation(route, method)
            .getResponseAsJSONSchema(statusCode, {
                transformer: (schema: SchemaObject) => {


                    // if the schema has a $ref key
                    if ("$ref" in schema || typeof schema["$ref"] !== "undefined") {

                        // get the value of the $ref key
                        const schemaString = schema["$ref"]?.split("/").pop()

                        // get the schema of the value from [components][schemas] based on the $ref key
                        const schemaValue = apiSchema.components?.schemas[schemaString]

                        // assign it back to the schema in response body
                        schema = schemaValue
                        // because the return of transformedResponseJson return objects with other things so we don't want it, but we want the value it finds.
                        schemaObject = schemaValue
                        // console.log("schemaObject", schemaObject)
                        return schemaObject
                    }
                }
            }
            )
        const originalSchema = schema.operation(route, method).getResponseAsJSONSchema(statusCode) ?? { description: "No Content" }

        // we have the first layer of result, but this result will contain $ref key, we need to resolve it
        const stepOneSchema = schemaObject ?? originalSchema

        // second layer of result, we want to loop through each key in the object
        const stepTwoSchema = getRef(stepOneSchema, 0)

        const result = finalResult(stepTwoSchema)
        return result
    }
}

// test if this function works
// console.log("transformResponse", transformResponse("/workspace", "post"))

const useGetRef = getRef(transformResponse("/workspace", "get"), 0)




export function getStatusCodes(route: keyof paths, method?: string) {
    return schema.operation(route, method).getResponseStatusCodes()
}

export const returnSchema = apiSchema.components?.schemas

export function transformRequest(route: keyof paths, method?: string) {

    const requestExample = schema.operation(route, method).getRequestBody() as Array<any>

    const mediaType = requestExample[0]

    const examples = getSchema(requestExample[1]["schema"]["$ref"])

    return {
        mediaType,
        examples
    }
}

// console.log("transformRequest", transformRequest("/workspace", "post"))