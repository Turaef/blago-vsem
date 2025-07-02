import React from 'react';
import { motion } from 'framer-motion';
import { Image, Eye } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  imageUrl: string | null;
  title: string;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, imageUrl, title, onClick }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer bg-gray-300 dark:bg-gray-700 mb-4"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      layoutId={`card-container-${id}`}
    >
      <img
        alt={title || 'Project'}
        src={imageUrl}
        loading="lazy"
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-white text-lg font-bold">{title}</h3>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 