import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, ArrowUp, Send, Instagram, Facebook } from 'lucide-react'
import { companyInfo } from '../../data/company'

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialIcons = {
    telegram: <Send size={20} />,
    instagram: <Instagram size={20} />,
    facebook: <Facebook size={20} />,
  }

  return (
    <footer className="bg-surface-secondary">
      <div className="container py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-lg">
                B
              </div>
              <span className="text-xl font-bold text-primary">{companyInfo.name}</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              {companyInfo.slogan}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary" />
                <a href={`tel:${companyInfo.phone}`} className="text-muted-foreground hover:text-primary transition-colors">{companyInfo.phone}</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary" />
                <a href={`mailto:${companyInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors">{companyInfo.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Соц. сети</h3>
            <div className="flex space-x-4">
              {companyInfo.socials?.telegram && (
                <a href={companyInfo.socials.telegram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  {socialIcons.telegram}
                </a>
              )}
              {companyInfo.socials?.instagram && (
                <a href={companyInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  {socialIcons.instagram}
                </a>
              )}
              {companyInfo.socials?.facebook && (
                <a href={companyInfo.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  {socialIcons.facebook}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted text-sm text-center sm:text-left">
            © {new Date().getFullYear()} {companyInfo.name}. Все права защищены.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 sm:mt-0 p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer 