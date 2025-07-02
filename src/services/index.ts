// Service exports
export { projectsService as ProjectsService } from './projectsService'
export { ServicesService } from './servicesService'
export { ContactService } from './contactService'

// Export main supabase client for direct access if needed
export { supabase } from '../config/supabase'

// Export types
export type * from '../types/database' 