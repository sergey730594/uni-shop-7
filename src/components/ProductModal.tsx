import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingCart, Share2 } from 'lucide-react';
import { useCart } from '../CartContext';
import { FlyToCartAnimation } from './FlyToCartAnimation';

interface ProductModalProps {
  product: {
    id: number;
    name: string | Record<string, string>;
    photos: string[];
    price20: number;
    price30: number;
    price40: number;
    fillings: string[];
    description: string | Record<string, string>;
    code?: string;
    oldPrice?: number;
  };
  language: string;
  onClose: () => void;
}

// Иконки соцсетей
const FacebookShareIcon = () => (
  <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WhatsAppShareIcon = () => (
  <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ViberShareIcon = () => (
  <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
    <path d="M11.4 0C9.5.1 7.7.7 6 1.6c-.8.4-1.2.7-2 1.3-.9.7-1.6 1.3-2.2 2.1-.9 1.2-1.4 2.3-1.8 3.6-.3 1-.5 2.1-.6 3.3-.1 1.2 0 2.4.3 3.5.2.9.5 1.8.9 2.6.3.6.7 1.2 1.2 1.7.3.3.5.7.4 1.1l-.5 2.4c-.1.4 0 .8.3 1.1.3.3.7.4 1.1.3l2.6-.7c.2-.1.4-.1.6 0 .8.3 1.6.5 2.5.6 1.2.1 2.5.1 3.7-.2 1-.2 2-.6 2.9-1.1.8-.5 1.6-1.1 2.2-1.8.7-.8 1.2-1.6 1.6-2.5.5-1.2.8-2.5.9-3.8.1-1.4 0-2.8-.3-4.2-.2-1.1-.6-2.2-1.1-3.2-.5-1-1.2-1.9-2-2.7-.8-.8-1.7-1.4-2.7-1.9-1.3-.7-2.7-1.1-4.2-1.4-1.3-.2-2.6-.3-3.8-.2z"/>
  </svg>
);

const TelegramShareIcon = () => (
  <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const PinterestShareIcon = () => (
  <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.223-.175.271-.402.163-1.497-.697-2.433-2.886-2.433-4.646 0-3.783 2.748-7.257 7.924-7.257 4.16 0 7.393 2.964 7.393 6.926 0 4.132-2.606 7.458-6.222 7.458-1.215 0-2.357-.632-2.748-1.378l-.747 2.85c-.271 1.043-1.003 2.35-1.493 3.146C9.573 23.817 10.762 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const TikTokShareIcon = () => (
  <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const fillingNames: Record<string, Record<string, string>> = {
  'fruit': { ka: 'ხილის ტორტი', en: 'Fruit Cake', ru: 'Фруктовый торт', tr: 'Meyveli Pasta' },
  'fruit-mix': { ka: 'ხილის მიქსი', en: 'Fruit Mix', ru: 'Фруктовый микс', tr: 'Meyve Karışımı' },
  'banana-chocolate': { ka: 'ბანანი შოკოლადით', en: 'Banana with Chocolate', ru: 'Банан с шоколадом', tr: 'Çikolatalı Muz' },
  'black-special': { ka: 'შავი საფირმო', en: 'Black Special', ru: 'Чёрный фирменный', tr: 'Siyah Özel' },
  'bounty-special': { ka: 'საფირმო ბაუნტი', en: 'Bounty Special', ru: 'Фирменный Баунти', tr: 'Bounty Özel' },
};

export const ProductModal: React.FC<ProductModalProps> = ({ product, language, onClose }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [selectedSize, setSelectedSize] = useState('20');
  const [selectedFilling, setSelectedFilling] = useState(product.fillings[0] || '');
  const [cakeText, setCakeText] = useState('');
  const [flyingCake, setFlyingCake] = useState<{ x: number; y: number } | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!product || !product.photos || product.photos.length === 0) return null;

  const texts = {
    ka: { size: 'ზომა', pieces: 'ნაჭრიანი', filling: 'შიგთავსი', cakeText: 'ტექსტი ტორტზე / შენიშვნა', addToCart: 'კალათაში დამატება', share: 'გაზიარება' },
    en: { size: 'Size', pieces: 'pieces', filling: 'Filling', cakeText: 'Text on cake / Note', addToCart: 'Add to Cart', share: 'Share' },
    ru: { size: 'Размер', pieces: 'кусков', filling: 'Начинка', cakeText: 'Текст на торте / Примечание', addToCart: 'Добавить в корзину', share: 'Поделиться' },
    tr: { size: 'Boyut', pieces: 'dilim', filling: 'Dolgu', cakeText: 'Pasta üzerine yazı / Not', addToCart: 'Sepete Ekle', share: 'Paylaş' },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  const productName = typeof product.name === 'object' ? product.name[language] || product.name.ka : product.name;
  const productDescription = typeof product.description === 'object' ? product.description[language] || product.description.ka : product.description;

  const sizes = [
    { value: '20', label: `20 ${t.pieces}`, price: product.price20 },
    { value: '30', label: `30 ${t.pieces}`, price: product.price30 },
    { value: '40', label: `40 ${t.pieces}`, price: product.price40 },
  ];

  const selectedPrice = sizes.find(s => s.value === selectedSize)?.price || product.price20;
  const shareUrl = window.location.href;

  const shareLinks = [
    { name: 'Facebook', icon: <FacebookShareIcon />, bg: 'bg-[#1877F2]', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { name: 'WhatsApp', icon: <WhatsAppShareIcon />, bg: 'bg-[#25D366]', url: `https://wa.me/?text=${encodeURIComponent(productName + ' - Grant Bakery')}` },
    { name: 'Viber', icon: <ViberShareIcon />, bg: 'bg-[#7360F2]', url: `viber://forward?text=${encodeURIComponent(productName + ' - Grant Bakery')}` },
    { name: 'Telegram', icon: <TelegramShareIcon />, bg: 'bg-[#0088cc]', url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(productName)}` },
    { name: 'Pinterest', icon: <PinterestShareIcon />, bg: 'bg-[#E60023]', url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(product.photos[0])}` },
    { name: 'TikTok', icon: <TikTokShareIcon />, bg: 'bg-black', url: 'https://www.tiktok.com/@grantis_torti' },
  ];

  const handleAddToCart = (e?: React.MouseEvent) => {
    const rect = (e?.currentTarget as HTMLElement)?.getBoundingClientRect();
    
    setFlyingCake({
      x: rect?.left || window.innerWidth / 2,
      y: rect?.top || window.innerHeight - 100,
    });
    
    addToCart({
      id: product.id,
      name: productName,
      photo: product.photos[currentPhoto] || '',
      size: `${selectedSize} ${t.pieces}`,
      filling: fillingNames[selectedFilling]?.[language] || selectedFilling,
      cakeText: cakeText,
      price: selectedPrice,
      quantity: 1,
    });
    
    setTimeout(() => {
      setFlyingCake(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative bg-white w-full max-w-[400px] rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ maxHeight: '95vh' }}>
        <div className="relative bg-gray-100 aspect-[4/3] flex-shrink-0">
          <img src={product.photos[currentPhoto] || ''} alt={productName} className="w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-3 left-3 p-2 bg-white/80 rounded-full shadow-lg">
            <X className="w-5 h-5 text-gray-700" />
          </button>
          {product.photos.length > 1 && (
            <>
              <button onClick={() => setCurrentPhoto(prev => prev === 0 ? product.photos.length - 1 : prev - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrentPhoto(prev => prev === product.photos.length - 1 ? 0 : prev + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full">
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {product.photos.map((_, index) => (
                  <div key={index} className={`w-1.5 h-1.5 rounded-full ${index === currentPhoto ? 'bg-[#ff0000]' : 'bg-white/60'}`} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(95vh - 250px)' }}>
        <div className="flex items-center justify-between gap-2">
  <h2 className="text-sm font-bold text-gray-800">{productName}</h2>
  {product.code && <span className="text-xs font-bold text-[#ff0000] flex-shrink-0">#{product.code}</span>}
</div><div className="flex items-center justify-between gap-2 mb-2">
  <h2 className="text-sm font-bold text-gray-800">{productName}</h2>
  {product.code && <span className="text-xs font-bold text-[#ff0000] flex-shrink-0">#{product.code}</span>}
</div>
          {productDescription && <p className="text-xs text-gray-500 mt-1 mb-2">{productDescription}</p>}

          <div className="flex gap-1.5 mb-2">
            {sizes.map(size => (
              <button key={size.value} onClick={() => setSelectedSize(size.value)} className={`px-3 py-1 rounded-full text-[10px] font-bold ${selectedSize === size.value ? 'bg-[#ff0000] text-white' : 'bg-gray-100 text-gray-600'}`}>
                {size.label}
              </button>
            ))}
          </div>

          <label className="block text-[10px] font-medium text-gray-700 mb-1">{t.filling}</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.fillings.map(fillingKey => {
              const name = fillingNames[fillingKey]?.[language] || fillingKey;
              return (
                <button key={fillingKey} onClick={() => setSelectedFilling(fillingKey)} className={`px-3 py-1 rounded-full text-[10px] font-bold ${selectedFilling === fillingKey ? 'bg-[#ff0000] text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {name}
                </button>
              );
            })}
          </div>

          <label className="block text-[10px] font-medium text-gray-700 mb-1">{t.cakeText}</label>
          <textarea
            value={cakeText}
            onChange={(e) => setCakeText(e.target.value.slice(0, 200))}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
            maxLength={200}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs resize-none"
            style={{ height: '60px', minHeight: '60px', maxHeight: '60px' }}
          />

          <div className="mt-2">
            <p className="flex items-center gap-1 text-[10px] font-medium text-gray-700 mb-1">
              <Share2 className="w-3 h-3" /> {t.share}
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {shareLinks.map(social => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className={`${social.bg} w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition-transform`}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 p-3 sm:p-4 border-t border-gray-200 bg-white">
          <button onClick={(e) => handleAddToCart(e)} className="w-full bg-[#ff0000] text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm">
            <ShoppingCart className="w-4 h-4" />
            {t.addToCart} — ₾{selectedPrice}
          </button>
        </div>
      </div>

      {flyingCake && <FlyToCartAnimation startPos={flyingCake} endPos={{ x: window.innerWidth - 60, y: 50 }} />}
    </div>
  );
};