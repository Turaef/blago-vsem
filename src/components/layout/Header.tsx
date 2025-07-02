import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { X, Sun, Moon, Menu } from 'lucide-react'
import { companyInfo } from '../../data/company'
import { useTheme } from '../../contexts/ThemeContext'
import { useHeaderStyles } from '../../hooks/useHeaderStyles'

interface Section {
  id: string;
  label: string;
  href: string;
}

interface HeaderProps {
  sections: Section[]
}

const Header: React.FC<HeaderProps> = ({ sections }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const { isScrolled } = useHeaderStyles()
  const [activeSection, setActiveSection] = useState('home');

  const onHomePage = location.pathname === '/';

  const headerClasses = isScrolled || !onHomePage
    ? 'bg-surface/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg shadow-black/5' 
    : 'bg-transparent'
  
  const textColorClass = isScrolled || !onHomePage
    ? 'text-foreground' 
    : 'text-white'

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      if (!onHomePage) return;
      
      let currentSectionId = sections[0]?.id || 'home';
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (window.scrollY >= offsetTop - 100 && window.scrollY < offsetTop + offsetHeight - 100) {
            currentSectionId = section.id;
            break;
          }
        }
      }
      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onHomePage, sections]);


  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    
    if (href.startsWith('/#')) {
      const hash = href.substring(1);
      if (onHomePage) {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };
  
  const NavLink: React.FC<{ item: Section }> = ({ item }) => {
    const isActive = onHomePage
      ? activeSection === item.id
      : location.pathname === item.href;

    const linkContent = (
      <span className={`text-sm font-medium transition-colors relative ${textColorClass}`}>
        {item.label}
        {isActive && (
          <motion.div
            className={`absolute -bottom-2 left-0 right-0 h-0.5 ${isScrolled || !onHomePage ? 'bg-primary' : 'bg-white'}`}
            layoutId="underline"
            initial={false}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        )}
      </span>
    );
    
    return (
      <a href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}>
        {linkContent}
      </a>
    );
  };

  const MobileNavLink: React.FC<{ item: Section }> = ({ item }) => {
    const isActive = onHomePage ? activeSection === item.id : location.pathname === item.href;
    
    const linkContent = (
       <span className={`block text-3xl font-medium py-2 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
          {item.label}
        </span>
    );

    return (
      <a href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}>
        {linkContent}
      </a>
    );
  };
  

  const ThemeToggle = () => (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${textColorClass}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses}`}
      >
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick('/#home'); }}>
              <motion.div
                className={`flex items-center space-x-3 ${textColorClass}`}
                whileHover={{ opacity: 0.8 }}
              >
                <motion.div 
                  className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm"
                  style={{
                    backgroundColor: isScrolled || !onHomePage ? 'hsl(var(--foreground) / 0.1)' : 'hsla(0, 0%, 100%, 0.2)',
                  }}
                >
                  B
                </motion.div>
                <span className="text-lg font-semibold tracking-wide">{companyInfo.name}</span>
              </motion.div>
            </a>
            
            <div className="hidden md:flex items-center space-x-8">
              <nav>
                <ul className="flex space-x-8">
                  {sections.map(item => (
                    <li key={item.id}>
                      <NavLink item={item} />
                    </li>
                  ))}
                </ul>
              </nav>
              <ThemeToggle />
            </div>

            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(true)}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${textColorClass}`}
                aria-label="Open menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="fixed right-0 top-0 bottom-0 bg-surface shadow-2xl z-50 w-[90%] max-w-sm"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-end mb-12">
                  <motion.button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                    <X size={24} className="text-muted-foreground" />
                  </motion.button>
                </div>
                <nav className="flex-grow">
                  <ul className="space-y-4">
                    {sections.map(item => (
                      <li key={item.id}>
                        <MobileNavLink item={item} />
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-12 text-center">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header 