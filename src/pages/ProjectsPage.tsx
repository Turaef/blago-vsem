import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, ServerCrash, Inbox } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getProjects } from '../services/projectsService';
import ProjectCard from '../components/ui/ProjectCard';

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: ({ pageParam = 0 }) => getProjects({ pageParam, limit: 8 }),
    getNextPageParam: (lastPage, allPages) => {
      const moreProjectsExist = lastPage.length === 8;
      if (!moreProjectsExist) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
  });

  const projects = data?.pages.flatMap(page => page) ?? [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-12 w-12 text-primary" />
          <p className="ml-4 text-lg text-muted-foreground">{t('projects_page.loading')}</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center h-64 flex flex-col justify-center items-center">
          <ServerCrash className="h-16 w-16 text-destructive mb-4" />
          <h2 className="text-2xl font-bold text-destructive">{t('projects_page.error_title')}</h2>
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <div className="text-center h-64 flex flex-col justify-center items-center">
          <Inbox className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold">{t('projects_page.not_found_title')}</h2>
          <p className="text-muted-foreground mt-2">{t('projects_page.not_found_subtitle')}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <ProjectCard
              id={project.id}
              title={project.title!}
              imageUrl={project.image_url}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-24 sm:py-32">
        <header className="mb-12">
          <button onClick={() => navigate(-1)} className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft size={16} className="mr-2" />
            {t('projects_page.go_back')}
          </button>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{t('projects_page.title')}</h1>
        </header>

        {renderContent()}

        {hasNextPage && (
          <div className="text-center mt-12">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full flex items-center justify-center mx-auto transition-colors hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
            >
              {isFetchingNextPage ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  {t('projects_page.loading_more')}
                </>
              ) : (
                t('projects_page.load_more')
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage; 