---
title: Templates
description: This guide will help you configure the templates in the Daytona dashboard.
sidebar:
  label: Templates
---

Templates are displayed on the right side of your Daytona dashboard when you try to create a [workspace](/usage/workspaces). You can use them to customize your Daytona dashboard in combination with [devcontainer](https://www.daytona.io/dotfiles/advanced-configuration-techniques-for-dev-container) during deployment to create workspaces faster based on your requirements.

We will walk through how to customize them, create workspaces and repository based on templates, to deploy your own templates and the default templates on the Daytona dashboard.

<hr/>

## Creating workspace based on templates

By creating a workspace, we assume that you have a successful Daytona deployment and gained access to a Daytona dashboard URL.

1. Open the Workspaces tab on Daytona dashboard

- Sign in to your Daytona dashboard in the browser, on the left sidebar click on **Workspaces**.
- Click on **Create**, on the right side we have provided a set of default templates.

2. Creating a workspace based on a template

- Choose one of the templates and click on it, then click **Create** on the opened dialog.
- A new browser tab will open indicating workspace is setting up. Upon successful creation you can choose to open the workspace in [**default editor**](usage/ides) (available to set up in [account settings](/usage/account#default-editor)) or **browser**, connect to the workspace via **SSH**, or go back to the dashboard.
- Open it in your default editor to continue.

3. (Optional) Connecting your workspace to a new Git repository

To facilitate CI/CD, you might need to reset repository URL upon template creation.

- Create a new repository in your git provider and **copy the repository URL** (we will refer to it as `https://github.com/user/repo.git`)
- When your default editor is opened, open the terminal in your editor (you will be in a terminal session connected to workspace) and run this command to set up a new remote url.

```bash
git remote add origin `https://github.com/user/repo.git`
```

- To confirm it is set up correctly, run the below command and check the value of **remote.origin.url**.

```bash
git config --list
```

<details class="idp-details">
<summary>Example: Connect to Github using Github CLI</summary>
<content>
Although our templates include Git, you will still need to authenticate with your Git provider to push and pull to your remote repository. We are using Github as an example below.

1. Install Github CLI

- While you are connected to a running workspace, in your editor's terminal, run:

```bash
sudo apt update
sudo apt install gh
```

- These commands install the Github CLI, you can see the official reference [here](https://github.com/cli/cli/blob/trunk/docs/install_linux.md#official-sources)

2. Authenticate using Github CLI

- Then in your terminal, run the command below and select the provided options based on your requirements.

```bash
gh auth login
```

- When you are asked for _preferred protocol for Git operation_, choose **SSH**.

- This command will either generate a new SSH key to upload to your Github account or upload your current public key based on your selection.

- After finishing the authentication process, you should be able to push and pull to your repository.

- Your authenticating status will persist within this workspace.

</content>
</details>

<!-- TODO: consider deleting this and let user handle the conflicts themselves -->
<details class="idp-details">
<summary>Resolving merge conflicts</summary>
<content>
In a scenario you created the repository on GitHub with a license file, README.md and other initial configurations.

Your push/pull might fail and you are prompted to resolve merge conflicts. You can run this command to allow unrelated histories from the remote to be merged with local files.

```bash
git merge --allow-unrelated-histories origin/main

```

</content>
</details>

<hr/>

## Default Templates

Our default templates includes different based image and languages.

<!-- https://raw.githubusercontent.com/daytonaio-templates/index/main/templates.json -->
<dl>
<dt>Alpine</dt>
<dd>Create a workspace using Alpine as base image with Git installed.</dd>
<dt>Debian</dt>
<dd>Create a workspace using Debian as base image with Git installer</dd>
<dt>Ubuntu</dt>
<dd>Create a workspace using Ubuntu as base image with Git and other common utilities installed</dd>
<dt>C/C++</dt>
<dd>Create a workspace to develop C++ applications on Linux, a template includes Debian C++ build tools.
<dt>
<dt>C# (.NET)</dt>
<dd>Create a workspace with all needed SDKs, extensions and dependencies to build C# and .NET based application.</dd>
<dt>Go</dt>
<dd>Create a workspace with appropriate runtime arguments, Go, common tools, extensions and dependencies to develop Go based applications.</dd>
<dt>Java</dt>
<dd>Create a workspace includes JDK and Java extensions to develop Java application</dd>
<dt>Node.js</dt>
<dd>Create a workspace includes Node.js, eslint, nvm and yarn to develop Node.js based applications.</dd>
<dt>PHP</dt>
<dd>Create a workspace with needed tools, extensions and dependencies to build PHP based applications.</dd>
<dt>Python</dt>
<dd>Create a workspace to build Python application with Python3.</dd>
<dt>Ruby</dt>
<dd>Create a workspace with essential utilities to build Ruby based applications.</dd>
<dt>Rust</dt>
<dd>Create a workspace with appropriate runtime arguments and everything you need to build Rust based application.</dd>
<dt>TypeScript</dt>
<dd>Create a workspace includes Node.js, eslint, nvim, yarn and Typescript compiler to build Node.js based applications in Typescript.</dd>
</dl>

:::note
If you accidentally removed all the default templates and want to add it back, or wanted to take a reference of the default templates, the configuration is [here](https://raw.githubusercontent.com/daytonaio-templates/index/main/templates.json).
:::

<hr/>

## Customizing templates

Templates are **an array of JSON objects** that include certain properties. They construct the textual and visual appearance of the templates on your dashboards.

1. Content of a template

The simplest example of a template includes below properties:

```json
[
  {
    "name": "C# (.NET)",
    "description": "Develop C# and .NET based applications. Includes all needed SDKs, extensions, and dependencies.",
    "gitUrl": "https://github.com/daytonaio-templates/dotnet",
    "imageUrl": "https://raw.githubusercontent.com/daytonaio-templates/index/main/img/dotnet.png",
    "rawReadmeUrl": "https://raw.githubusercontent.com/daytonaio-templates/dotnet/main/README.md"
  }
]
```

Your template will need to be:

- **Hosted publicly**, be it git provider or elsewhere.
- An **array** of objects is accessible as **raw content**.
- Each object needs to include the below properties and each properties are **case sensitive**:

<dl>
<dt>name</dt>
<dd>Name of the template being displayed on the Daytona dashboard</dd>
<dt>description</dt>
<dd>The description of the template. This property won't be displayed it'd be helpful to take notes when you are creating them.
<!-- TODO: try template created in one repo and see if the problem with setting remote origin URL persists.  -->
<dt>gitUrl</dt>
<dd>The content of this template.</dd>
<dt>imageUrl</dt>
<dd>An image display on the template when it is deployed to the dashboard. It supports JPG, JPEG, SVG and PNG formats. It can be a link to any public image.</dd>
<dt>rawReadmeUrl</dt>
<dd>Textual content is displayed on the pop-up dialog after you click on the selected template button on the dashboard. Helping users understand the content of the template. It has to be the raw content of a markdown file. </dd>
</dl>

2. (Optional) Obtaining raw content from a public repository

You can obtain raw content easily if the images and content of templates are available publicly with your Git provider.

We will be using README.me file as an example. You can do the same for other content.

##### Obtain raw content link from Github

- Open a public repository on GitHub in browser. In your repository's list of files, select the **README.md** file.

- In the upper right corner of the file view, click **Raw** to see the raw content.

- **Copy the URL** in the browser. This link is a raw content link suitable for the value of _rawReadmeUrl_ field.

##### Obtain raw content link from Gitlab

- Open a public repository on GitLab in the browser. In your repository's list of files, select the **README.md** file.

- In the upper right corner of the file view, click on **Open Raw** to see the raw content (hover to see **Open Raw**, the button is in between the _Download_ button and _Copy file content_ button).

- **Copy the URL** in the browser. This link is a raw content link suitable for the value of _rawReadmeUrl_ field.

##### Obtain raw content link from BitBucket

- Open a public repository on BitBucket in the browser. In your repository's list of files, select the **README.md** file.
- In the upper right corner of the file view, click on the **`𓈓`** button next to _Edit_ and select **Open raw**.

- **Copy the URL** in the browser. This link is a raw content link suitable for the value of the _rawReadmeUrl_ field.

:::danger
If your custom template is not an array object it might fail to deploy. You can use [this template](https://raw.githubusercontent.com/daytonaio-templates/index/main/templates.json) as a reference.
:::

<hr/>

## How to deploy with custom templates

You can build your own template within your organization to suit your development needs.

### Deploy custom template using Daytona installer

After you clone the [Daytona installer](http://github.com/daytonaio/installer) to your virtual machine, you can edit the shell script content to customize your template.

1. Open the shell of your virtual machine

- You can achieve this step by **SSH** into your virtual machine within your terminal.
- You can also open the shell of your virtual machine if your cloud provider supports so.

2. Editing shell script

-

### Deploy custom template on the Google Cloud Platform
