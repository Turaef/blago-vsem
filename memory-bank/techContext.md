# Technical Context: Blago-Vsem Landing Page

## Technology Stack

### Frontend
- **React 18**: Component-based UI framework
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth transitions
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type safety and better developer experience
- **ESLint + Prettier**: Code quality and formatting

### Deployment & Integration
- **Vercel/Netlify**: Hosting platform
- **Backend Placeholder**: Contact form ready for Firebase/Supabase integration

## Architecture Decisions

### Component Structure
```
src/
├── components/
│   ├── layout/
│   ├── ui/
│   └── sections/
├── hooks/
├── utils/
└── styles/
```

### Design System
- **Colors**: Soft gradients with professional blue/gray palette
- **Typography**: Large headings, readable body text
- **Spacing**: Generous whitespace following 8px grid
- **Breakpoints**: Mobile-first responsive design

### Performance Considerations
- Code splitting for optimal loading
- Image optimization (WebP format support)
- Lazy loading for below-fold content
- Minimal bundle size

### SEO Strategy
- Semantic HTML structure
- Meta tags and Open Graph
- Structured data for business information
- Clean URL structure

## Development Environment
- Node.js 18+
- Package manager: npm/yarn
- VS Code recommended with extensions:
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets 