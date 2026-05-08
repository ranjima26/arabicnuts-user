import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import logoIcon from "figma:asset/4ad3b8a239befc4caeab434186a8daffd93b0422.png";
import svgPaths from "../../imports/svg-1pjt8k5z2y";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#496506] via-[#3d5405] to-[#496506] text-white pt-16 md:pt-20 lg:pt-24 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Logo & Contact */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logoIcon.src} alt="Arabic Dry Fruits" className="h-12 w-auto brightness-0 invert" />
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Premium quality dry fruits and nuts delivered fresh to your doorstep. Your trusted source for healthy snacking.
            </p>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-white/90 mb-4">Contact Us</h4>
              <a href="tel:+919895544321" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+91 989 5544 321</span>
              </a>
              <a href="mailto:support@arabicdryfruits.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm">support@arabicdryfruits.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm pt-2">Silk Board Junction, Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Collections', 'Best Sellers', 'Gift Hampers', 'Wholesale', 'Bulk Enquiry', 'About Us', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white transition-colors"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Customer Support</h4>
            <ul className="space-y-3">
              {['FAQ', 'Shipping Information', 'Return Policy', 'Privacy Policy', 'Terms & Conditions'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white transition-colors"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience & Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Experience the Purity</h4>
            <ul className="space-y-3 mb-8">
              {['100% Natural', 'No Additives', 'No Preservatives', 'Airtight Packaging', 'Ethically Sourced'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-white/70">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <h5 className="font-semibold mb-3 text-white">Subscribe to Newsletter</h5>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                />
                <button className="bg-white text-[#496506] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a 
                href="#instagram" 
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center group hover:scale-110"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 36 36" fill="none">
                  <path d={svgPaths.p16bcd900} fill="white" />
                </svg>
              </a>
              <a 
                href="#facebook" 
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center group hover:scale-110"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 48 48" fill="none">
                  <path d={svgPaths.pceb8700} fill="white" />
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-white/70 text-center">
              © 2026 Arabic Dry Fruits. All Rights Reserved. Made with ❤️ in India
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/70">We Accept:</span>
              <div className="flex gap-2">
                {['VISA', 'MC', 'UPI'].map((method) => (
                  <div key={method} className="bg-white/10 px-3 py-1 rounded text-xs font-semibold">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}