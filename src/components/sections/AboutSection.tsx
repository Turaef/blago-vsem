import React from 'react'
import { motion } from 'framer-motion'
import { Award, Target, Shield, Users, Briefcase, Map } from 'lucide-react'
import { companyInfo } from '../../data/company'
import PageHeader from '../layout/PageHeader'
import Counter from '../ui/Counter'
import BlurText from '../ui/BlurText'
import { useTranslation } from 'react-i18next'

interface AboutSectionProps {
  id: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ id }) => {
  const { t } = useTranslation();

  const features = [
    { icon: <Award className="w-6 h-6" />, title: "Гарантия качества", description: "Высокие стандарты на каждом этапе." },
    { icon: <Target className="w-6 h-6" />, title: "Точный результат", description: "Соблюдение сроков и бюджета." },
    { icon: <Shield className="w-6 h-6" />, title: "Надежность", description: "Полная юридическая гарантия." },
    { icon: <Users className="w-6 h-6" />, title: "Команда экспертов", description: "Квалифицированные специалисты." },
  ];

  const stats = [
    { 
      icon: <Briefcase size={40} className="text-primary" />,
      value: companyInfo.yearsOfExperience,
      label: t('about_section.years_experience') 
    },
    { 
      icon: <Users size={40} className="text-primary" />,
      value: companyInfo.completedProjects, 
      label: t('about_section.completed_projects')
    },
    { 
      icon: <Map size={40} className="text-primary" />,
      value: companyInfo.regionsServed, 
      label: t('about_section.regions_served')
    }
  ];

  return (
    <section id={id} className="bg-surface section-padding border-b">
      <PageHeader title={t('about_section.title')} subtitle={t('about_section.subtitle')} />
      <div className="container">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <BlurText as="h2" className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Ваш надежный партнер в строительстве
              </BlurText>
              <BlurText as="p" className="text-base text-muted-foreground leading-relaxed mb-6" delay={50}>
                Мы предоставляем полный спектр услуг в области строительства и документации, объединяя все необходимое в одном месте. Наша цель — превзойти ваши ожидания, предлагая инновационные и надежные решения.
              </BlurText>
              <motion.div 
                className="flex flex-wrap gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary flex items-center">
                    <Counter value={companyInfo.yearsOfExperience} />+
                  </span>
                  <span className="text-muted-foreground">лет опыта</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary flex items-center">
                    <Counter value={companyInfo.completedProjects} />+
                  </span>
                  <span className="text-muted-foreground">проектов</span>
                </div>
              </motion.div>
            </div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {features.map(feature => (
                <motion.div 
                  key={feature.title} 
                  className="bg-surface-secondary p-6 rounded-lg"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <div className="text-primary mb-3">{feature.icon}</div>
                  <BlurText as="h3" className="text-md font-semibold text-foreground mb-1">{feature.title}</BlurText>
                  <BlurText as="p" className="text-sm text-muted-foreground" delay={50}>{feature.description}</BlurText>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="text-center mt-20 md:mt-28">
            <BlurText as="h3" className="text-2xl font-bold text-primary mb-4 flex justify-center flex-wrap">
              Наша миссия
            </BlurText>
            <BlurText as="p" className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed flex justify-center flex-wrap" delay={50}>
              Полностью удовлетворять потребности каждого клиента, способствуя развитию строительной отрасли и создавая устойчивую инфраструктуру для будущих поколений.
            </BlurText>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-card p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <Counter value={stat.value} />
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 