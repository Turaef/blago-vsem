import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const genieTransition = {
  type: "spring",
  stiffness: 350,
  damping: 30,
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            className="relative bg-background dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            layoutId={`card-container-${project.id}`}
            transition={genieTransition}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <img src={project.image_url} alt={project.title || 'Project'} className="w-full h-auto max-h-[65vh] object-cover rounded-t-xl" />
              <div className="p-8">
                <h2 className="text-3xl font-bold text-primary mb-2">{project.title}</h2>
                <p className="text-sm text-muted-foreground mb-6">{project.category}</p>
                <p className="text-lg leading-relaxed">
                  Детальное описание проекта появится здесь после добавления в базу данных.
                  Этот проект относится к категории '{project.category}' и был завершен в {new Date(project.created_at!).getFullYear()}.
                </p>
              </div>
            </motion.div>
             <motion.button
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
                onClick={onClose}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <X size={24} />
              </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal; 