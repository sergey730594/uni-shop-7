import React from 'react';
import logoImage from '../assets/Logo-grant.png';

// ==================== ИКОНКИ ====================
const LocationIcon = () => (
  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// ==================== ИКОНКИ СОЦСЕТЕЙ ====================
const WhatsAppIcon = () => (
  <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ViberIcon = () => (
  <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
    <path d="M11.4 0C9.5.1 7.7.7 6 1.6c-.8.4-1.2.7-2 1.3-.9.7-1.6 1.3-2.2 2.1-.9 1.2-1.4 2.3-1.8 3.6-.3 1-.5 2.1-.6 3.3-.1 1.2 0 2.4.3 3.5.2.9.5 1.8.9 2.6.3.6.7 1.2 1.2 1.7.3.3.5.7.4 1.1l-.5 2.4c-.1.4 0 .8.3 1.1.3.3.7.4 1.1.3l2.6-.7c.2-.1.4-.1.6 0 .8.3 1.6.5 2.5.6 1.2.1 2.5.1 3.7-.2 1-.2 2-.6 2.9-1.1.8-.5 1.6-1.1 2.2-1.8.7-.8 1.2-1.6 1.6-2.5.5-1.2.8-2.5.9-3.8.1-1.4 0-2.8-.3-4.2-.2-1.1-.6-2.2-1.1-3.2-.5-1-1.2-1.9-2-2.7-.8-.8-1.7-1.4-2.7-1.9-1.3-.7-2.7-1.1-4.2-1.4-1.3-.2-2.6-.3-3.8-.2zm.2 1.7c1.1-.1 2.2 0 3.3.2 1 .2 2 .5 2.9 1 .8.4 1.5.9 2.1 1.5.7.7 1.3 1.5 1.7 2.3.5 1 .8 2 1 3.1.2 1.1.3 2.2.2 3.3-.1 1.1-.4 2.2-.8 3.2-.4.9-.9 1.7-1.5 2.5-.6.7-1.3 1.3-2.1 1.8-.9.6-1.9 1-3 1.3-1.1.3-2.3.4-3.5.3-1.1-.1-2.2-.3-3.2-.7-.3-.1-.7-.2-1 0l-2.2.6c-.1 0-.2 0-.3-.1-.1-.1-.2-.2-.2-.3l.4-2.1c.1-.3 0-.6-.2-.8-.2-.3-.5-.6-.7-.9-.5-.7-.9-1.4-1.2-2.2-.3-.8-.6-1.7-.7-2.6-.1-1-.1-2 0-3 .2-1.1.5-2.2 1-3.3.4-.9 1-1.8 1.6-2.6.6-.7 1.3-1.3 2.1-1.9.9-.6 1.9-1.1 3-1.5 1-.3 2.1-.5 3.2-.6zm.4 3.6c-.4 0-.7.2-.9.4-.2.2-.4.4-.5.6-.2.4-.2.7 0 1 .1.2.3.3.5.5.1.1.2.2.2.4.1.3 0 .6-.2.8-.3.5-.5 1-.6 1.5-.2.7-.3 1.4-.2 2.1.1 1 .4 2 1 2.9.6.9 1.3 1.7 2.2 2.3.9.6 1.9 1 3 1.2 1 .2 2 .3 3.1.1.8-.2 1.5-.5 2.1-1 .5-.4.8-.9 1-1.5.1-.3.1-.6 0-.9-.1-.2-.3-.4-.5-.5-.2-.1-.5-.2-.8-.2-.4 0-.7.1-1 .3-.2.1-.3.2-.5.3-.1 0-.2 0-.3 0-.2 0-.4-.1-.6-.2-.4-.2-.7-.5-1-.8-.4-.4-.8-.8-1.1-1.3-.3-.5-.5-1-.6-1.5-.1-.4-.1-.7 0-1 .1-.2.2-.4.4-.6.1-.1.2-.3.2-.4.1-.2.1-.4.1-.5 0-.3-.1-.6-.3-.8-.2-.2-.4-.4-.6-.5-.3-.1-.6-.1-.8-.1z"/>
  </svg>
);

const MessengerIcon = () => (
  <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
    <path d="M12 0C5.24 0 0 4.952 0 11.64c0 3.499 1.434 6.521 3.769 8.61a.96.96 0 01.322.684l.066 2.136a.96.96 0 001.346.849l2.383-1.05a.96.96 0 01.64-.047c1.132.308 2.3.462 3.474.458 6.76 0 12-4.952 12-11.64S18.76 0 12 0zm7.206 8.955l-3.524 5.59a1.8 1.8 0 01-2.604.48l-2.808-2.105a.72.72 0 00-.868.002l-3.79 2.877c-.385.292-.9-.18-.666-.61l3.524-5.59a1.8 1.8 0 012.604-.48l2.808 2.106a.72.72 0 00.868-.003l3.79-2.877c.386-.29.9.181.666.61z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface FooterProps {
  language?: string;
}

export const Footer: React.FC<FooterProps> = ({ language = 'ka' }) => {
  const texts = {
    ka: {
      description: 'ტორტის შეკვეთა ადგილზე მიტანით',
      address: 'თბილისი, ნოდარ დუმბაძის გამზ. №4',
      phone: '+995 593 756 700',
      email: 'info@grant.ge',
      website: 'www.grant.ge',
      followUs: 'გამოგვყევით',
      rights: 'ყველა უფლება დაცულია',
      location: 'ჩვენს მისამართზე',
    },
    en: {
      description: 'Order cake with delivery',
      address: 'Tbilisi, Nodar Dumbadze Ave. №4',
      phone: '+995 555 000 000',
      email: 'info@grant.ge',
      website: 'www.grant.ge',
      followUs: 'Follow us',
      rights: 'All rights reserved',
      location: 'Our location',
    },
    ru: {
      description: 'Заказ торта с доставкой',
      address: 'Тбилиси, просп. Нодара Думбадзе №4',
      phone: '+995 555 000 000',
      email: 'info@grant.ge',
      website: 'www.grant.ge',
      followUs: 'Подпишитесь',
      rights: 'Все права защищены',
      location: 'Мы на карте',
    },
    tr: {
      description: 'Yerinde teslim pasta siparişi',
      address: 'Tiflis, Nodar Dumbadze Cad. №4',
      phone: '+995 555 000 000',
      email: 'info@grant.ge',
      website: 'www.grant.ge',
      followUs: 'Bizi takip edin',
      rights: 'Tüm hakları saklıdır',
      location: 'Konumumuz',
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  const socialLinks = [
    { name: 'WhatsApp', icon: <WhatsAppIcon />, url: '#', bg: 'bg-[#25D366] hover:bg-[#20b85a]' },
    { name: 'Viber', icon: <ViberIcon />, url: '#', bg: 'bg-[#7360F2] hover:bg-[#5e4fd1]' },
    { name: 'Messenger', icon: <MessengerIcon />, url: '#', bg: 'bg-[#0084FF] hover:bg-[#0073df]' },
    { name: 'Facebook', icon: <FacebookIcon />, url: '#', bg: 'bg-[#1877F2] hover:bg-[#1664d9]' },
    { name: 'Instagram', icon: <InstagramIcon />, url: '#', bg: 'bg-[#E4405F] hover:bg-[#c13554]' },
    { name: 'YouTube', icon: <YouTubeIcon />, url: '#', bg: 'bg-[#FF0000] hover:bg-[#cc0000]' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* ====== ЛЕВАЯ КОЛОНКА ====== */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-md flex-shrink-0">
                <img 
                  src={logoImage} 
                  alt="Grant Bakery" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-bold text-xl text-gray-800">Grant Bakery</span>
                <p className="text-sm text-gray-500">{t.description}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <LocationIcon />
                <span>{t.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <PhoneIcon />
                <a href={`tel:${t.phone.replace(/\s/g, '')}`} className="hover:text-[#ff0000] transition">
                  {t.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <EmailIcon />
                <a href={`mailto:${t.email}`} className="hover:text-[#ff0000] transition">
                  {t.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <GlobeIcon />
                <a href="#" className="hover:text-[#ff0000] transition">
                  {t.website}
                </a>
              </div>
            </div>
          </div>

          {/* ====== СРЕДНЯЯ КОЛОНКА - ИКОНКИ СОЦСЕТЕЙ ====== */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <p className="text-sm font-medium text-gray-700">{t.followUs}</p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className={`${social.bg} w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white hover:scale-110 transform transition duration-200 shadow-md hover:shadow-lg`}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ====== ПРАВАЯ КОЛОНКА - КАРТА С ПУЛЬСИРУЮЩИМ ПИНОМ ====== */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 text-lg text-center md:text-left">
              {t.location}
            </h3>
            
            <div className="relative bg-gray-100 rounded-xl overflow-hidden h-32 sm:h-36 md:h-40 w-full">
              <iframe
                src="https://www.google.com/maps?ll=41.784832,44.827172&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Grant Bakery location"
                className="absolute inset-0"
              />
              
              {/* Пульсирующий пин */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  <span className="absolute -inset-4 rounded-full bg-[#ff0000]/30 animate-ping"></span>
                  <span className="absolute -inset-2 rounded-full bg-[#ff0000]/20 animate-ping" style={{ animationDelay: '0.5s' }}></span>
                  <svg className="relative w-8 h-8 text-[#ff0000] drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C7.31 0 3.5 3.81 3.5 8.5c0 6.38 8.5 15.5 8.5 15.5s8.5-9.12 8.5-15.5C20.5 3.81 16.69 0 12 0zm0 11.5a3 3 0 110-6 3 3 0 010 6z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 text-center">
              📍 {t.address}
            </p>
          </div>
        </div>

        {/* ====== КОПИРАЙТ ====== */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © 2026 Grant Bakery. Designed by *Sergo* {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};