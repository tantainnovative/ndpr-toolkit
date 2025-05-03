# Nigerian Data Protection Compliance Toolkit (NDPR-Toolkit)

An open-source toolkit that helps Nigerian developers implement Nigeria Data Protection Regulation (NDPR) and Data Protection Act (DPA) compliant features in their web applications.

## Project Vision

This toolkit simplifies regulatory compliance for startups and businesses operating in Nigeria by providing ready-to-use components and tools for implementing data protection requirements.

## Key Components

### 1. Consent Management System
- User-friendly consent banners and modals with customizable styling
- Granular consent options (necessary, functional, analytics, marketing)
- Consent storage and retrieval mechanisms
- Consent change history tracking
- Time-stamped audit trails

### 2. Data Subject Rights Portal
- Pre-built UI components for handling:
  - Right to access personal data
  - Right to rectification
  - Right to erasure ("right to be forgotten")
  - Right to restrict processing
  - Right to data portability
  - Dashboard for data controllers to manage requests

### 3. Privacy Policy Generator
- Interactive wizard to create NDPR-compliant privacy policies
- Template system with customizable sections
- Auto-update notifications when regulatory requirements change
- Version history tracking

### 4. Data Protection Impact Assessment (DPIA) Tool
- Questionnaire-based tool to help organizations assess data processing risks
- Risk scoring matrix
- Mitigation recommendation engine
- Exportable reports for compliance documentation

### 5. Breach Notification Module
- Templates for mandatory breach notifications
- Workflow for documenting breach details
- Timeline tracking to ensure 72-hour notification compliance
- Notification delivery to authorities via API (if available)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### GitHub Pages

This project is configured to deploy automatically to GitHub Pages using GitHub Actions. When you push changes to the `main` branch, the following will happen:

1. The GitHub Actions workflow will build the project
2. The built files will be deployed to GitHub Pages
3. Your site will be available at `https://[your-username].github.io/ndpr-toolkit/`

To manually deploy to GitHub Pages:

```bash
# Build the project
npm run build

# Deploy to GitHub Pages (if you have gh-pages installed)
npm run deploy
```

#### Configuration

The GitHub Pages deployment is configured in the following files:
- `next.config.ts` - Contains the Next.js configuration for static export
- `.github/workflows/deploy.yml` - Contains the GitHub Actions workflow for automated deployment

## Technical Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- React

## License

MIT License

## Developed by

Tanta Innovative - Positioning as a thought leader in regulatory tech solutions for Nigeria
