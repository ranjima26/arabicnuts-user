import testimonialImage from "figma:asset/ead8983e47edd5d7cbe882b76eb16cf1fb20bf55.png";
import customer1 from "figma:asset/76b1495ea793d0dee550cbf76acf759daa80302a.png";
import customer2 from "figma:asset/63e0e0979ded08e8307c3fdf4338d4c15d1aa300.png";
import customer3 from "figma:asset/5183e0871184644c2cf72801f961aa2bc5f11c5e.png";
import customer4 from "figma:asset/1fa2756015abbcf59afc6bed1f3343d4736390f4.png";
import customer5 from "figma:asset/0a570498e9760a2a3019c472ebb83802808c529a.png";
import customer6 from "figma:asset/537e0c80cb683c7e20f666033172b7ca5bea2fc7.png";
import { Quote, Star } from 'lucide-react';
import Image from "next/image";

const customers = [customer1, customer2, customer3, customer4, customer5, customer6];

export function Testimonials() {
  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 rounded-full bg-gradient-to-br from-[#D39B16]/20 to-[#FFC98C]/20 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-[#D39B16]/20 to-[#FFC98C]/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Decorative circles */}
      <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-[#496506]/30"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 rounded-full bg-[#D39B16]/30"></div>
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-[#496506]/30"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-20">
          <div className="inline-block">
            <p className="text-sm md:text-base text-[#496506] font-semibold mb-2 tracking-wider uppercase">Testimonials</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[#65615e] mb-2 tracking-tight">
              What Our
            </h2>
            <h3 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-[#65615e] via-[#496506] to-[#65615e] bg-clip-text text-transparent tracking-tight">
              Customers Say
            </h3>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#496506] to-transparent mx-auto mt-6 rounded-full"></div>
          </div>
        </div>

        {/* Customer Images Circle */}
        <div className="relative w-full max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="flex justify-center items-center min-h-[400px] md:min-h-[500px]">
            {/* Center featured testimonial */}
            <div className="relative z-20 group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#496506]/20 to-[#D39B16]/20 rounded-full blur-2xl group-hover:blur-3xl transition-all"></div>
              <div className="relative w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-8 border-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <Image
                  src={testimonialImage}
                  alt="Nadiya S."
                  className="w-full h-full object-cover"
                />
                {/* Verified Badge */}
                <div className="absolute bottom-2 right-2 bg-gradient-to-r from-green-500 to-green-600 text-white p-2 rounded-full shadow-lg">
                  <Star className="w-5 h-5 fill-white" />
                </div>
              </div>
            </div>

            {/* Surrounding customer avatars */}
            <div className="absolute inset-0 flex items-center justify-center">
              {customers.map((customer, index) => {
                const angle = (index * 60) - 90;
                const radius = window.innerWidth < 768 ? 130 : window.innerWidth < 1024 ? 180 : 220;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                
                return (
                  <div
                    key={index}
                    className="absolute w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      animationDelay: `${index * 0.2}s`,
                    }}
                  >
                    <Image 
                      src={customer}
                      alt={`Customer ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
              
              {/* Gradient circles for decoration */}
              {[0, 120, 240].map((angle, i) => {
                const x = Math.cos((angle * Math.PI) / 180) * 250;
                const y = Math.sin((angle * Math.PI) / 180) * 250;
                return (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-[#D39B16] to-[#FFC98C] animate-pulse"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#496506] to-[#3d5405] rounded-full flex items-center justify-center shadow-lg">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 md:w-8 md:h-8 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-xl md:text-2xl lg:text-3xl text-[#373737] text-center italic font-light mb-8 leading-relaxed">
              "Best dry fruits I've purchased online. The quality is outstanding and delivery was prompt. Will definitely reorder!"
            </p>

            {/* Customer Info */}
            <div className="text-center">
              <h4 className="text-xl md:text-2xl font-bold text-[#496506] mb-2">
                Nadiya S.
              </h4>
              <p className="text-base md:text-lg text-gray-600">
                Bengaluru, India
              </p>
            </div>

            {/* Decorative Line */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#496506] to-transparent mx-auto mt-6 rounded-full"></div>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12 lg:mt-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-3xl md:text-4xl font-bold text-[#496506] mb-2">4.9★</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-3xl md:text-4xl font-bold text-[#496506] mb-2">10K+</p>
            <p className="text-sm text-gray-600">Reviews</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-3xl md:text-4xl font-bold text-[#496506] mb-2">98%</p>
            <p className="text-sm text-gray-600">Recommend Us</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-3xl md:text-4xl font-bold text-[#496506] mb-2">50K+</p>
            <p className="text-sm text-gray-600">Happy Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
}