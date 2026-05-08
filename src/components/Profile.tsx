"use client";

import React, { useState } from 'react';
import { User, ShoppingBag, LogOut, ChevronRight, MapPin, Phone, Mail, Edit2, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useUpdateProfileMutation } from '@/redux/api/userApi';
import { toast } from 'react-toastify';

interface Order {
  id: string;
  date: string;
  items: number;
  price: number;
  status: 'DELIVERED' | 'PROCESSING';
}

const orders: Order[] = [
  { id: '#ORD-7721', date: '24 Apr 2024', items: 2, price: 899, status: 'DELIVERED' },
  { id: '#ORD-6542', date: '12 Mar 2024', items: 1, price: 1250, status: 'PROCESSING' },
  { id: '#ORD-5431', date: '05 Feb 2024', items: 3, price: 450, status: 'DELIVERED' },
];

export default function Profile() {
  const { user: authUser } = useAuth();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [activeTab, setActiveTab] = useState<'details' | 'orders'>('details');

  const [formData, setFormData] = useState({
    name: authUser?.name || "",
    email: authUser?.email || "",
    phone: "+91 00 00 00 00 00",
    location: "Kochi, Kerala, India"
  });

  // Sync with session data when it loads
  React.useEffect(() => {
    if (authUser) {
      setFormData(prev => ({
        ...prev,
        name: authUser.name || prev.name,
        email: authUser.email || prev.email
      }));
    }
  }, [authUser]);

  const userName = formData.name || "User";
  const userEmail = formData.email || "user@example.com";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        // Add other fields if your backend supports them
      }).unwrap();

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] pb-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#496506]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D39B16]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 pt-12 md:pt-20 relative z-10">
        {/* Premium Profile Header */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-[#496506]/10 mb-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#496506]/5 rounded-bl-full pointer-events-none"></div>
          
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#496506]/10 p-1 bg-white overflow-hidden transition-transform duration-500 group-hover:scale-105">
              <div className="w-full h-full bg-[#f4f7ed] rounded-full flex items-center justify-center">
                <User className="w-16 h-16 md:w-20 md:h-20 text-[#496506]/30" />
              </div>
            </div>
            <button className="absolute bottom-2 right-2 p-3 bg-[#496506] text-white rounded-full shadow-lg hover:bg-[#3a5105] transition-all transform hover:scale-110 active:scale-90">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="inline-block px-4 py-1 bg-[#496506]/10 text-[#496506] text-xs font-bold rounded-full mb-3 tracking-widest uppercase">
              Loyalty Member
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">Welcome, {userName}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-500 mt-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#496506]" />
                <span className="text-sm font-medium">{userEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#496506]" />
                <span className="text-sm font-medium">Kochi, India</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white border border-gray-100 p-6 rounded-[32px] shadow-sm min-w-[240px]">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Need Assistance?</p>
              <div className="space-y-2">
                <a href="tel:+919876543210" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-[#f4f7ed] rounded-xl flex items-center justify-center text-[#496506] group-hover:bg-[#496506] group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-black text-gray-900">+91 989 5544 321</span>
                </a>
                <a href="mailto:support@arabicnuts.com" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-[#f4f7ed] rounded-xl flex items-center justify-center text-[#496506] group-hover:bg-[#496506] group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-black text-gray-900">support@arabicdryfruits.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[32px] p-4 shadow-sm border border-[#496506]/5">
              <div className="p-4 mb-2">
                <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Menu</p>
              </div>
              <nav className="space-y-2">
                {[
                  { id: 'details', label: 'Profile Details', icon: User },
                  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                      activeTab === item.id 
                        ? 'bg-[#496506] text-white shadow-lg shadow-[#496506]/20' 
                        : 'text-gray-600 hover:bg-[#f4f7ed] hover:text-[#496506]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className="w-5 h-5" />
                      <span className="font-bold">{item.label}</span>
                    </div>
                    {activeTab === item.id && <ChevronRight className="w-4 h-4 animate-bounce-x" />}
                  </button>
                ))}
                
                <div className="h-[1px] bg-gray-100 my-4 mx-4"></div>
                
                <button 
                  onClick={() => signOut(auth)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[40px] shadow-sm border border-[#496506]/5 overflow-hidden">
              <div className="p-8 md:p-10">
                {activeTab === 'details' ? (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 mb-2">Profile Details</h2>
                      <p className="text-gray-500">Manage your account information and preferences.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {[
                        { label: 'Full Name', name: 'name', value: formData.name, icon: User },
                        { label: 'Email Address', name: 'email', value: formData.email, icon: Mail },
                        { label: 'Phone Number', name: 'phone', value: formData.phone, icon: Phone },
                        { label: 'Location', name: 'location', value: formData.location, icon: MapPin },
                      ].map((field) => (
                        <div key={field.label} className="space-y-3 group">
                          <label className="text-xs font-black text-[#496506] uppercase tracking-widest ml-1">{field.label}</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              name={field.name}
                              value={field.value} 
                              onChange={handleInputChange}
                              className="w-full p-5 bg-[#f4f7ed]/50 rounded-2xl border-2 border-transparent focus:border-[#496506] focus:bg-white outline-none transition-all font-bold text-gray-800 placeholder-gray-400"
                            />
                            <field.icon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#496506] transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4">
                      <button 
                        onClick={handleUpdate}
                        disabled={isUpdating}
                        className="px-10 py-5 bg-[#496506] text-white rounded-2xl font-black hover:bg-[#3a5105] transition-all shadow-xl shadow-[#496506]/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100"
                      >
                        {isUpdating ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 mb-2">Recent Orders</h2>
                      <p className="text-gray-500">Track and manage your recent purchases.</p>
                    </div>
                    
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="group bg-[#f4f7ed]/30 p-6 rounded-3xl flex items-center justify-between border-2 border-transparent hover:border-[#496506]/20 hover:bg-white transition-all cursor-pointer">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                              <ShoppingBag className="w-7 h-7 text-[#496506]" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-black text-xl text-gray-900 leading-tight">{order.id}</h3>
                                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                                  order.status === 'DELIVERED' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter">{order.date} • {order.items} Items</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-8">
                            <div className="text-right">
                              <p className="font-black text-2xl text-gray-900">₹{order.price}</p>
                            </div>
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center group-hover:bg-[#496506] group-hover:text-white shadow-sm transition-all">
                              <ChevronRight className="w-6 h-6" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full py-5 rounded-2xl border-2 border-dashed border-[#496506]/30 text-[#496506] font-black hover:bg-[#496506]/5 transition-all">
                      View All Orders
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
