import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import PageHeader from '../components/layout/PageHeader';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectModal from '../components/modals/ProjectModal';
import { Project } from '../types';

const ProjectsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  const {
    projects,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useProjects({ limit: 20 });

  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    768: 2,
    500: 1
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
  };

  return (
    <>
      <div className="bg-background dark:bg-gray-900/50 section-padding min-h-screen pt-28">
        <div className="container mx-auto px-4">
          {/* Back Button - Mobile Only */}
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--muted))' }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden absolute top-28 left-4 z-10 flex items-center justify-center w-10 h-10 bg-surface/80 backdrop-blur-sm rounded-full shadow-md"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          
          <div className="relative">
            <PageHeader title="Наши проекты" />
          </div>
          
          {isLoading && !projects.length ? (
            <div className="text-center py-12">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Загружаем проекты...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-destructive bg-red-50 dark:bg-red-900/20 rounded-lg p-8">
              <AlertCircle className="mx-auto h-12 w-12" />
              <p className="mt-4 font-semibold">Не удалось загрузить проекты</p>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          ) : !projects.length ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold">Проекты не найдены</h2>
              <p className="mt-2 text-muted-foreground">
                В данный момент нет доступных проектов. Пожалуйста, зайдите позже.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={searchParams.get('category') || 'all'}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="flex w-auto -ml-4"
                  columnClassName="bg-clip-padding pl-4"
                >
                  {projects.map((project, index) => (
                    <motion.div 
                      key={`${project.id}-${index}`}
                      variants={itemVariants}
                    >
                        <ProjectCard
                          id={project.id}
                          title={project.title!}
                          imageUrl={project.image_url}
                          onClick={() => setSelectedProject(project)}
                        />
                    </motion.div>
                  ))}
                </Masonry>
              </motion.div>
            </AnimatePresence>
          )}

          {hasNextPage && (
            <div className="mt-12 text-center">
              <motion.button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-semibold inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Загрузка...
                  </>
                ) : (
                  'Показать еще'
                )}
              </motion.button>
            </div>
          )}
        </div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
};

export default ProjectsPage; 