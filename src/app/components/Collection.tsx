import jarImage1 from "figma:asset/0d50403659dbeb714860454d0322380314619c03.png";
import jarImage2 from "figma:asset/e532d51a5ba627aaa554d0454c4e4a1e20c1780c.png";
import jarImage3 from "figma:asset/bafcbb36618376f2be6baa21a502e6dde5d503ce.png";
import jarImage4 from "figma:asset/74d9a6c3bef843949950fe498bf3c54e2386ee9a.png";
import jarImage5 from "figma:asset/b75f359c97a9056886d9272d1913f28f8d483254.png";
import { Eye } from 'lucide-react';

const products = [
  { id: 1, name: 'Almonds', description: 'Premium whole California almonds', image: jarImage1 },
  { id: 2, name: 'Cashews', description: 'Premium whole California almonds', image: jarImage2 },
  { id: 3, name: 'Pistachios', description: 'Premium whole California almonds', image: jarImage3 },
  { id: 4, name: 'Walnuts', description: 'Premium whole California almonds', image: jarImage4 },
  { id: 5, name: 'Mixed Nuts', description: 'Premium whole California almonds', image: jarImage2 },
  { id: 6, name: 'Dried Figs', description: 'Premium whole California almonds', image: jarImage4 },
  { id: 7, name: 'Dates', description: 'Premium whole California almonds', image: jarImage3 },
  { id: 8, name: 'Raisins', description: 'Premium whole California almonds', image: jarImage5 },
];

export function Collection() {
  return (
    <section className="py-16 md:py-20 lg:py-28 bg-white relative overflow-hidden" id="collections">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_rgba(73,101,6,0.05)_0%,_transparent_50%)]"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-20">
          <div className="inline-block">
            <p className="text-sm md:text-base text-[#496506] font-semibold mb-2 tracking-wider uppercase">Discover Excellence</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[#65615e] mb-2 tracking-tight">
              Explore Our
            </h2>
            <h3 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-[#65615e] via-[#496506] to-[#65615e] bg-clip-text text-transparent tracking-tight">
              Collection
            </h3>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#496506] to-transparent mx-auto mt-6 rounded-full"></div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="group text-center cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                {/* Product Image */}
                <div className="relative w-full aspect-[240/229] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      <button className="bg-white/90 backdrop-blur-sm text-[#496506] px-4 py-2 rounded-full text-sm font-semibold hover:bg-white transition-colors flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Quick View
                      </button>
                    </div>
                  </div>
                  {/* Badge */}
                  {index < 3 && (
                    <div className="absolute top-3 right-3 bg-[#496506] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Popular
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="p-4 md:p-5">
                  <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-[#373737] mb-2 capitalize group-hover:text-[#496506] transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 capitalize leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 lg:mt-16">
          <button className="bg-gradient-to-r from-[#496506] to-[#3d5405] text-white px-10 py-4 rounded-full font-semibold hover:shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-2">
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}