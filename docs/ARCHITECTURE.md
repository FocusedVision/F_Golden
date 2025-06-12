# Project Architecture

This document outlines the professional structure and architecture patterns used in this Next.js application.

## 📁 Directory Structure

```
src/
├── app/                          # Next.js 13+ App Router
│   ├── (auth)/                   # Route group for auth pages
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx           # Auth-specific layout
│   ├── (dashboard)/             # Route group for dashboard pages
│   │   ├── dashboard/
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx           # Dashboard-specific layout
│   ├── globals.css
│   ├── layout.tsx               # Root layout (minimal)
│   └── page.tsx                 # Landing page
├── components/
│   ├── features/                # Feature-specific components
│   │   └── auth/
│   │       ├── RouteGuard.tsx
│   │       └── index.ts
│   ├── layout/                  # Layout-specific components
│   │   └── dashboard/
│   │       ├── DashboardLayoutClient.tsx
│   │       ├── Sidebar.tsx
│   │       ├── Breadcrumbs.tsx
│   │       └── index.ts
│   └── providers/               # Context providers
│       ├── Providers.tsx
│       └── index.ts
├── lib/                         # Utilities and configurations
├── types/                       # TypeScript type definitions
└── config/                      # Configuration files
```

## 🏗️ Architecture Patterns

### 1. Route Groups
- `(auth)` - Authentication pages with minimal layout
- `(dashboard)` - Dashboard pages with full navigation layout
- Each group has its own layout for specific UI requirements

### 2. Feature-based Organization
- Components are organized by feature/domain
- Each feature has its own directory with barrel exports
- Clear separation of concerns between different app areas

### 3. Layout Hierarchy
- **Root Layout**: Minimal, provides global providers and styling
- **Group Layouts**: Specific to route groups (auth vs dashboard)
- **Page Layouts**: Individual page-specific layouts when needed

### 4. Component Structure
- **UI Components**: Reusable, generic components
- **Feature Components**: Business logic specific components
- **Layout Components**: Navigation, headers, sidebars
- **Providers**: Context and state management

## 🔄 Benefits

### ✅ Scalability
- Easy to add new features and routes
- Clear separation between different app sections
- Modular component organization

### ✅ Maintainability
- Logical file organization
- Clear import/export patterns
- Reduced coupling between features

### ✅ Developer Experience
- Intuitive file locations
- Consistent naming conventions
- Clear architectural boundaries

### ✅ Performance
- Route-based code splitting
- Optimal layout re-rendering
- Efficient component loading

## 🚀 Best Practices

1. **Keep layouts minimal** - Only include what's necessary for each route group
2. **Use barrel exports** - Clean import statements with index.ts files
3. **Feature isolation** - Keep feature-specific code within feature directories
4. **Type safety** - Comprehensive TypeScript coverage
5. **Consistent naming** - Follow established patterns across the codebase

## 📝 Adding New Features

1. Create feature directory in `src/components/features/`
2. Add route group if needed in `src/app/`
3. Create appropriate layout for new routes
4. Add barrel exports for clean imports
5. Update types and configurations as needed 