import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import AuthStatus from '@/components/AuthStatus';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const t = useTranslations('hero');
  const tNav = useTranslations('navigation');
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">GiorBaliTour</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href={`/${useTranslations('locale')}/`} className="text-gray-700 hover:text-blue-600">
                {tNav('home')}
              </a>
              <a href={`/${useTranslations('locale')}/cars`} className="text-gray-700 hover:text-blue-600">
                {tNav('cars')}
              </a>
              <a href={`/${useTranslations('locale')}/about`} className="text-gray-700 hover:text-blue-600">
                {tNav('about')}
              </a>
              <a href={`/${useTranslations('locale')}/contact`} className="text-gray-700 hover:text-blue-600">
                {tNav('contact')}
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <AuthStatus />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              {t('title')}
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {t('subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                <span className="font-semibold">{t('duration')}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                <span className="font-semibold">{t('includes')}</span>
              </div>
            </div>

            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg">
              {t('cta')}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {useTranslations('about')('whyChooseUs')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              useTranslations('about')('feature1'),
              useTranslations('about')('feature2'),
              useTranslations('about')('feature3'),
              useTranslations('about')('feature4')
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚗</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 GiorBaliTour. {useTranslations('common')('allRightsReserved', 'All rights reserved')}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}