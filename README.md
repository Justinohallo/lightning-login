# Lightning Login Demo App

A Next.js application demonstrating Lightning Login (LNURL-auth) for sovereign authentication. This app provides educational content, developer documentation, and a live demo of Lightning Login authentication.

## Overview

This application serves three main purposes:

1. **Education** - Explains Lightning Login to non-developers with clear, accessible content
2. **Developer Documentation** - Provides technical guides and code examples for developers
3. **Live Demo** - Allows users to authenticate using their Lightning wallet

## Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Validation**: Zod
- **Content Management**: Type-safe content schemas with runtime validation

### Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── components/         # Shared components (Navigation, CTAStrip, etc.)
│   ├── education/          # Education page and section components
│   ├── developer/          # Developer docs pages and components
│   ├── demo/               # Demo page
│   ├── sites/              # Sites listing page
│   └── workshop/           # Workshop/presentation page
├── content/                # Content files (TypeScript objects)
│   ├── lightning-login.education.ts
│   └── developer/
│       └── lightning-login.developer.ts
├── lib/
│   ├── content/            # Content getters with validation
│   ├── content-schemas/    # Zod schemas for content validation
│   ├── schemas/            # Re-exported schemas
│   ├── types/              # Central type exports
│   └── env.ts              # Environment variable validation
└── scripts/
    └── validate-content.ts # Content validation script
```

### Content Management

Content is managed through TypeScript files in the `src/content/` directory. All content is validated at build time and runtime using Zod schemas with discriminated unions for type safety.

- **Education Content**: `src/content/lightning-login.education.ts`
- **Developer Content**: `src/content/developer/lightning-login.developer.ts`

Content getters (`getEducationContent`, `getDeveloperContent`) use React's `cache()` for memoization and include error handling.

### Type Safety

The application uses discriminated unions for section types, eliminating the need for type assertions. Each section kind has its own schema and TypeScript type, ensuring compile-time and runtime type safety.

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Content Validation

Validate all content files before committing:

```bash
npm run validate
```

## Environment Variables

Create a `.env.local` file (see `.env.example` for template):

```env
NEXT_PUBLIC_BASE_URL=https://lightning-login.com
```

- `NEXT_PUBLIC_BASE_URL` - Base URL for the application (used in sitemap and metadata). Defaults to `https://lightning-login.com` if not set.

## Features

### Static Generation

All pages use static generation where possible:
- Home page
- Education page
- Developer documentation pages
- Dynamic developer section pages (via `generateStaticParams`)

### SEO Optimization

All pages include:
- Dynamic metadata generation
- Open Graph tags
- Twitter Card tags
- Proper canonical URLs

### Error Handling

- Global error boundary (`src/app/error.tsx`)
- Custom 404 page (`src/app/not-found.tsx`)
- Content validation error handling

### Type Safety

- Discriminated unions for section types
- Runtime validation with Zod
- Centralized type exports (`src/lib/types/index.ts`)

## Content Schema

Content is validated using Zod schemas with discriminated unions:

- **Education Sections**: hero, problem, evolution, concept, technology, comparison, summary, faq, glossary
- **Developer Sections**: overview, architecture, protocol, code-example, library, comparison, step-by-step, faq

Each section type has specific required and optional fields defined in the schema.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run validate` - Validate all content files

## Contributing

1. Make changes to content files in `src/content/`
2. Run `npm run validate` to ensure content is valid
3. Run `npm run build` to verify the build succeeds
4. Follow conventional commit methodology

## License

Private project.
