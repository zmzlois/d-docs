---
title: Templates
description: This guide will help you configure the templates in Daytona dashboard.
sidebar:
  label: Templates
---

Templates are displayed on the right side of your Daytona dashboard when you try to create a [workspace](/usage/workspaces). You can use them to customise your Daytona dashboard in combination with [devcontainer](https://www.daytona.io/dotfiles/advanced-configuration-techniques-for-dev-container) during deployment to create workspace faster based on your requirement faster.

We will walk through how to customise them, creating workspace and repository based on templates, how you can deploy your own templates and the default templates on Daytona dashboard.

<hr/>

## Creating workspace based on templates

By creating a workspace, we assume that you have a successful Daytona deployment and gained access to a Daytona dashboard URL.

1. Open Workspace tab on dashboard

- Sign in to your Daytona dashboard in browser, on the left side-bar click on **Workspaces**.
- Click on **Create**, on the right side we have provided a set of default templates.

2. Creating a workspace based on a template

- Choose one of the templates and click on it, then click **Create** on the opened dialog.
- A new browser tab will open indicating workspace is setting up. Upon successful creation you can choose to open workspace in [**default editor**](usage/ides) (available to set up in [account settings](/usage/account#default-editor)) or **browser**, connect to workspace via **SSH** or go back to dashboard.
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

<details open>
<summary>Example: Connect to Github using Github CLI</summary>
<content>
Although our templates includes Git, you will still need to authenticate with your Git provider to push and pull to your remote repository. We are using Github as an example below.

1. Install Github CLI

- While you are connected to a running workspace, in your editor's terminal, run

```bash
sudo apt update
sudo apt install gh
```

- Then in your terminal, run the command below and select provided options based on your requirement.

```bash
gh auth login
```

2. Authenticate using Github CLI

- When you are asked for _preferred protocol for Git operation_, choose **SSH**. This command will will you either generate a new SSH key to upload to your Github account or upload your current public key.

```bash
gh auth login
```

</content>
  </details>

<details class="idp-details">
<summary>Resolving merge conflicts</summary>
<content>

```bash

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
<dd>Create a workspace to develop C++ application on Linux, a template includes Debian C++ build tools. 
<dt>
</dl>

## Customising templates

Templates are an array of JSON objects. They construct the textual and visual appearance of the templates on your dashboards.

## How to deploy with custom templates

## Creating workspace based on templates
