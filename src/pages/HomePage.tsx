import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import ContactSection from '../components/sections/ContactSection';
import ProjectModal from '../components/modals/ProjectModal';
import { Project } from '../types';

const HomePage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection id="home" />
      <AboutSection id="about" />
      <ServicesSection id="services" />
      <PortfolioSection id="portfolio" onProjectClick={handleProjectClick} />
      <ContactSection id="contact" />
      
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
    </motion.div>
  );
};

export default HomePage; 