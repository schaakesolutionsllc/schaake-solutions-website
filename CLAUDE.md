# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the marketing website for Schaake Solutions, LLC, built with Astro and deployed to AWS S3/Amplify. The site showcases two SaaS finance products:
- FLEX Equipment Finance (FLEX EF) - Currently available
- FLEX Insurance Premium Finance (FLEX IPF) - Planned for 2025

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview

# Deploy to AWS S3 and trigger Amplify deployment
npm run deploy
```

## Architecture

### Tech Stack
- **Astro** (4.16.13) - Static site generator with component-based architecture
- **Tailwind CSS** (3.4.15) - Utility-first CSS framework
- **TypeScript** - Basic type safety configuration
- **AWS S3 + Amplify** - Hosting and deployment

### Project Structure
- `/src/pages/` - Page components (routes)
  - `index.astro` - Homepage
  - `flex-equipment-finance.astro` - FLEX EF product page
  - `flex-premium-finance.astro` - FLEX IPF product page
- `/src/components/` - Reusable Astro components
- `/src/layouts/` - Page layout templates
- `/src/assets/` - Images and static assets
- `/public/` - Static files served directly
- `/dist/` - Build output (gitignored)

### Key Patterns
- Components use `.astro` files which combine HTML-like syntax with JavaScript/TypeScript
- Styling uses Tailwind utility classes
- Images are stored in `/src/assets/` and imported in components
- The site uses smooth scrolling and intersection observer for navigation highlighting