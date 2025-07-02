# Blago-Vsem Landing Page

Professional, minimalist, and modern landing page for **Blago-Vsem** construction and architecture consulting company.

## 🚀 Features

- **Modern Design**: Clean, minimalist design inspired by REVERTT.UZ
- **Responsive**: Fully mobile responsive with mobile-first approach
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **SEO Optimized**: Meta tags, semantic HTML, and structured data ready
- **Contact Form**: Functional contact form with validation
- **13 Service Categories**: Comprehensive service offerings display
- **Performance**: Optimized for fast loading and smooth interactions

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Fonts**: Inter (Google Fonts)

## 📦 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Navigation header
│   │   └── Footer.tsx          # Footer component
│   └── sections/
│       ├── HeroSection.tsx     # Hero section with CTA
│       ├── AboutSection.tsx    # Company information
│       ├── ServicesSection.tsx # Service categories
│       ├── PortfolioSection.tsx # Project showcase
│       ├── ContactSection.tsx  # Contact form
│       └── MapSection.tsx      # Location map
├── contexts/
│   └── ThemeContext.tsx        # Dark/Light mode context
├── data/
│   ├── company.ts              # Company information
│   └── services.ts             # Service data
├── types/
│   └── index.ts                # TypeScript definitions
├── App.tsx                     # Main app component
├── main.tsx                    # App entry point
└── index.css                   # Global styles
```

## 📱 Sections

1. **Hero Section** - Company branding with impressive stats
2. **About Section** - Company credentials and mission
3. **Services Section** - 13 collapsible service categories
4. **Portfolio Section** - Project showcase (placeholder ready)
5. **Contact Section** - Lead generation form
6. **Map Section** - Office location (Google Maps ready)

## 🔧 Backend Integration

### Contact Form
The contact form is ready for backend integration. Update the `handleSubmit` function in `ContactSection.tsx`:

```typescript
// Replace the setTimeout simulation with actual API call
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

### Google Maps
Replace the map placeholder in `MapSection.tsx` with actual Google Maps embed.

## 🎯 Customization

### Company Information
Update company details in `src/data/company.ts`

### Services
Modify services in `src/data/services.ts`

### Colors
Customize the color scheme in `tailwind.config.js`

## 🌐 Deployment

```bash
npm run build
```

Deploy the `dist` folder to your hosting platform (Vercel, Netlify, etc.)

## 📄 License

Created for Blago-Vsem construction company.

---

Built with ❤️ for professional construction and architecture services in Uzbekistan. 