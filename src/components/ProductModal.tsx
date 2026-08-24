import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../CartContext';

interface ProductModalProps {
  product: {
    id: number;
    name: string;
    photos: string[];
    price20: number;
    price30: number;
    price40: number;
    fillings: string[];
    description: string;
  };
  language: string;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, language, onClose }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [selectedSize, setSelectedSize] = useState('30');
  const [selectedFilling, setSelectedFilling] = useState(product.fillings[0] || '');
  const [cakeText, setCakeText] = useState('');
  const { addToCart } = useCart();

  const texts = {
    ka: {
      size: 'ზომა', pieces: 'კუსკი', filling: 'შიგთავსი',
      cakeText: 'ტექსტი ტორტზე / შენიშვნა', addToCart: 'კალათაში დამატება',
    },
    en: {
      size: 'Size', pieces: 'pieces', filling: 'Filling',
      cakeText: 'Text on cake / Note', addToCart: 'Add to Cart',
    },
    ru: {
      size: 'Размер', pieces: 'кусков', filling: 'Начинка',
      cakeText: 'Текст на торте / Примечание', addToCart: 'Добавить в корзину',
    },
    tr: {
      size: 'Boyut', pieces: 'dilim', filling: 'Dolgu',
      cakeText: 'Pasta üzerine yazı / Not', addToCart: 'Sepete Ekle',
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  const sizes = [
    { value: '20', label: '20', price: product.price20 },
    { value: '30', label: '30', price: product.price30 },
    { value: '40', label: '40', price: product.price40 },
  ];

  const selectedPrice = sizes.find(s => s.value === selectedSize)?.price || product.price30;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      photo: product.photos[currentPhoto] || '',
      size: `${selectedSize} ${t.pieces}`,
      filling: selectedFilling,
      cakeText: cakeText,
      price: selectedPrice,
      quantity: 1,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="fixed inset-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 bg-white w-full sm:w-[420px] sm:max-h-[95vh] sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Фото */}
        <div className="relative bg-gray-100 aspect-[4/3] flex-shrink-0">
          <img
            src={product.photos[currentPhoto] || ''}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          <button
            onClick={onClose}
            className="absolute top-3 left-3 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {product.photos.length > 1 && (
            <>
              <button
                onClick={() => setCurrentPhoto(prev => prev === 0 ? product.photos.length - 1 : prev - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() => setCurrentPhoto(prev => prev === product.photos.length - 1 ? 0 : prev + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {product.photos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${index === currentPhoto ? 'bg-[#ff0000]' : 'bg-white/60'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Содержимое */}
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-1">{product.name}</h2>
          {product.description && (
            <p className="text-xs text-gray-500 mb-2">{product.description}</p>
          )}

          {/* Размер — компактные кнопки */}
          <label className="block text-xs font-medium text-gray-700 mb-1">{t.size}</label>
          <div className="flex gap-2 mb-2">
            {sizes.map(size => (
              <button
                key={size.value}
                onClick={() => setSelectedSize(size.value)}
                className={`flex-1 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  selectedSize === size.value
                    ? 'bg-[#ff0000] text-white border-[#ff0000]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#ff0000]'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>

          {/* Начинка */}
          <label className="block text-xs font-medium text-gray-700 mb-1">{t.filling}</label>
          <select
            value={selectedFilling}
            onChange={(e) => setSelectedFilling(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-xl text-xs mb-2 focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
          >
            {product.fillings.map(filling => (
              <option key={filling} value={filling}>{filling}</option>
            ))}
          </select>

          {/* Текст */}
          <label className="block text-xs font-medium text-gray-700 mb-1">{t.cakeText}</label>
          <textarea
            value={cakeText}
            onChange={(e) => setCakeText(e.target.value)}
            rows={2}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-xl text-xs mb-2 focus:outline-none focus:ring-2 focus:ring-[#ff0000] resize-none"
          />
        </div>

        {/* Кнопка — прилипает к низу */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#ff0000] hover:bg-[#cc0000] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            {t.addToCart} — ₾{selectedPrice}
          </button>
        </div>
      </div>
    </div>
  );
};