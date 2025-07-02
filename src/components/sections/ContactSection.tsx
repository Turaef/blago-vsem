import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { companyInfo } from '../../data/company';
import PageHeader from '../layout/PageHeader';

interface ContactSectionProps {
  id: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ id }) => {
  return (
    <section id={id} className="bg-background dark:bg-gray-900/50 section-padding">
      <PageHeader
        title="Свяжитесь с нами"
        subtitle="Мы всегда на связи, чтобы ответить на ваши вопросы и помочь в реализации ваших идей."
      />
      <div className="container">
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Начнем ваш проект
          </h2>
          <p className="text-lg text-muted-foreground pb-8">
            Есть вопросы или хотите обсудить проект? Свяжитесь с нами напрямую, и мы скоро ответим.
          </p>
          <div>
            {companyInfo.socials?.telegram && (
              <motion.a
                href={companyInfo.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-card border border-border rounded-full shadow-sm text-foreground font-semibold"
                whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Send size={20} />
                <span>Написать в Telegram</span>
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection; 