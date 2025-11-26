'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { translations, Language } from '@/lib/translations';
import { SEO_DATA } from '@/lib/seo-data';

interface HeroSectionProps {
  currentLanguage: Language;
}

export function HeroSection({ currentLanguage }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();
  const t = translations[currentLanguage];
  
  // Get basePath from next.config.ts
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const heroImages = [
    `${basePath}/images/hero/barong-statue.jpg`,
    `${basePath}/images/hero/nusa-penida-beach.jpg`,
    `${basePath}/images/hero/kedonganan-sunset.jpg`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppClick = () => {
    const message = 'Halo, saya tertarik untuk booking mobil di Bali. Apakah mobil tersedia untuk hari ini?';
    const whatsappUrl = `https://wa.me/${SEO_DATA.site.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Images with Animation */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 animate-fade-in-up animation-delay-200">
            {t.hero.subtitle}
          </p>
          <Button
            onClick={handleWhatsAppClick}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 animate-fade-in-up animation-delay-400"
          >
            {t.hero.cta}
          </Button>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </section>
  );
}