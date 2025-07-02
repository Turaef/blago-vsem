# Blago-Vsem Backend Integration with Supabase

This project uses Supabase as the backend service for managing projects, services, and contact messages.

## 🚀 Quick Setup

### 1. Database Setup

1. Copy the SQL schema from `src/database/schema.sql`
2. Go to your Supabase project dashboard → SQL Editor
3. Paste and run the SQL to create tables and sample data

### 2. Environment Variables

Your `.env` file is already configured with:
```env
VITE_SUPABASE_URL=https://qmphisoosproujqqrqaa.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Install Dependencies
```bash
npm install @supabase/supabase-js
```

## 📁 Backend Structure

```
src/
├── config/
│   └── supabase.ts          # Supabase client configuration
├── types/
│   └── database.ts          # TypeScript database types
├── services/
│   ├── index.ts            # Export all services
│   ├── projectsService.ts  # Projects CRUD operations
│   ├── servicesService.ts  # Services CRUD operations
│   └── contactService.ts   # Contact form handling
├── hooks/
│   └── useProjects.ts      # React hooks for data fetching
└── database/
    └── schema.sql          # Database setup SQL
```

## 🗄️ Database Tables

### Projects Table
- **projects**: Portfolio projects with images, categories, and details
- **Fields**: id, title, description, category, image_url, thumbnail_url, client_name, location, area, completion_date, featured

### Services Table
- **services**: Company services and offerings
- **Fields**: id, title, description, icon, features[], price_range, duration, active

### Contact Messages Table
- **contact_messages**: Contact form submissions
- **Fields**: id, name, email, phone, subject, message, read, created_at

## 🔧 Usage Examples

### 1. Using Services in Components

```typescript
import { ProjectsService } from '../services'

// Get featured projects
const featuredProjects = await ProjectsService.getFeaturedProjects(6)

// Get projects by category
const residentialProjects = await ProjectsService.getProjectsByCategory('residential')
```

### 2. Using React Hooks

```typescript
import { useProjects } from '../hooks/useProjects'

function PortfolioSection() {
  const { projects, loading, error } = useProjects({ featured: true, limit: 6 })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  )
}
```

### 3. Contact Form Integration

```typescript
import { ContactService } from '../services'

const handleSubmit = async (formData) => {
  try {
    await ContactService.submitContactMessage({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    })
    // Show success message
  } catch (error) {
    // Handle error
  }
}
```

## 🛡️ Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Public read access** for projects and services
- **Secure contact form** submissions
- **Admin-only** access for content management

## 🔄 Available Operations

### Projects Service
- `getProjects()` - Get all projects with filtering
- `getFeaturedProjects()` - Get featured projects
- `getProjectById()` - Get single project
- `getProjectsByCategory()` - Filter by category
- `searchProjects()` - Search functionality
- `createProject()` - Admin: Create new project
- `updateProject()` - Admin: Update project
- `deleteProject()` - Admin: Delete project

### Services Service
- `getActiveServices()` - Get all active services
- `getAllServices()` - Admin: Get all services
- `getServiceById()` - Get single service
- `createService()` - Admin: Create service
- `updateService()` - Admin: Update service
- `deleteService()` - Admin: Delete service
- `toggleServiceStatus()` - Admin: Enable/disable service

### Contact Service
- `submitContactMessage()` - Submit contact form
- `getAllMessages()` - Admin: Get all messages
- `getUnreadMessagesCount()` - Admin: Unread count
- `getMessageById()` - Admin: Get single message
- `markAsRead()` - Admin: Mark message as read
- `searchMessages()` - Admin: Search messages

## 🎯 Next Steps

1. **Run the database schema** in Supabase SQL Editor
2. **Update existing components** to use the backend services
3. **Add authentication** for admin features
4. **Implement real contact form** functionality
5. **Add image upload** for project management

## 🔐 Authentication (Optional)

For admin features, you can add Supabase Auth:

```bash
# Add authentication
npm install @supabase/auth-ui-react
```

## 📊 Data Types

All TypeScript types are defined in `src/types/database.ts`:
- `Project`, `ProjectInsert`, `ProjectUpdate`
- `Service`, `ServiceInsert`, `ServiceUpdate`
- `ContactMessage`, `ContactMessageInsert`, `ContactMessageUpdate`

## 🚨 Error Handling

All services include proper error handling and logging. Errors are thrown with descriptive messages for easy debugging.

---

Your Supabase backend is now ready! The database includes sample data to get you started. 