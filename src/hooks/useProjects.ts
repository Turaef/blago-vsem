import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import projectsService from '../services/projectsService';

interface ProjectsQueryOptions {
  limit?: number;
  category?: string;
}

export const useProjects = ({ limit, category = 'all' }: ProjectsQueryOptions = {}) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['projects', { category, limit }],
    queryFn: ({ pageParam }) => projectsService.getProjects({ pageParam, limit, category }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const projects = data?.pages.flatMap(page => page.projects) ?? [];

  return {
    projects,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading: status === 'pending',
    isFetchingNextPage,
  };
};

export const useProject = (projectId: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectsService.getProjectById(projectId),
    enabled: !!projectId, // Only run the query if a projectId is provided
  });
}; 