# Vercel Deployment Guide for NDPR-Toolkit

This guide will walk you through setting up Vercel deployment for your NDPR-Toolkit project.

## Prerequisites

- A GitHub account with your NDPR-Toolkit repository
- A Vercel account (you can sign up at [vercel.com](https://vercel.com) using your GitHub account)

## Step 1: Connect Your Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click on "Add New..." > "Project"
3. Select the "tantainnovative/ndpr-toolkit" repository
4. Configure your project with the following settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: Leave as default (`npm run build`)
   - **Output Directory**: Leave as default (`.next`)
   - **Install Command**: `npm ci` (for clean installs)
5. Click "Deploy"

Vercel will now build and deploy your project. Once complete, you'll receive a URL where your project is live.

## Step 2: Set Up GitHub Actions Integration

To enable automatic deployments via GitHub Actions, you need to collect the following information from Vercel:

1. **Vercel Token**:
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Click "Create" to generate a new token
   - Give it a name like "NDPR-Toolkit GitHub Actions"
   - Copy the token value

2. **Vercel Organization ID**:
   - Go to Vercel Dashboard
   - Click on your profile picture > Settings
   - Copy the "ID" value under "Your ID"

3. **Vercel Project ID**:
   - Go to your project in the Vercel Dashboard
   - Click on "Settings" > "General"
   - Copy the "Project ID" value

## Step 3: Add Secrets to GitHub Repository

1. Go to your GitHub repository (https://github.com/tantainnovative/ndpr-toolkit)
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Add the following secrets:
   - `VERCEL_TOKEN`: Paste your Vercel token
   - `VERCEL_ORG_ID`: Paste your Organization ID
   - `VERCEL_PROJECT_ID`: Paste your Project ID

## Step 4: Push Changes to Trigger Deployment

The GitHub Actions workflow is already set up in your repository. To trigger a deployment:

1. Make changes to your code
2. Commit and push to the `main` branch
3. GitHub Actions will automatically deploy your changes to Vercel

## Step 5: Preview Deployments for Pull Requests

Vercel automatically creates preview deployments for every pull request. To view a preview:

1. Create a pull request in your repository
2. Vercel will comment on the PR with a link to the preview deployment
3. Review the changes in the preview before merging

## Additional Configuration

### Custom Domain

To set up a custom domain for your NDPR-Toolkit:

1. Go to your project in the Vercel Dashboard
2. Click on "Settings" > "Domains"
3. Add your domain and follow the verification steps

### Environment Variables

To add environment variables:

1. Go to your project in the Vercel Dashboard
2. Click on "Settings" > "Environment Variables"
3. Add any required environment variables for your project

## Troubleshooting

If you encounter issues with your Vercel deployment:

1. Check the build logs in the Vercel Dashboard
2. Ensure all required environment variables are set
3. Verify that your Next.js configuration is compatible with Vercel
4. Check the GitHub Actions workflow logs for any errors

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/solutions/nextjs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
