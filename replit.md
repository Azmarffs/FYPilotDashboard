# FYPILOT - AI-Enhanced FYP Management System

## Overview

FYPILOT is a comprehensive Final Year Project (FYP) management system designed for FAST University. The platform serves three distinct user roles (Students, Faculty, and Committee) with AI-powered features including intelligent supervisor matching, automated duplicate detection, project acceptability scoring, and optimal panel generation.

The system streamlines the entire FYP lifecycle from project ideation and supervisor selection through evaluation and completion, reducing administrative overhead while improving matching quality and fairness in evaluations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component System**: Shadcn/ui (Material Design 3 variant) with Radix UI primitives
- Provides accessible, professional components suitable for academic/administrative contexts
- Customizable theming system with role-specific color schemes (blue for students, purple for faculty, teal for committee)
- Dark/light mode support with CSS custom properties

**Styling Approach**: Tailwind CSS with custom design tokens
- Design system based on Material Design 3 principles adapted for educational platforms
- Emphasizes hierarchy, scannability, and professional credibility
- Card-based layouts for managing information-dense interfaces

**Routing**: Wouter (lightweight client-side routing)
- Chosen for minimal bundle size while providing essential routing capabilities
- Role-based route organization (student routes, faculty routes, committee routes)

**State Management**: TanStack Query (React Query)
- Server state management with caching and automatic refetching
- Custom query client configuration with authentication-aware error handling
- Session-based state persistence

**Typography**: Inter (UI text) and JetBrains Mono (code/IDs)
- Professional, readable font for data-heavy interfaces

### Backend Architecture

**Runtime**: Node.js with Express.js framework
- RESTful API design for client-server communication
- Session-based authentication using express-session

**Authentication Strategy**: Username/password with server-side sessions
- Session cookies with httpOnly flag for security
- Role-based access control (student/faculty/committee roles)
- Default session timeout of 7 days

**API Structure**: 
- `/api/auth/*` - Authentication endpoints (login, logout, session check)
- Modular route registration pattern for extensibility

**Development Tooling**:
- TSX for TypeScript execution in development
- Vite middleware integration for hot module replacement
- Custom logging middleware for request/response tracking

### Data Storage

**Database**: PostgreSQL (via Neon serverless)
- Drizzle ORM for type-safe database queries
- Schema-first approach with TypeScript type inference
- WebSocket-based connection pooling for serverless environments

**Current Schema**:
- Users table with role-based access (student/faculty/committee)
- UUID primary keys for scalability
- Zod schema validation for runtime type safety

**Migration Strategy**: Drizzle Kit for schema management
- Declarative schema definitions in `shared/schema.ts`
- Migration files generated in `/migrations` directory

**Temporary Storage**: In-memory storage implementation (MemStorage)
- Provides seeded demo users for development/testing
- Interface-based design allows easy swap to database implementation
- Used during initial development phase

### External Dependencies

**UI Component Libraries**:
- Radix UI primitives (17+ components for accessibility)
- Recharts for data visualization (analytics charts, trends)
- CMDK for command palette functionality
- React Hook Form with Zod resolvers for form validation

**Database & ORM**:
- @neondatabase/serverless - Serverless PostgreSQL connection
- Drizzle ORM - Type-safe database queries and migrations
- drizzle-zod - Schema validation integration

**Styling**:
- Tailwind CSS - Utility-first styling
- class-variance-authority - Component variant management
- tailwind-merge - Intelligent class merging

**Developer Experience**:
- @replit/vite-plugin-runtime-error-modal - Enhanced error display
- @replit/vite-plugin-cartographer - Code navigation
- @replit/vite-plugin-dev-banner - Development environment indicators

**Authentication & Sessions**:
- express-session - Session management
- connect-pg-simple - PostgreSQL session store (prepared for production)

**Utilities**:
- date-fns - Date manipulation and formatting
- nanoid - Unique ID generation
- clsx/cn - Conditional class name composition

### Key Architectural Decisions

**Monorepo Structure**: 
- `/client` - React frontend application
- `/server` - Express backend API
- `/shared` - Shared TypeScript types and schemas
- Rationale: Enables type sharing between frontend/backend, simplifies deployment, maintains clear separation of concerns

**Path Aliases**: 
- `@/*` for client code
- `@shared/*` for shared schemas
- Rationale: Improves import readability and refactoring ease

**Session-Based Auth vs JWT**:
- Chose express-session with cookies over JWT
- Rationale: Simpler implementation for initial version, better for server-rendered apps, easier session invalidation
- Security: httpOnly cookies prevent XSS attacks

**Component-Driven Development**:
- Reusable components in `/components` with `/examples` directory for documentation
- Separation of UI primitives (`/ui`) from composed components
- Rationale: Enables rapid prototyping, maintains consistency, facilitates testing

**Modal-Based Workflows**:
- Complex interactions (supervisor profiles, duplicate detection, panel generation) use modal dialogs
- Rationale: Maintains context, reduces navigation complexity, aligns with Material Design patterns

**Role-Based UI Customization**:
- Separate dashboard pages and navigation for each role
- Color-coded interfaces (primary color varies by role)
- Rationale: Clear role identification, reduces cognitive load, prevents errors

**AI Feature Integration Points**:
- Supervisor recommendation matching (student workflow)
- Duplicate project detection (submission workflow)
- Acceptability score prediction (submission validation)
- Panel generation optimization (committee workflow)
- Rationale: These features are designed as separate services that can be integrated via API calls