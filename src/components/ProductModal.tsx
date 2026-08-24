import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

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
      size: 'ზომა',
      pieces: 'კუსკი',
      filling: 'შიგთავსი',
      cakeText: 'ტექსტი ტორტზე / შენიშვნა',
      addToCart: 'კალათაში დამატება',
      price: 'ფასი',
    },
    en: {
      size: 'Size',
      pieces: 'pieces',
      filling: 'Filling',
      cakeText: 'Text on cake / Note',
      addToCart: 'Add to Cart',
      price: 'Price',
    },
    ru: {
      size: 'Размер',
      pieces: 'кусков',
      filling: 'Начинка',
      cakeText: 'Текст на торте / Примечание',
      addToCart: 'Добавить в корзину',
      price: 'Цена',
    },
    tr: {
      size: 'Boyut',
      pieces: 'dilim',
      filling: 'Dolgu',
      cakeText: 'Pasta üzerine yazı / Not',
      addToCart: 'Sepete Ekle',
      price: 'Fiyat',
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  const sizes = [
    { value: '20', label: `20 ${t.pieces}`, price: product.price20 },
    { value: '30', label: `30 ${t.pieces}`, price: product.price30 },
    { value: '40', label: `40 ${t.pieces}`, price: product.price40 },
  ];

  const selectedPrice = sizes.find(s => s.value === selectedSize)?.price || product.price30;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      photo: product.photos[currentPhoto] || '',
      size: sizes.find(s => s.value === selectedSize)?.label || '',
      filling: selectedFilling,
      cakeText: cakeText,
      price: selectedPrice,
      quantity: 1,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4">
      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Модальное окно */}
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Фото с стрелками */}
        <div className="relative bg-gray-100 aspect-square sm:aspect-[4/3]">
          <img
            src={product.photos[currentPhoto] || '/placeholder.png'}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {product.photos.length > 1 && (
            <>
              <button
                onClick={() => setCurrentPhoto(prev => prev === 0 ? product.photos.length - 1 : prev - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => setCurrentPhoto(prev => prev === product.photos.length - 1 ? 0 : prev + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                aria-label="Следующее фото"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>

              {/* Индикатор фото */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {product.photos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentPhoto ? 'bg-[#ff0000]' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Содержимое */}
        <div className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>
          {product.description && (
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              {product.description}
            </p>
          )}

          {/* Размер */}
          <div className="mb-4">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              {t.size}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map(size => (
                <button
                  key={size.value}
                  onClick={() => setSelectedSize(size.value)}
                  className={`px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                    selectedSize === size.value
                      ? 'bg-[#ff0000] text-white border-[#ff0000] shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#ff0000]'
                  }`}
                >
                  {size.label}
                  <span className="block text-[10px] sm:text-xs opacity-80">
                    ₾{size.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Начинка */}
          <div className="mb-4">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              {t.filling}
            </label>
            <select
              value={selectedFilling}
              onChange={(e) => setSelectedFilling(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent bg-white"
            >
              {product.fillings.map(filling => (
                <option key={filling} value={filling}>
                  {filling}
                </option>
              ))}
            </select>
          </div>

          {/* Текст на торте */}
          <div className="mb-4">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              {t.cakeText}
            </label>
            <textarea
              value={cakeText}
              onChange={(e) => setCakeText(e.target.value)}
              rows={2}
              placeholder={t.cakeText}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent resize-none"
            />
          </div>

          {/* Кнопка добавления */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#ff0000] hover:bg-[#cc0000] text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <ShoppingCart className="w-5 h-5" />
            {t.addToCart} — ₾{selectedPrice}
          </button>
        </div>
      </div>
    </div>
  );
};