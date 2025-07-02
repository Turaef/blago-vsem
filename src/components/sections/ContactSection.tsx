import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Send } from 'lucide-react';
import { companyInfo } from '../../data/company';
import PageHeader from '../layout/PageHeader';
import { useTranslation } from 'react-i18next';

interface ContactSectionProps {
  id: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ id }) => {
  const { t } = useTranslation();

  return (
    <section id={id} className="section-padding bg-background">
      <div className="container">
        <PageHeader
          title={t('contact_section.title')}
          subtitle={t('contact_section.subtitle')}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-6">
              <a href={`tel:${companyInfo.phone}`} className="flex items-center space-x-4 group">
                <div className="bg-muted p-4 rounded-full group-hover:bg-primary transition-colors">
                  <Phone className="text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{t('footer.contacts')}</h3>
                  <p className="text-muted-foreground">{companyInfo.phone}</p>
                </div>
              </a>
              <a href={`mailto:${companyInfo.email}`} className="flex items-center space-x-4 group">
                <div className="bg-muted p-4 rounded-full group-hover:bg-primary transition-colors">
                  <Mail className="text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-muted-foreground">{companyInfo.email}</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-card p-8 rounded-2xl shadow-lg text-center">
              <h3 className="text-2xl font-bold mb-2">{t('contact_section.cta_title')}</h3>
              <p className="text-muted-foreground mb-6">{t('contact_section.cta_subtitle')}</p>
              {companyInfo.socials?.telegram && (
                <a 
                  href={companyInfo.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full inline-flex items-center space-x-2 transition-transform hover:scale-105"
                >
                  <Send size={20} />
                  <span>{t('contact_section.cta_button')}</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 