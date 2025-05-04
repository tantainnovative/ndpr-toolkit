# NDPR Toolkit v1.0.1 Release Notes

**Release Date:** May 4, 2025  
**Package:** [@tantainnovative/ndpr-toolkit](https://www.npmjs.com/package/@tantainnovative/ndpr-toolkit)  
**Version:** 1.0.1

## Overview

This release adds React 19 compatibility to the NDPR Toolkit while maintaining support for React 18. The update ensures that the toolkit can be seamlessly integrated into projects using either React version.

## What's New

### React 19 Compatibility

- Updated peer dependencies to support both React 18 and React 19
- Added installation instructions for React 19 users
- Maintained full functionality across all components with the newer React version

### Installation Notes

When using the toolkit with React 19, you may encounter peer dependency warnings with other packages in your project. To resolve these, you can use the `--legacy-peer-deps` flag:

```bash
npm install @tantainnovative/ndpr-toolkit --legacy-peer-deps
```

Alternatively, you can create a `.npmrc` file in your project root with the following content:

```
legacy-peer-deps=true
```

This will make npm ignore peer dependency conflicts during installation.

## Technical Specifications

- **Framework Compatibility**: React 18+ and React 19+
- **TypeScript Support**: Full TypeScript definitions for all components and utilities
- **Modular Architecture**: Use only what you need with tree-shakable imports
- **Customization**: Extensive theming and styling options
- **Accessibility**: WCAG 2.1 AA compliant components
- **Performance**: Optimized bundle size with minimal dependencies

## Bug Fixes

- No bug fixes in this release; this is purely a compatibility update

## Documentation Updates

- Added React 19 compatibility notes to README.md
- Updated installation instructions with guidance for handling peer dependency conflicts

## Upgrading from v1.0.0

This is a drop-in replacement for v1.0.0 with no breaking changes. To upgrade:

```bash
npm install @tantainnovative/ndpr-toolkit@1.0.1
```

Or with peer dependency resolution:

```bash
npm install @tantainnovative/ndpr-toolkit@1.0.1 --legacy-peer-deps
```

---

© 2025 Tanta Innovative. All rights reserved.
