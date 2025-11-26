# Gior Bali Tour

Complete Bali car rental website with custom domain setup.

## Features

- **Custom Domain**: www.giorbalitour.com
- **Multi-language Support**: 8 languages (English, Chinese, Korean, Arabic, Turkish, Russian, Portuguese, Indonesian)
- **Responsive Design**: Mobile & desktop friendly
- **SEO Optimized**: Complete structured data and meta tags
- **WhatsApp Integration**: Direct booking system
- **Professional Fleet**: 9 types of vehicles
- **Bali Coverage**: All major tourist areas

## Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Development**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Linting**:
   ```bash
   npm run lint
   ```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Deployment**: GitHub Pages

## Repository

- **GitHub**: https://github.com/GiorMalik/GiorBaliTour
- **Live Site**: https://www.giorbalitour.com
- **GitHub Pages**: https://giormalik.github.io/GiorBaliTour

## Domain Configuration

### Custom Domain Setup
1. **CNAME File**: Configured for `www.giorbalitour.com`
2. **DNS Records**: 
   - Type: CNAME
   - Name: www
   - Value: giormalik.github.io
3. **GitHub Pages**: Enabled with custom domain

### SEO Configuration
- **Base URL**: https://www.giorbalitour.com
- **Structured Data**: LocalBusiness schema
- **Meta Tags**: Complete SEO optimization
- **Sitemap**: Auto-generated

## Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout with SEO
│   │   ├── page.tsx        # Home page
│   │   ├── globals.css     # Global styles
│   │   └── sitemap.ts      # SEO sitemap
│   ├── components/          # React components
│   │   ├── navigation.tsx  # Navigation bar
│   │   ├── hero-section.tsx # Hero with background images
│   │   ├── cars-section.tsx # Vehicle showcase
│   │   ├── about-section.tsx # About section
│   │   ├── contact-section.tsx # Contact & WhatsApp
│   │   ├── footer.tsx      # Footer
│   │   └── ui/            # shadcn/ui components
│   ├── lib/                # Utilities
│   │   ├── translations.ts # Multi-language (8 languages)
│   │   ├── seo-data.ts     # SEO configuration
│   │   └── image-path.ts   # Image utilities
│   └── hooks/              # React hooks
├── public/                 # Static assets
│   ├── images/             # Hero, about, cars images
│   └── CNAME              # Custom domain configuration
├── out/                   # Build output for GitHub Pages
└── Configuration files     # Next.js, TypeScript, Tailwind
```

## Available Vehicles

- **Avanza** - 7 seats, Manual/Automatic
- **All New Avanza** - 7 seats, Automatic
- **Xpander** - 7 seats, Automatic
- **Innova Reborn** - 7 seats, Automatic
- **HiAce Commuter** - 16 seats, Manual
- **HiAce Premio** - 12 seats, Automatic
- **Toyota Alphard** - 8 seats, Automatic
- **Toyota Vellfire** - 8 seats, Automatic

## Service Areas

- Denpasar, Kuta, Seminyak, Legian
- Canggu, Ubud, Nusa Dua, Sanur
- Uluwatu, Jimbaran, Bedugul, Kintamani
- Ngurah Rai Airport (DPS)

## Languages Supported

1. **English** - Primary language
2. **中文** (Chinese) - 简体中文
3. **한국어** (Korean) - 한국어
4. **العربية** (Arabic) - العربية
5. **Türkçe** (Turkish) - Türkçe
6. **Русский** (Russian) - Русский
7. **Português** (Portuguese) - Português
8. **Bahasa Indonesia** (Indonesian) - Bahasa Indonesia

## Contact & Booking

- **Phone**: +6285854965523
- **Email**: info@giorbalitour.com
- **WhatsApp**: Direct booking integration
- **Service**: 24/7 availability

## Deployment

### GitHub Pages
1. **Build**: `npm run build`
2. **Deploy**: Push to `main` branch
3. **Custom Domain**: Configured in repository settings
4. **Automatic**: GitHub Actions handles deployment

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Check code quality
npm run lint
```

## License

© 2024 Gior Bali Tour. All rights reserved.