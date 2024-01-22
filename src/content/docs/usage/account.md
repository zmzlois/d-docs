---
title: Account Usage
description: Add a brief description of the Account Usage page here
sidebar:
  label: Account
---

Creating an account is the first entry point to manage your workspaces, teams and billing in your Daytona deployment. Account settings on the Daytona dashboard allow you to configure your development environment when you are using Daytona. These are the settings **persists with your unique account** on a Daytona deployment. They won't be shared with team members, neither change when you switch teams.

<hr/>

## Settings

Find account information, connect to different Git providers, set up your default editor and dotfiles in the **Settings** section under _Account_ on the left-hand side of the dashboard.

### Account information

- Click on _Settings_ in your Daytona dashboard, you can find information related to your account, including **ID**, **Name** and **Email**.
- The **Name** and **Email** are the ones you used to sign up for your Daytona account.
- If you encounter technical issues and contacting us either via [email](mailto:servicedesk@daytona.io) or [Slack](https://join.slack.com/t/daytonacommunity/shared_invite/zt-273yohksh-Q5YSB5V7tnQzX2RoTARr7Q) the first thing you can do is to copy your **ID**.

### Git Providers

- Information related to Git providers are under **Git Providers** on the _Settings_ page.
- On the _Settings_ page, you can connect to different Git providers, including [**GitHub**](https://github.com), [**GitLab**](https://gitlab.com), [**Bitbucket**](https://bitbucket.org), [**GitHub Enterprise Cloud**](https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-github-enterprise-cloud), [**GitLab On-premise**](https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-github-enterprise-cloud) and [**Bitbucket Server**(https://www.atlassian.com/software/bitbucket/enterprise).
- To **connect to a Git provider**, click on **𓈓** next to a selected Git provider and then click **Connect**.
- To **disconnect from a Git provider**, click on **𓈓** next to a selected Git provider and then click **Disconnect**. You will only see this option when it is connected to a Git provider (every account in Daytona needs to have at least one Git provider. If you only have one Git provider this option won't be available).
- To see more information about Git providers and how to request for organization access, please refer to [Git Providers](/configuration/git-providers).

<dl>
  <dt>Username</dt>
  <dd>The username associated with the member.</dd>
  <dt>Email</dt>
  <dd>The email associated with the member.</dd>
  <dt>Role</dt>
  <dd>The access level associated with the member.</dd>
</dl>

### Default Editor

- On the _Settings_ page, you can set up your default editor.
- Supported editors include [**VS Code**](https://code.visualstudio.com/) (includes browser and desktop version) and editors from [**JetBrains**](https://www.jetbrains.com).
- After setting up your default editor, Daytona will open the workspace in your default editor whenever you open a workspace.
- However, you can still choose to open the workspace in other editors when you open a workspace.

<hr/>

## Environment Variables

1. Environment variables on dashboard

- Log into your Daytona dashboard in your browser, click on **Environment variables** on the left.
- Click on **Add**.
- Each environment variable requires a **Name** and a **Value**. Input them as the same as a `.env` file.
- Then click on **Add** to save them.

2. Using environment variables in your workspace

- The same as how you'd be using it in your local environment, without the need to create a `.env` file.

### Separating secrets per environment

To separate secrets in production, development and staging environment, you can use products like [**Doppler**](https://www.doppler.com/), [**Hashicorp Vault**](https://www.vaultproject.io/), [**AWS Secrets Manager**](https://aws.amazon.com/secrets-manager/) and [**Infisical**](https://www.infisical.com/) or similar secret management tools.

We have a detailed guide on how to use Doppler with Daytona [here](https://www.daytona.io/dotfiles/managing-secrets-with-doppler-in-devcontainers). Following this guide, you will be able to use [Doppler's CLI](https://docs.doppler.com/docs/cli) to manage your secrets and environment variables in your workspaces across teams. It applies to secrets used in production environment, development environment and staging environment.

<hr/>

## SSH

<hr/>

## Deleting account
