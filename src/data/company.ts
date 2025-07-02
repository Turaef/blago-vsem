import { Company, NavigationItem } from '../types'

export const companyInfo: Company = {
  name: 'Blago-Vsem',
  slogan: "To'liq qurilish va hujjatlashtirish xizmatlari – barchasi bir joyda",
  yearsOfExperience: 15,
  completedProjects: 500,
  regionsServed: 12,
  email: 'sultanovi98@mail.ru',
  phone: '+998909979060',
  address: 'Tashkent, Uzbekistan',
  socials: {
    telegram: 'https://t.me/Isroil_Ali_Sultanov',
    instagram: 'https://www.instagram.com/ali__shoshiy?igsh=OWFzOTZoOHhiYTJ5',
  }
}

export const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'navigation.home', href: '#home' },
  { id: 'about', label: 'navigation.about', href: '#about' },
  { id: 'services', label: 'navigation.services', href: '#services' },
  { id: 'portfolio', label: 'navigation.portfolio', href: '#portfolio' },
  { id: 'contact', label: 'navigation.contact', href: '#contact' }
] 