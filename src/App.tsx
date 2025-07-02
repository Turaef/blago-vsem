import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import { useTheme } from './contexts/ThemeContext';

const sections = [
  { id: 'home', label: 'Главная', href: '/#home', theme: 'light' as const },
  { id: 'about', label: 'О нас', href: '/#about', theme: 'light' as const },
  { id: 'services', label: 'Услуги', href: '/#services', theme: 'dark' as const },
  { id: 'portfolio', label: 'Наши проекты', href: '/projects', theme: 'light' as const },
  { id: 'contact', label: 'Контакты', href: '/#contact', theme: 'dark' as const },
];

function App() {
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // Combined scroll handling logic
  useEffect(() => {
    // If there is a hash, scroll to the element
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Otherwise, scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [location]); // Rerun on any location change

  return (
    <div className="bg-background text-foreground">
      <Header sections={sections} />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App; 