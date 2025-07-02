import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '../../data/services'
import PageHeader from '../layout/PageHeader'
import { ChevronRight } from 'lucide-react'
import BlurText from '../ui/BlurText'

interface ServicesSectionProps {
  id: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ id }) => {
  const [openCategory, setOpenCategory] = useState<string | null>(services[0]?.id || null)

  // Toggle function for mobile accordion
  const toggleCategory = (serviceId: string) => {
    setOpenCategory(prevId => (prevId === serviceId ? null : serviceId))
  }

  return (
    <section id={id} className="bg-background dark:bg-gray-900/50 section-padding border-b dark:border-gray-800">
      <PageHeader
        title="Наши услуги"
      />
      <div className="container">
        {/* Desktop Layout: Two Columns */}
        <div className="hidden md:grid md:grid-cols-12 gap-x-12">
          {/* Service Categories */}
          <div className="md:col-span-4">
            <ul className="space-y-1">
              {services.map(service => (
                <li key={service.id}>
                  <motion.button
                    onClick={() => setOpenCategory(service.id)}
                    className={`w-full text-left p-4 rounded-lg transition-colors duration-200 flex justify-between items-center ${
                      openCategory === service.id
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <BlurText as="span" className="font-medium" text={service.title} />
                    <ChevronRight 
                      className="transition-transform duration-300 ease-in-out" 
                      style={{ transform: openCategory === service.id ? 'rotate(90deg)' : 'rotate(0deg)' }}
                    />
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Details */}
          <div className="md:col-span-8 mt-8 md:mt-0">
            <AnimatePresence mode="wait">
              {openCategory && (
                <motion.div
                  key={openCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="bg-muted/50 p-8 rounded-xl h-full"
                >
                  <BlurText as="h3" className="text-2xl font-bold text-foreground mb-6" text={services.find(s => s.id === openCategory)?.title} />
                  <ul className="space-y-4">
                    {services.find(s => s.id === openCategory)?.items.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.05 }}
                        className="flex items-center space-x-3"
                      >
                        <ChevronRight size={16} className="text-primary flex-shrink-0" />
                        <BlurText as="span" className="text-muted-foreground" text={item} />
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Layout: Accordion */}
        <div className="md:hidden">
          <ul className="space-y-2 border-t border-border">
            {services.map(service => (
              <li key={service.id} className="border-b border-border">
                <button
                  onClick={() => toggleCategory(service.id)}
                  className="w-full text-left p-4 flex justify-between items-center"
                >
                  <BlurText as="span" className="font-medium text-foreground" text={service.title} />
                  <ChevronRight 
                    className="transition-transform duration-300 ease-in-out text-muted-foreground" 
                    style={{ transform: openCategory === service.id ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  />
                </button>
                <AnimatePresence>
                  {openCategory === service.id && (
                    <motion.div
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto', marginTop: '0px' },
                        collapsed: { opacity: 0, height: 0, marginTop: '0px' }
                      }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 px-4">
                        <ul className="space-y-3 pt-2 border-t border-border">
                          {service.items.map((item, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <ChevronRight size={16} className="text-primary flex-shrink-0 mt-1" />
                              <BlurText as="span" className="text-muted-foreground" text={item} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection 