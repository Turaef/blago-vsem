import { Company, NavigationItem } from '../types'

export const companyInfo: Company = {
  name: 'Blago-Vsem',
  slogan: "To'liq qurilish va hujjatlashtirish xizmatlari – barchasi bir joyda",
  yearsOfExperience: 15,
  completedProjects: 500,
  regionsServed: 12,
  email: 'sultanovi98@mail.ru',
  phone: '+998 90 123 45 67',
  address: 'Tashkent, Uzbekistan',
  socials: {
    telegram: 'https://t.me/example',
    instagram: 'https://instagram.com/example',
    facebook: 'https://facebook.com/blagovsem'
  }
}

export const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Bosh sahifa', href: '#home' },
  { id: 'about', label: 'Biz haqimizda', href: '#about' },
  { id: 'services', label: 'Xizmatlar', href: '#services' },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
  { id: 'contact', label: 'Aloqa', href: '#contact' }
] 