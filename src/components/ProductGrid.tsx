import React from 'react';

interface Product {
  id: number;
  name: string | { ka: string; en: string; ru: string; tr: string };
  price: number;
  category: string;
  image: string;
  rating: number;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  language?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  language = 'ka',
}) => {
  const getButtonText = () => {
    const texts = {
      ka: 'კალათაში',
      en: 'Add to cart',
      ru: 'В корзину',
      tr: 'Sepete ekle',
    };
    return texts[language as keyof typeof texts] || texts.en;
  };

  const getProductName = (name: Product['name']) => {
    if (typeof name === 'string') return name;
    return name[language as keyof typeof name] || name.ka || '';
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
        >
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={getProductName(product.name)}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-2 sm:p-3 md:p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs text-red-600 font-medium uppercase tracking-wider truncate max-w-[60px] sm:max-w-full">
                {product.category}
              </span>
              <span className="text-[10px] sm:text-xs text-yellow-500 flex-shrink-0">
                ★ {product.rating}
              </span>
            </div>

            <h3 className="font-semibold text-gray-800 mt-0.5 sm:mt-1 text-xs sm:text-sm line-clamp-2 min-h-[32px] sm:min-h-[40px]">
              {getProductName(product.name)}
            </h3>

            <div className="flex items-center justify-between mt-1.5 sm:mt-2 md:mt-3">
              <span className="font-bold text-sm sm:text-base md:text-lg text-gray-900">
                {product.price.toLocaleString()} ₾
              </span>
              <button
                onClick={() => onAddToCart && onAddToCart(product)}
                className="bg-[#ff0000] text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:bg-[#cc0000] transition-all hover:scale-105 text-[10px] sm:text-xs font-medium whitespace-nowrap"
              >
                {getButtonText()}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};