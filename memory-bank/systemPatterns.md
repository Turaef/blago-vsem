# System Patterns: Blago-Vsem Website

## Core Architecture: Multi-Page Application (MPA) with React Router

The application has transitioned from a Single Page Application (SPA) to a Multi-Page Application structure using `react-router-dom` for client-side routing.

### Routing Pattern (`App.tsx`)
```jsx
<BrowserRouter>
  <App>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
    </Routes>
    <Footer />
  </App>
</BrowserRouter>
```

### Page & Component Structure
```
src/
├── pages/
│   ├── HomePage.tsx (Contains original sections)
│   ├── ProjectsPage.tsx (Displays masonry grid)
│   └── ProjectDetailPage.tsx (Displays project details)
│
├── components/
│   ├── ui/
│   │   └── ProjectCard.tsx (Used in ProjectsPage grid)
│   └── sections/ (Now primarily used by HomePage)
│
└── ...
```

### Data Fetching & State Management Pattern

- **Technology**: `@tanstack/react-query` is used for all server state management.
- **Data Service (`services/projectsService.ts`)**: A dedicated service class encapsulates all Supabase query logic.
  - `getProjects()`: Fetches paginated lists of projects.
  - `getProjectById()`: Fetches a single project with all its details and images.
- **Custom Hooks (`hooks/useProjects.ts`)**:
  - `useProjects()`: Uses `useInfiniteQuery` to power the paginated masonry grid on `ProjectsPage`.
  - `useProject()`: Uses `useQuery` to fetch data for a single project on `ProjectDetailPage`.

### Data Structure (`types/index.ts` & `database/schema.sql`)

- **`projects` table**: Contains core project info (title, description, cover image URL). `id` is a text-based slug.
- **`project_images` table**: Contains a list of images linked to a project via a foreign key (`project_id`).
- **Relationship**: One-to-Many (`projects` to `project_images`).

### UI Patterns

#### Masonry Grid (`ProjectsPage.tsx`)
- **Library**: `react-masonry-css`
- **Structure**:
  ```jsx
  <Masonry>
    {projects.map(p => <ProjectCard />)}
  </Masonry>
  ```
- **Styling**: Relies on global CSS classes (`.my-masonry-grid`) defined in `index.css`.

---
*The rest of the system patterns (Container, Animation, etc.) from the previous version remain valid and are still in use across the application.*

## Component Architecture

### Layout Pattern
```
App
├── Header (Navigation + Theme Toggle)
├── Main
│   ├── HeroSection
│   ├── AboutSection
│   ├── ServicesSection
│   ├── PortfolioSection
│   ├── ContactSection
│   └── MapSection
└── Footer
```

### Design Patterns

#### Container Pattern
- Consistent max-width containers
- Responsive padding/margins
- Centered content alignment

#### Section Pattern
```jsx
<section className="py-16 lg:py-24">
  <div className="container mx-auto px-4">
    <SectionHeader />
    <SectionContent />
  </div>
</section>
```

#### Animation Pattern
- Framer Motion with consistent timing
- Scroll-triggered animations
- Smooth page transitions
- Hover state enhancements

### State Management
- **Theme**: Context API for light/dark mode
- **Forms**: Controlled components with validation
- **Navigation**: Smooth scroll to sections

### Service Data Structure
```typescript
interface Service {
  id: string;
  title: string;
  description?: string;
  items: string[];
  icon?: string;
}
```

### Responsive Design Patterns
- Mobile-first approach
- Progressive enhancement
- Touch-friendly interactions
- Adaptive typography scaling

### Code Organization Patterns
- Single responsibility components
- Custom hooks for logic separation
- Utility functions for common operations
- Consistent naming conventions

### Animation Timing
- **Entry**: 0.6s ease-out
- **Hover**: 0.2s ease-in-out
- **Scroll**: 0.8s ease-in-out
- **Page transitions**: 0.4s ease-in-out 