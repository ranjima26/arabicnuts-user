"use client";
import { useState } from "react";
import { motion } from "motion/react";
import imgBgLogo from "@/assets/0a072b9885ca84a574ec1ed74c34c0098abc5ff1.png";
import { Phone, Mail, MapPin, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({ fullName: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ fullName: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.message || "Failed to submit enquiry.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const infoCards = [
    {
      icon: Phone,
      title: "Speak With Us",
      subtitle: "CONCIERGE LINE",
      details: "+971 4 000 0000"
    },
    {
      icon: Mail,
      title: "Digital Inquiry",
      subtitle: "GENERAL ENQUIRIES",
      details: "curations@al-nur.ae"
    },
    {
      icon: MapPin,
      title: "The Boutique",
      subtitle: "FLAGSHIP STORE",
      details: "Al-Wasl Road, Jumeirah,\nDubai"
    }
  ];

  return (
    <div className="w-full bg-[#fcfcfb] flex flex-col items-center overflow-x-hidden font-['Roboto',sans-serif] min-h-screen">
      
      {/* Background Watermark */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[600px] overflow-hidden pointer-events-none z-0 flex justify-center opacity-[0.15]">
        <img 
          src={imgBgLogo.src} 
          alt="Watermark" 
          className="w-full object-cover object-top -translate-y-[10%]"
        />
      </div>

      {/* Hero Section */}
      <section className="relative w-full max-w-[1280px] pt-16 pb-12 md:pt-24 md:pb-20 px-4 flex flex-col items-center text-center z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#65615e] font-medium text-4xl md:text-6xl lg:text-[75px] uppercase tracking-wide mb-6"
        >
          Get in Touch
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#4d4635] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          Experience the essence of heritage. Whether it's a private curation or a corporate gift, our artisans are ready to assist.
        </motion.p>
      </section>

      {/* Contact Grid Section */}
      <section className="relative w-full max-w-[1150px] px-4 md:px-8 pb-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column: Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {infoCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-[#f4ebd0]/50 backdrop-blur-md rounded-[32px] p-8 flex items-start gap-6 border border-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] transition-shadow group"
              >
                <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 flex items-center justify-center shrink-0 group-hover:bg-[#d4af37]/30 transition-colors">
                  <card.icon className="text-[#735c00] w-6 h-6" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-serif text-xl text-[#1b1d0e] mb-1">{card.title}</h3>
                  <p className="text-[#4d4635] text-xs tracking-[0.1em] uppercase font-bold mb-3">{card.subtitle}</p>
                  <p className="text-[#1b1d0e] text-[17px] whitespace-pre-line leading-relaxed">{card.details}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-7 bg-[#496506] rounded-[40px] md:rounded-[48px] p-8 md:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden"
          >
            {/* Subtle inner border */}
            <div className="absolute inset-0 border border-[#d0c5af]/20 rounded-[inherit] pointer-events-none m-2"></div>
            
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] tracking-[0.1em] uppercase font-bold text-white/90">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Khalid Al-Mansouri"
                    className="bg-transparent border-b border-white/50 text-white text-lg pb-3 placeholder:text-white/40 focus:outline-none focus:border-white transition-colors w-full rounded-none"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] tracking-[0.1em] uppercase font-bold text-white/90">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="khalid@example.com"
                    className="bg-transparent border-b border-white/50 text-white text-lg pb-3 placeholder:text-white/40 focus:outline-none focus:border-white transition-colors w-full rounded-none"
                  />
                </div>
              </div>

              {/* Your Message */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] tracking-[0.1em] uppercase font-bold text-white/90">
                  Your Message
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us how we can help..."
                  className="bg-transparent border-b border-white/50 text-white text-lg pb-3 min-h-[100px] resize-none placeholder:text-white/40 focus:outline-none focus:border-white transition-colors w-full rounded-none"
                ></textarea>
              </div>

              {/* Submit Button & Messages */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-white text-[#496506] px-8 py-4 rounded-full font-bold text-base md:text-lg flex items-center justify-center gap-3 hover:bg-[#f4ebd0] transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none min-w-[200px]"
                >
                  {loading ? (
                    <>
                      Sending...
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#d4af37]" />
                    <span className="font-medium text-sm">Message sent successfully!</span>
                  </motion.div>
                )}

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-white bg-red-500/20 px-4 py-2 rounded-full border border-red-500/30"
                  >
                    <span className="font-medium text-sm">{error}</span>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
