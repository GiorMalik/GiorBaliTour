'use client';

import { useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';

interface AboutSectionProps {
  currentLanguage: Language;
}

export function AboutSection({ currentLanguage }: AboutSectionProps) {
  const t = translations[currentLanguage];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get basePath from next.config.ts
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const aboutImages = [
    `${basePath}/images/about/bali-nature.jpg`,
    `${basePath}/images/about/bali-island.jpg`,
    `${basePath}/images/about/bali-tari-kecak.jpg`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % aboutImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.about.title}
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              {t.about.description}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{t.about.professionalDrivers}</h3>
                  <p className="text-gray-400">{t.about.professionalDriversDesc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{t.about.fuelIncluded}</h3>
                  <p className="text-gray-400">{t.about.fuelIncludedDesc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{t.about.wellMaintained}</h3>
                  <p className="text-gray-400">{t.about.wellMaintainedDesc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{t.about.service24_7}</h3>
                  <p className="text-gray-400">{t.about.service24_7Desc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Image Carousel */}
            <div className="relative h-96 overflow-hidden rounded-lg shadow-2xl group">
              {aboutImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Bali Experience ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {aboutImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-green-600 w-8'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + aboutImages.length) % aboutImages.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
              >
                →
              </button>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-green-600 text-white p-6 rounded-lg shadow-xl">
              <div className="text-3xl font-bold mb-2">10+ {t.about.yearsExperience}</div>
              <div className="text-sm">{t.about.yearsExperienceDesc}</div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-900 p-8 rounded-lg">
            <div className="text-4xl font-bold text-green-600 mb-2">5000+</div>
            <div className="text-gray-300">{t.about.happyTravelers}</div>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-300">{t.about.vehicleFleet}</div>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg">
            <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
            <div className="text-gray-300">{t.about.dailyBaliTours}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}