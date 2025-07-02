import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import PageHeader from '../layout/PageHeader';
import ProjectCard from '../ui/ProjectCard';
import { Project } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PortfolioSection: React.FC<{ id: string; onProjectClick: (project: Project) => void; }> = ({ id, onProjectClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { 
    projects, 
    isLoading, 
    error,
  } = useProjects({ limit: 6 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section id={id} className="bg-background dark:bg-gray-900/50 section-padding border-b dark:border-gray-800">
      <PageHeader 
        title={t('portfolio_section.title')}
        subtitle={t('portfolio_section.subtitle')}
      />
      
      {isLoading && (
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Загружаем проекты...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-destructive bg-red-50 dark:bg-red-900/20 rounded-lg p-8">
          <AlertCircle className="mx-auto h-12 w-12" />
          <p className="mt-4 font-semibold">Не удалось загрузить проекты</p>
        </div>
      )}

      {!isLoading && !error && projects.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Проекты еще не добавлены</h2>
          <p className="mt-2 text-muted-foreground">
            Как только проекты появятся, они будут отображены здесь.
          </p>
        </div>
      )}

      {!isLoading && !error && projects.length > 0 && (
        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 container mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard
                  id={project.id}
                  title={project.title!}
                  imageUrl={project.image_url}
                  onClick={() => onProjectClick(project)}
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center">
            <motion.button
              onClick={() => navigate('/projects')}
              className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full inline-flex items-center space-x-2 transition-colors hover:bg-primary/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t('portfolio_section.cta_button')}</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </>
      )}
    </section>
  );
};

export default PortfolioSection; 