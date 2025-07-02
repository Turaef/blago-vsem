export interface Service {
  id: string
  title: string
  description?: string
  items: string[]
  icon?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  serviceType: string
  message: string
}

export interface Company {
  name: string
  slogan: string
  yearsOfExperience: number
  completedProjects: number
  regionsServed: number
  email: string
  phone: string
  address: string
  socials?: {
    telegram?: string
    instagram?: string
    facebook?: string
  }
}

export interface NavigationItem {
  id: string
  label: string
  href: string
}

export interface Project {
  id: string;
  title: string | null;
  image_url: string;
  created_at: string | null;
  category: string | null;
} 