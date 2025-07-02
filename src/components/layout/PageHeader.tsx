import React from 'react';
import BlurText from '../ui/BlurText';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="text-center mb-12 md:mb-16">
        <BlurText 
          as="h2" 
          className="text-3xl md:text-4xl font-bold text-primary flex justify-center flex-wrap"
          text={title}
          delay={50}
        />
    </div>
  );
};

export default PageHeader; 