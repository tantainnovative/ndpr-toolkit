# NDPR-Toolkit Deployment Guide

This guide provides step-by-step instructions for deploying the NDPR-Toolkit to Vercel and setting up the CI/CD pipeline.

## Initial Setup and Push to GitHub

1. **Initialize Git Repository (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of NDPR-Toolkit"
   git branch -M main
   git remote add origin https://github.com/tantainnovative/ndpr-toolkit.git
   git push -u origin main
   ```

2. **Install Required Development Dependencies**
   ```bash
   npm install --save-dev husky lint-staged standard-version @commitlint/cli @commitlint/config-conventional
   npm run prepare
   ```

## Setting Up Vercel Deployment

### Step 1: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com) and sign up using your GitHub account
2. Connect your GitHub account if not already connected

### Step 2: Import Your GitHub Repository

1. From the Vercel dashboard, click "Add New..." > "Project"
2. Select the "tantainnovative/ndpr-toolkit" repository
3. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Install Command**: `npm ci`
   - **Output Directory**: .next (default)
4. Add any environment variables if needed
5. Click "Deploy"

### Step 3: Get Vercel Deployment Information

After deploying, you'll need to collect the following information for GitHub Actions integration:

1. **Vercel Token**:
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Click "Create" to generate a new token
   - Name it "NDPR-Toolkit GitHub Actions"
   - Copy the token value

2. **Vercel Organization ID**:
   - Go to Vercel Dashboard
   - Click on your profile picture > Settings
   - Copy the "ID" value under "Your ID"

3. **Vercel Project ID**:
   - Go to your project in the Vercel Dashboard
   - Click on "Settings" > "General"
   - Copy the "Project ID" value

### Step 4: Add Secrets to GitHub Repository

1. Go to your GitHub repository (https://github.com/tantainnovative/ndpr-toolkit)
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Add the following secrets:
   - `VERCEL_TOKEN`: Paste your Vercel token
   - `VERCEL_ORG_ID`: Paste your Organization ID
   - `VERCEL_PROJECT_ID`: Paste your Project ID

## Automated Deployments

Once set up, your deployment workflow will be:

1. **For Regular Updates**:
   - Make changes to your code
   - Commit using conventional commit format: `type(scope): description`
   - Push to the main branch
   - GitHub Actions will automatically deploy to Vercel

2. **For Releases**:
   - Go to the "Actions" tab in your GitHub repository
   - Select the "Release" workflow
   - Click "Run workflow"
   - Select the release type (patch, minor, or major)
   - Click "Run workflow"
   - This will:
     - Create a new version
     - Update the changelog
     - Create a GitHub release
     - Deploy to Vercel

## Custom Domain Setup (Optional)

To add a custom domain to your Vercel deployment:

1. Go to your project in the Vercel Dashboard
2. Click on "Settings" > "Domains"
3. Add your domain and follow the verification steps
4. Update DNS records as instructed by Vercel

## Monitoring and Analytics

Vercel provides built-in analytics and monitoring:

1. Go to your project in the Vercel Dashboard
2. Click on "Analytics" to view performance metrics
3. Click on "Logs" to view deployment and runtime logs

## Troubleshooting

If you encounter issues with your deployment:

1. Check the build logs in the Vercel Dashboard
2. Verify that all required environment variables are set
3. Ensure your Next.js configuration is compatible with Vercel
4. Check GitHub Actions logs for any errors

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
