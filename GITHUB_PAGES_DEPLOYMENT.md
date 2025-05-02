# GitHub Pages Deployment Guide for NDPR-Toolkit

This guide will walk you through setting up GitHub Pages deployment for your NDPR-Toolkit project.

## Prerequisites

- A GitHub account with your NDPR-Toolkit repository
- Git installed on your local machine

## Step 1: Configure Your Repository for GitHub Pages

1. Ensure your repository is public (or you have GitHub Pro for private repository pages)
2. Go to your repository on GitHub (https://github.com/tantainnovative/ndpr-toolkit)
3. Click on "Settings" > "Pages"
4. Under "Source", select "GitHub Actions"

## Step 2: Configure Next.js for Static Export

The project has already been configured with:

- `next.config.ts` set with `output: 'export'` for static HTML generation
- `basePath` and `assetPrefix` configured for the GitHub Pages URL path
- Image optimization disabled with `unoptimized: true` for static export compatibility

## Step 3: Understand the Deployment Workflow

The GitHub Actions workflow (`.github/workflows/deploy-github-pages.yml`) handles:

1. Checking out your code
2. Setting up Node.js
3. Installing dependencies
4. Building your project with `npm run build`
5. Uploading the build artifacts
6. Deploying to GitHub Pages

## Step 4: Manual Deployment (Optional)

If you want to deploy manually:

1. Build the static site:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

This uses the `gh-pages` package to push the `out` directory to the `gh-pages` branch.

## Step 5: Access Your Deployed Site

Once deployed, your site will be available at:
`https://tantainnovative.github.io/ndpr-toolkit/`

## Troubleshooting

If you encounter issues with your GitHub Pages deployment:

1. Check the GitHub Actions logs for any build errors
2. Ensure your `next.config.ts` has the correct configuration for static export
3. Verify that all assets use relative paths
4. Check that your repository is properly configured for GitHub Pages

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js Static Export Documentation](https://nextjs.org/docs/advanced-features/static-html-export)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
