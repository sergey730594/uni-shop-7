import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingCart, Share2 } from 'lucide-react';
import { useCart } from '../CartContext';

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

// Иконки соцсетей (без изменений)
const FacebookShareIcon = () => ( /* ... */ );
const WhatsAppShareIcon = () => ( /* ... */ );
const ViberShareIcon = () => ( /* ... */ );
const TelegramShareIcon = () => ( /* ... */ );
const PinterestShareIcon = () => ( /* ... */ );
const TikTokShareIcon = () => ( /* ... */ );

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
    
    setTimeout(() => setFlyingCake(null), 1000);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Основное окно: вертикально на мобильных, горизонтально на sm+ */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row w-full max-w-[400px] sm:max-w-[720px] max-h-[95vh]">
        
        {/* ЛЕВАЯ ЧАСТЬ: фото + кнопки соцсетей под фото */}
        <div className="flex flex-col w-full sm:w-1/2 flex-shrink-0">
          {/* Фото */}
          <div className="relative bg-gray-100 aspect-[4/3] sm:aspect-auto sm:flex-1">
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

          {/* Кнопки соцсетей под фото, выровнены вправо */}
          <div className="p-2 flex justify-end gap-1.5 border-t border-gray-100">
            {shareLinks.map(social => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className={`${social.bg} w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition-transform`}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: содержимое */}
        <div className="flex flex-col flex-1 min-w-0 p-4 sm:p-6 overflow-y-auto">
          {/* Название и код */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">{productName}</h2>
            {product.code && <span className="text-xs font-bold text-[#ff0000] flex-shrink-0">#{product.code}</span>}
          </div>
          
          {/* Описание */}
          {productDescription && <p className="text-xs text-gray-500 mb-3">{productDescription}</p>}

          {/* Размер */}
          <label className="block text-[10px] font-medium text-gray-700 mb-1">{t.size}</label>
          <div className="flex gap-2 mb-3">
            {sizes.map(size => (
              <button
                key={size.value}
                onClick={() => setSelectedSize(size.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${selectedSize === size.value ? 'bg-[#ff0000] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {size.label}
              </button>
            ))}
          </div>

          {/* Начинка */}
          <label className="block text-[10px] font-medium text-gray-700 mb-1">{t.filling}</label>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.fillings.map(fillingKey => {
              const name = fillingNames[fillingKey]?.[language] || fillingKey;
              return (
                <button
                  key={fillingKey}
                  onClick={() => setSelectedFilling(fillingKey)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${selectedFilling === fillingKey ? 'bg-[#ff0000] text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  {name}
                </button>
              );
            })}
          </div>

          {/* Текст на торте */}
          <label className="block text-[10px] font-medium text-gray-700 mb-1">{t.cakeText}</label>
          <textarea
            value={cakeText}
            onChange={(e) => setCakeText(e.target.value.slice(0, 200))}
            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
            maxLength={200}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs resize-none mb-3"
            style={{ height: '70px', minHeight: '70px', maxHeight: '70px' }}
          />

          {/* Кнопка в корзину — на десктопе внизу справа, на мобильных внизу */}
          <div className="mt-auto sm:self-end">
            <button
              onClick={(e) => handleAddToCart(e)}
              className="w-full sm:w-auto bg-[#ff0000] text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              {t.addToCart} — ₾{selectedPrice}
            </button>
          </div>
        </div>
      </div>

      {/* Анимация полета */}
      {flyingCake && (
        <div
          className="fixed z-[99999] pointer-events-none"
          style={{
            left: flyingCake.x,
            top: flyingCake.y,
            transition: 'all 0.8s linear',
          }}
        >
          <div className="w-10 h-10 bg-[#ff0000] rounded-full flex items-center justify-center text-xl shadow-2xl">
            🎂
          </div>
        </div>
      )}
    </div>
  );
};