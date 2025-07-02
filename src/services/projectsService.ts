import { supabase } from '../config/supabase';
import { Project } from '../types';

class ProjectsService {
  // The getPublicUrl logic is no longer needed here if image_url is already a full URL.
  // Assuming the `image_url` from the DB is a complete, public URL.

  async getProjects({ pageParam = 0, limit = 9, category = 'all' }): Promise<{ projects: Project[], nextPage: number | null }> {
    try {
      let query = supabase
        .from('projects')
        .select('*', { count: 'exact' });

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const from = pageParam * limit;
      const to = from + limit - 1;

      query = query.order('created_at', { ascending: false }).range(from, to);
      
      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching projects:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      // The data should already match the Project type if the schema is correct.
      const projects: Project[] = data || [];
      
      const totalPages = Math.ceil((count || 0) / limit);
      const nextPage = pageParam + 1 < totalPages ? pageParam + 1 : null;

      return { projects, nextPage };
    } catch (error) {
      console.error('Error in getProjects:', error);
      throw error;
    }
  }

  async getProjectById(projectId: string): Promise<Project | null> {
    try {
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (projectError) {
        console.error(`Error fetching project ${projectId}:`, projectError);
        // Return null instead of throwing, the hook will handle the error state.
        return null;
      }
      
      // The data should already match the Project type.
      return projectData;
    } catch (error) {
      console.error(`Error in getProjectById for ${projectId}:`, error);
      throw error;
    }
  }
}

export const projectsService = new ProjectsService();
export default projectsService; 