'use client';

import { translations, Language } from '@/lib/translations';
import { SEO_DATA } from '@/lib/seo-data';
import { Phone, MessageCircle, Instagram, MapPin, Mail } from 'lucide-react';

interface ContactSectionProps {
  currentLanguage: Language;
}

export function ContactSection({ currentLanguage }: ContactSectionProps) {
  const t = translations[currentLanguage];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          {t.contact.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300 group">
              <div className="p-3 bg-green-600 rounded-full group-hover:bg-green-500 transition-colors">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg text-white font-medium">{SEO_DATA.site.phone}</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300 group">
              <div className="p-3 bg-green-600 rounded-full group-hover:bg-green-500 transition-colors">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg text-white font-medium">@Gior.Malik</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300 group">
              <div className="p-3 bg-green-600 rounded-full group-hover:bg-green-500 transition-colors">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg text-white font-medium">@GiorMalik</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-300 group">
              <div className="p-3 bg-green-600 rounded-full group-hover:bg-green-500 transition-colors">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg text-white font-medium">{SEO_DATA.site.address}</span>
            </div>

            <div className="mt-8 p-6 bg-gray-900 rounded-lg border border-green-600">
              <h4 className="text-lg font-semibold text-white mb-3">{t.contact.businessHours}</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>{t.contact.mondayFriday}</span>
                  <span className="text-green-400">{t.contact.hours24}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.contact.saturday}</span>
                  <span className="text-green-400">{t.contact.hours24}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.contact.sunday}</span>
                  <span className="text-green-400">{t.contact.hours24}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-900/30 rounded-lg border border-green-700">
                <p className="text-green-400 text-sm font-medium">🌴 {t.contact.baliTimeZone}</p>
                <p className="text-gray-400 text-xs mt-1">{t.contact.utc}</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d492.9141009999743!2d115.17750430713947!3d-8.756610604233083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2451b862fc66f%3A0x84db67cd9ab7ae96!2sGarasi%20Unit%20Kecil%20Adhi%20Trans!5e0!3m2!1sid!2sid!4v1761064808936!5m2!1sid!2sid"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96 lg:h-full min-h-[450px]"
              />
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-3">{t.contact.serviceAreas}</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  {t.contact.denpasar}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  {t.contact.airport}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  {t.contact.kutaSeminyak}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  {t.contact.ubud}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  {t.contact.allBaliAreas}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Contact Form */}
        <div className="mt-16 bg-gray-900 rounded-lg p-8 border border-green-600">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">{t.contact.quickBooking}</h3>
            <p className="text-gray-300">{t.contact.quickBookingDesc}</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <a
              href={`https://wa.me/${SEO_DATA.site.phone.replace(/\D/g, '')}?text=Hi! I'm interested in booking a car in Bali. Can you provide more information about your services and availability?`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 inline mr-2" />
              {t.contact.startWhatsApp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}