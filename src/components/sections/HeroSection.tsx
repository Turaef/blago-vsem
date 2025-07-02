import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { companyInfo } from '../../data/company'
import Counter from '../ui/Counter'
import BlurText from '../ui/BlurText'
import { useTranslation } from 'react-i18next'

interface HeroSectionProps {
  id: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ id }) => {
  const { t } = useTranslation();

  // Use the specific hero image provided by the user
  const heroImageUrl = "https://qmphisoosproujqqrqaa.supabase.co/storage/v1/object/public/gallery/8%20%283%29%20%282%29.jpg"
  
  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDiscussProjectClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={id} className="min-h-screen flex items-center relative overflow-hidden bg-surface">
      {/* Static Background Image from Supabase */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroImageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-black/20 dark:from-black/80 dark:via-black/50 dark:to-black/30" />

      <div className="relative z-20 w-full">
        <div className="container">
          <div className="flex items-center min-h-screen py-20">
            <div className="max-w-3xl text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm text-white/80 mb-4 font-semibold tracking-wider uppercase"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                {companyInfo.name}
              </motion.div>

              <div style={{ textShadow: '0 2px 15px rgba(0,0,0,0.4)' }}>
                <BlurText as="h1" className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tighter">
                  {t('hero_section.main_title_1')} {t('hero_section.main_title_2')} {t('hero_section.main_title_3')} {t('hero_section.main_title_4')}
                </BlurText>
              </div>

              <div style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>
                <BlurText as="p" className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed" delay={50}>
                  {t('hero_section.subtitle')}
                </BlurText>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.button
                  onClick={handleDiscussProjectClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold group inline-flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                >
                  <span>{t('hero_section.cta_button')}</span>
                  <ArrowRight 
                    size={20} 
                    className="transition-transform duration-300 group-hover:translate-x-1" 
                  />
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-16 flex flex-wrap justify-center md:justify-start gap-8"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-3xl font-bold text-white flex items-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                    <Counter value={companyInfo.yearsOfExperience} />+
                  </div>
                  <span className="text-white/80" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>лет опыта</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-3xl font-bold text-white flex items-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                    <Counter value={companyInfo.completedProjects} />+
                  </div>
                  <span className="text-white/80" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>проектов</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-3xl font-bold text-white flex items-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                    <Counter value={companyInfo.regionsServed} />+
                  </div>
                  <span className="text-white/80" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>регионов</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 h-10 bg-white/80 rounded-full shadow-lg"
          style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        />
      </motion.div>
    </section>
  )
}

export default HeroSection 