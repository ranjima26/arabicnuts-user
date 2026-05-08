import jarImage1 from "figma:asset/0d50403659dbeb714860454d0322380314619c03.png";
import jarImage2 from "figma:asset/e532d51a5ba627aaa554d0454c4e4a1e20c1780c.png";
import jarImage3 from "figma:asset/bafcbb36618376f2be6baa21a502e6dde5d503ce.png";
import { Star, ShoppingCart, Heart } from 'lucide-react';

const bestSellers = [
  {
    id: 1,
    name: 'Premium Almonds',
    description: 'California almonds roasted to perfection',
    price: '₹599',
    originalPrice: '₹799',
    rating: 4.5,
    image: jarImage1,
    discount: '25% OFF',
  },
  {
    id: 2,
    name: 'Cashew Nuts',
    description: 'Premium whole cashews',
    price: '₹699',
    originalPrice: '₹899',
    rating: 4.8,
    image: jarImage2,
    discount: '22% OFF',
  },
  {
    id: 3,
    name: 'Mixed Dry Fruits',
    description: 'Assorted premium nuts',
    price: '₹849',
    originalPrice: '₹1099',
    rating: 4.7,
    image: jarImage3,
    discount: '23% OFF',
  },
  {
    id: 4,
    name: 'Roasted Pistachios',
    description: 'Lightly salted pistachios',
    price: '₹899',
    originalPrice: '₹1199',
    rating: 4.6,
    image: jarImage1,
    discount: '25% OFF',
  },
  {
    id: 5,
    name: 'Walnut Kernels',
    description: 'Premium quality walnuts',
    price: '₹799',
    originalPrice: '₹999',
    rating: 4.5,
    image: jarImage2,
    discount: '20% OFF',
  },
  {
    id: 6,
    name: 'Dried Dates',
    description: 'Natural sweet dates',
    price: '₹449',
    originalPrice: '₹599',
    rating: 4.9,
    image: jarImage3,
    discount: '25% OFF',
  },
];

export function BestSellers() {
  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden" id="best-sellers">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #496506 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-20">
          <div className="inline-block">
            <p className="text-sm md:text-base text-[#496506] font-semibold mb-2 tracking-wider uppercase">Top Rated</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[#65615e] mb-2 tracking-tight">
              Our Most Loved
            </h2>
            <h3 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-[#65615e] via-[#496506] to-[#65615e] bg-clip-text text-transparent tracking-tight">
              Selections
            </h3>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#496506] to-transparent mx-auto mt-6 rounded-full"></div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={product.image.src}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {product.discount}
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-white">
                  <Heart className="w-5 h-5 text-gray-700 hover:text-red-500 hover:fill-red-500 transition-colors" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">({product.rating})</span>
                </div>

                {/* Product Name */}
                <h4 className="text-xl md:text-2xl font-bold text-[#373737] mb-2 group-hover:text-[#496506] transition-colors">
                  {product.name}
                </h4>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 capitalize leading-relaxed">
                  {product.description}
                </p>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-2xl md:text-3xl font-bold text-[#496506]">
                      {product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through ml-2">
                      {product.originalPrice}
                    </span>
                  </div>
                  <button className="bg-gradient-to-r from-[#496506] to-[#3d5405] text-white p-3 md:p-4 rounded-full hover:shadow-xl transition-all hover:scale-110 group/btn">
                    <ShoppingCart className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browse More */}
        <div className="text-center mt-12 lg:mt-16">
          <button className="bg-gradient-to-r from-[#496506] to-[#3d5405] text-white px-12 py-4 rounded-full font-semibold hover:shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-3">
            Browse More Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}