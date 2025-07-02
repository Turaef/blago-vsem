import React from 'react';
import BlurText from '../ui/BlurText';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12 md:mb-16">
        <BlurText 
          as="h2" 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary flex justify-center flex-wrap"
          text={title}
          delay={50}
        />
        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
    </div>
  );
};

export default PageHeader; 