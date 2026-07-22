# Handcrafted Haven

## Project Summary

Handcrafted Haven is a semester project for WDD 430, developed by Team 05. The project explores an accessible e-commerce experience that connects independent artisans and crafters with customers looking for distinctive handmade goods.

## Project Purpose

The platform is intended to make handmade products easier to discover while giving artisans space to share their work, collections, and stories. The project emphasizes creative communities, sustainable consumption, clear product information, and an inclusive shopping experience.

## Week 03 Status

Week 03 advances the project foundation rather than delivering a complete store. The current work includes:

- A Next.js 16 application using TypeScript, ESLint, the App Router, and a `src/` directory
- A responsive landing page with a hero, featured categories, featured products, and an artisan-story section
- Reusable, typed React components and static demonstration data
- A responsive design-system demonstration
- Project scope, design, submission, and evidence planning documents
- A documented collaboration workflow
- A twelve-item work backlog for future development

Product data is static. Authentication, database access, seller tools, shopping-cart behavior, checkout, and payments have not been implemented.

## Core Semester Requirements

Later phases are planned to add authenticated seller profiles, artisan biographies and stories, product listings, a browsable catalog, category and price filters, sorting, ratings, and written reviews. The finished project will target responsive design and WCAG 2.1 Level AA accessibility, with a Next.js front end, Node.js back end, database integration, GitHub Projects planning, and Vercel deployment.

## Team Members

- Babatunde Azeez Adekola
- Lucky Ayei Inyang Eni
- Eusebio Ngoy
- Gerard Alessandro Rodrigues
- Alejandro Eliseo Valladares Crisanto

## Scheduled Team Meeting

- Wednesday at 19:00 UTC
- Peru time: Wednesday at 2:00 PM

The meeting time can change only after agreement from all team members.

## Technology

### Currently Configured

- TypeScript
- Next.js with the App Router
- React
- CSS
- ESLint
- npm
- Git and GitHub
- GitHub Projects for Week 02 backlog planning

### Planned for Later Phases

- Node.js back-end services
- Database integration
- Continued GitHub Projects implementation tracking
- Vercel deployment

## Getting Started

```bash
git clone https://github.com/alejandrovc23/wdd430-team05.git
cd wdd430-team05
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the homepage or [http://localhost:3000/design-system](http://localhost:3000/design-system) for the design-system demonstration.

## Available Scripts

- `npm run dev` starts the local development server.
- `npm run lint` checks the source code with ESLint.
- `npm run build` creates a production build.
- `npm run start` serves the production build.

## Project Structure

```text
src/app/             Next.js routes, shared layout, and global styles
src/components/      Reusable, typed interface components
src/data/            Typed static demonstration data
src/types/           Shared TypeScript interfaces
docs/                Project planning and Week 02 evidence guidance
public/images/       Local demonstration artwork
scripts/             Safe GitHub Project and collaborator helpers
```

## Documentation

- [Project scope](docs/project-scope.md)
- [Design system](docs/design-system.md)
- [Work items](docs/work-items.md)
- [Week 02 meeting summary](docs/week02-meeting-summary.md)
- [Collaboration workflow](docs/collaboration-workflow.md)
- [Canvas submission draft](docs/canvas-submission.md)
- [Submission checklist](docs/submission-checklist.md)
- [Evidence instructions](docs/evidence/README.md)

## Collaboration Workflow

Contributors work in focused feature or task branches, validate changes locally, and open pull requests for teammate review. Direct feature development on `main` is avoided. See the [collaboration workflow](docs/collaboration-workflow.md) for commands and commit conventions.

## Repository

https://github.com/alejandrovc23/wdd430-team05

## Educational Use

This repository was created for educational use in WDD 430 at BYU–Idaho.
