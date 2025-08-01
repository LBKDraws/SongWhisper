# Music Practice Tracker

## Overview

This is a full-stack music practice management application built with React, Express, and TypeScript. The app allows users to organize their songs into different practice categories (daily, weekly, bi-weekly, monthly, learned) and track their practice progress. The frontend uses a modern React setup with shadcn/ui components and TailwindCSS, while the backend is built with Express and designed to support both in-memory storage and PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: Clean UI with enhanced visual hierarchy, meaningful icons, and improved mobile/tablet experience.

## System Architecture

The application follows a monorepo structure with clearly separated client and server directories, plus a shared schema layer for type safety across the full stack.

### Directory Structure
- `client/` - React frontend application
- `server/` - Express backend server
- `shared/` - Common TypeScript types and schemas
- Configuration files at root level

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, shadcn/ui components
- **Backend**: Express, TypeScript, Node.js
- **Database**: Drizzle ORM with PostgreSQL support (Neon database)
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state, React hooks for local state
- **Build Tools**: Vite for frontend, esbuild for backend production builds

## Key Components

### Frontend Architecture
- **Component Structure**: Uses shadcn/ui design system with customizable components
- **State Management**: Custom hooks for song management with localStorage persistence
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: TailwindCSS with CSS variables for theming

### Backend Architecture
- **Server Framework**: Express with TypeScript
- **Middleware**: JSON parsing, URL encoding, request logging, error handling
- **Storage Layer**: Abstracted storage interface with in-memory implementation (ready for database integration)
- **Development Setup**: Vite integration for hot reloading in development

### Data Models
The app centers around a `Song` entity with the following structure:
- `id`: Unique identifier
- `title`: Song title (required)
- `notes`: Optional practice notes
- `category`: Practice frequency (daily, weekly, biweekly, monthly, learned)
- `dateStarted`: When practice began
- `dateCompleted`: When moved to "learned" category

## Data Flow

1. **Client-Side State**: Songs are managed through custom hooks with localStorage persistence
2. **Category Management**: Songs can be moved between practice categories
3. **CRUD Operations**: Add, edit, delete, and move songs between categories
4. **Data Persistence**: Currently uses localStorage, designed to integrate with backend API
5. **Real-time Updates**: State updates trigger immediate UI re-renders

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives via shadcn/ui
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **HTTP Client**: Built-in fetch with TanStack Query
- **Routing**: Wouter
- **Validation**: Zod with Drizzle integration

### Backend Dependencies
- **Database**: Drizzle ORM with Neon serverless PostgreSQL
- **Session Management**: connect-pg-simple for PostgreSQL sessions
- **Development**: tsx for TypeScript execution

### Development Tools
- **Build**: Vite for frontend, esbuild for backend
- **Styling**: TailwindCSS with PostCSS
- **Type Safety**: TypeScript across the entire stack
- **Code Quality**: Shared types between client and server

## Deployment Strategy

### Development
- Concurrent development server setup with Vite HMR
- Express server with middleware for API requests
- Database migrations with Drizzle Kit
- Environment variable configuration for database connection

### Production Build
- Frontend: Vite build to `dist/public`
- Backend: esbuild bundle to `dist/index.js`
- Static file serving from Express
- Database deployment with connection pooling via Neon

### Configuration
- TypeScript configuration shared across client/server
- Path aliases for clean imports
- Environment-specific builds
- Database schema management with migrations

The application is designed to scale from a simple practice tracker to a full-featured music education platform, with the architecture supporting both individual use and potential multi-user expansion.