'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { CarsSection } from '@/components/cars-section';
import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { Language } from '@/lib/translations';

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['english', 'chinese', 'korean', 'arabic', 'turkish', 'russian', 'portuguese', 'indonesian'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);



  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation 
        currentLanguage={currentLanguage} 
        onLanguageChange={setCurrentLanguage} 
      />
      
      <main>
        <HeroSection currentLanguage={currentLanguage} />
        <CarsSection currentLanguage={currentLanguage} />
        <AboutSection currentLanguage={currentLanguage} />
        <ContactSection currentLanguage={currentLanguage} />
      </main>
      
      <Footer currentLanguage={currentLanguage} />
    </div>
  );
}