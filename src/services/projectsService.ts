import { supabase } from '../config/supabase';
import { Project } from '../types';

export const getProjects = async ({ pageParam = 0, limit = 8 }): Promise<Project[]> => {
  const from = pageParam * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project by ID:', error);
    return null;
  }

  return data;
}; 