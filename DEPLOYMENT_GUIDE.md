# NDPR-Toolkit Deployment Guide

This guide provides step-by-step instructions for deploying the NDPR-Toolkit to GitHub Pages and setting up the CI/CD pipeline.

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
   npm install --save-dev husky lint-staged standard-version @commitlint/cli @commitlint/config-conventional gh-pages
   npm run prepare
   ```

## Setting Up GitHub Pages Deployment

### Step 1: Configure GitHub Repository for Pages

1. Go to your GitHub repository (https://github.com/tantainnovative/ndpr-toolkit)
2. Click on "Settings" > "Pages"
3. Under "Source", select "GitHub Actions"

### Step 2: Configure Next.js for Static Export

1. Ensure your `next.config.ts` has the following settings:
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',  // Enable static HTML export
     swcMinify: true,
     reactStrictMode: true,
     images: {
       unoptimized: true,  // Required for static export
     },
     basePath: '/ndpr-toolkit',
     assetPrefix: '/ndpr-toolkit',
   };
   ```

2. Update your package.json scripts to include:
   ```json
   "export": "next export",
   "build:static": "next build && next export",
   "deploy": "gh-pages -d out"
   ```

### Step 3: Understand the GitHub Pages Workflow

The GitHub Actions workflow (`.github/workflows/deploy-github-pages.yml`) handles the deployment process:

1. When you push to the `main` branch, it automatically:
   - Checks out your code
   - Sets up Node.js
   - Installs dependencies
   - Builds your project with static export
   - Deploys to GitHub Pages

2. The workflow uses GitHub's official Pages deployment actions:
   - `actions/configure-pages` to set up the environment
   - `actions/upload-pages-artifact` to upload the build output
   - `actions/deploy-pages` to deploy to GitHub Pages

### Step 4: Manual Deployment (Optional)

If you prefer to deploy manually without using GitHub Actions:

1. Build the static site:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

This uses the `gh-pages` package to push the `out` directory to the `gh-pages` branch.

## Automated Deployments

Once set up, your deployment workflow will be:

1. **For Regular Updates**:
   - Make changes to your code
   - Commit using conventional commit format: `type(scope): description`
   - Push to the main branch
   - GitHub Actions will automatically deploy to GitHub Pages

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
     - Deploy to GitHub Pages

## Custom Domain Setup (Optional)

To add a custom domain to your GitHub Pages site:

1. Go to your repository on GitHub
2. Click on "Settings" > "Pages"
3. Under "Custom domain", enter your domain name
4. Click "Save"
5. Update your DNS records as instructed by GitHub
6. Once verified, check "Enforce HTTPS"

## GitHub Pages Features

### Static Site Generation

GitHub Pages is optimized for static sites, which is perfect for your NDPR-Toolkit since it doesn't require server-side APIs. Benefits include:

1. Fast loading times
2. High availability
3. Free hosting
4. Automatic HTTPS

### Branch-Based Deployment

You can choose to deploy from different branches:

1. The `gh-pages` branch (when using the `gh-pages` package)
2. The `main` branch (when configured in settings)
3. A `/docs` folder in your main branch

## Monitoring and Performance

To monitor your GitHub Pages site:

1. Use GitHub's traffic insights in the repository's "Insights" tab
2. Consider adding Google Analytics or similar tools to your site
3. Use Lighthouse in Chrome DevTools to check performance

## Troubleshooting

If you encounter issues with your GitHub Pages deployment:

1. Check the GitHub Actions logs for build errors
2. Verify that your `next.config.ts` has the correct static export settings
3. Ensure all assets use relative paths with the correct `basePath`
4. Check that your repository is properly configured for GitHub Pages

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js Static Export Documentation](https://nextjs.org/docs/advanced-features/static-html-export)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
