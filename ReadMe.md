# Micro-Frontend Map Application

## Overview
This application demonstrates a micro-frontend architecture built using Vite Module Federation, React, OpenLayers, and Zustand. It consists of three parts:
- **Host**: The container app that loads remote micro-frontends.
- **Map MFE**: Renders an interactive OpenLayers map.
- **Tools MFE**: Provides file import and editing tools.

## What Did We Learn Today?
- **Module Federation Setup**: How to configure Vite's Module Federation plugin for dynamic, runtime integration.
- **Shared State Management**: Leveraging Zustand to communicate state (features) across independent MFEs.
- **Component Isolation**: Using React.lazy with Suspense to load remote components and facilitate error handling.
- **Development Efficiency**: Benefits of Vite's fast build times, HMR, and modern ES module support in speeding up development.

## Pros of Using Vite Module Federation
- **Speed**: Fast build times and hot module reloading that simplify development.
- **Simplicity**: Easier configuration compared to traditional bundlers like Webpack.
- **Modern Architecture**: Natively supports ES modules and leverages modern browser capabilities.
- **Optimized Dependency Sharing**: Reduces duplicate dependencies across micro-frontends.

## Comparative Analysis

### Vite Module Federation vs. Webpack Module Federation
- **Vite**: 
  - Offers rapid development cycles and built-in HMR.
  - Simpler configuration using modern tooling and ES modules.
- **Webpack**:
  - Provides a mature ecosystem with extensive customization options.
  - Configuration complexity is higher, particularly for Module Federation.

### Vite Module Federation vs. Single-SPA
- **Vite**:
  - Optimized for bundling and dynamic runtime integration.
  - Easier setup for projects strictly using module federation.
- **Single-SPA**:
  - Enables framework-agnostic micro-frontends with more robust routing and lifecycle management.
  - Introduces additional complexity and overhead for orchestration.

### Vite Module Federation vs. NPM Package Distribution
- **Vite Module Federation**:
  - Supports dynamic, runtime component sharing, enabling faster updates.
  - Removes the dependency on versioning and rebuilds when modifying shared code.
- **NPM Packages**:
  - Relies on static dependency management with versioning constraints.
  - Updating shared components involves package releases and potential breaking changes.

### Monorepo Architecture
- **Benefits**:
  - Centralized dependency and version management.
  - Streamlined development workflows across multiple projects.
  - Easier code sharing and unified tooling.
- **Considerations**:
  - Requires robust tooling and CI/CD processes to manage complexity as projects scale.
  - Can become unwieldy without proper project and dependency management practices.

## Installation and Local Development
1. **Install dependencies**:
    ```bash
    cd host && npm install
    cd ../mapMFE && npm install
    cd ../toolsMFE && npm install
    ```
2. **Start development servers** (order matters for dependency loading):
    ```bash
    cd mapMFE && npm run dev
    cd ../toolsMFE && npm run dev
    cd ../host && npm run dev
    ```
3. **Open** the host application at: `http://localhost:3000`

## Future Improvements
- Enhance error boundaries and logging mechanics.
- Introduce advanced routing strategies between MFEs.
- Optimize dependency sharing and bundle sizes further.
- Integrate continuous integration/deployment pipelines across projects.

## Repo Enhancement & Test Cases
This repository will be actively enhanced and may be used for additional test cases to further improve robustness and functionality.

## Contributing
Contributions are welcome! Please follow the project’s contribution guidelines for code style, commit messages, and pull requests.

## License
This project is licensed under the MIT License.
