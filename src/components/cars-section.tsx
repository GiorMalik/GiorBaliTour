'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { translations, Language } from '@/lib/translations';
import { SEO_DATA } from '@/lib/seo-data';

interface CarsSectionProps {
  currentLanguage: Language;
}

export function CarsSection({ currentLanguage }: CarsSectionProps) {
  const t = translations[currentLanguage];
  
  // Get basePath from next.config.ts
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const carImageMap: { [key: string]: string } = {
    'avanza': `${basePath}/images/cars/avanza.png`,
    'allnew-avanza': `${basePath}/images/cars/all-new-avanza.png`,
    'xpander': `${basePath}/images/cars/xpander.png`,
    'innova-reborn': `${basePath}/images/cars/innova-reborn.webp`,
    'hiace-commuter': `${basePath}/images/cars/hiace-commuter.png`,
    'hiace-premio': `${basePath}/images/cars/hiace-premio.png`,
    'alphard': `${basePath}/images/cars/toyota-alphard.png.webp`,
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const handleBookNow = (carName: string, price: number) => {
    const phoneNumber = SEO_DATA.site.phone.replace(/\D/g, '');
    const message = `Halo, saya ingin booking mobil ${carName} dengan harga Rp ${formatPrice(price)} per 10 jam. Apakah mobil tersedia?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="cars" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.cars.title}
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SEO_DATA.vehicles.map((car) => (
            <Card key={car.id} className="bg-gray-800 border-gray-700 hover:border-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-600/20">
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={carImageMap[car.id] || '/images/cars/default.png'}
                    alt={car.name}
                    className={`w-full h-full hover:scale-110 transition-transform duration-300 ${
                      ['avanza', 'innova-reborn', 'hiace-premio'].includes(car.id) 
                        ? 'object-contain' 
                        : 'object-cover'
                    }`}
                  />
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    {car.seats} Seats
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <CardTitle className="text-xl text-white mb-2">{car.name}</CardTitle>
                <CardDescription className="text-gray-400 text-sm mb-3">
                  <div className="flex items-center justify-between">
                    <span>{car.transmission}</span>
                    <span>{car.fuel}</span>
                  </div>
                </CardDescription>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  Rp {formatPrice(car.price)}
                </div>
                <div className="text-sm text-gray-400">
                  {t.cars.per10Hours}
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button
                  onClick={() => handleBookNow(car.name, car.price)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {t.cars.bookNow}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}