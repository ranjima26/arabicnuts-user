"use client";

import React, { useState } from 'react';
import { User, ShoppingBag, LogOut, ChevronRight, MapPin, Phone, Mail, Edit2, Shield, ArrowLeft, Package, Truck, CreditCard, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useUpdateProfileMutation, useGetMeQuery } from '@/redux/api/userApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMyOrdersQuery } from '@/redux/api/orderApi';
import imgMedjool from "@/assets/medjool_dates.png";

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const { data: userData, refetch: refetchUser, isLoading: getMeLoading } = useGetMeQuery({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  
  const initialTab = (searchParams.get('tab') as 'details' | 'orders') || 'details';
  const [activeTab, setActiveTab] = useState<'details' | 'orders'>(initialTab);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showAllOrders, setShowAllOrders] = useState(false);
  
  const { data: dbOrders, isLoading: isLoadingOrders } = useMyOrdersQuery({});
  const orders = dbOrders || [];

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "", 
    location: user?.userAddress || "" 
  });
  const [isMounted, setIsMounted] = useState(false);
  const hasInitialized = React.useRef(false);

  React.useEffect(() => {
    setIsMounted(true);
    const displayUser = userData?.user || user;
    if (displayUser) {
      setFormData({
        name: displayUser.name || "",
        email: displayUser.email || "",
        phone: displayUser.phone || "",
        location: displayUser.userAddress || ""
      });
    }
  }, [user, userData]);

  const userName = formData.name || "User";
  const userEmail = formData.email || "user@example.com";
  const userLocation = formData.location || "Location not set";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location
      }).unwrap();

      if (updatedUser?.user) {
        setFormData({
          name: updatedUser.user.name || "",
          email: updatedUser.user.email || "",
          phone: updatedUser.user.phone || "",
          location: updatedUser.user.userAddress || ""
        });
      }

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFCF7] pb-20 relative overflow-hidden">
     
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#496506]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D39B16]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 pt-28 md:pt-20 relative z-10">
      
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
                <span className="text-sm font-medium">{userLocation}</span>
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
                  onClick={() => {
                    signOut(auth);
                    router.push('/');
                  }}
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
                        { label: 'Full Name', name: 'name', value: formData.name, icon: User, placeholder: "Your Name" },
                        { label: 'Email Address', name: 'email', value: formData.email, icon: Mail, placeholder: "your@email.com" },
                        { label: 'Phone Number', name: 'phone', value: formData.phone, icon: Phone, placeholder: "10 digit mobile number" },
                        { label: 'Location', name: 'location', value: formData.location, icon: MapPin, placeholder: "eg. Kochi" },
                      ].map((field) => (
                        <div key={field.label} className="space-y-3 group">
                          <label className="text-xs font-black text-[#496506] uppercase tracking-widest ml-1">{field.label}</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              name={field.name}
                              value={field.value} 
                              placeholder={field.placeholder}
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
                    {selectedOrder ? (
                      <div className="space-y-8">
                        {/* Back Button & Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <button 
                            onClick={() => setSelectedOrder(null)}
                            className="flex items-center gap-2 text-[#496506] font-bold hover:gap-3 transition-all group w-fit"
                          >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Orders</span>
                          </button>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Status:</span>
                            <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${
                              selectedOrder.orderStatus?.toUpperCase() === 'DELIVERED' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-[#496506]/10 text-[#496506]'
                            }`}>
                              {selectedOrder.orderStatus}
                            </span>
                          </div>
                        </div>

                        {/* Order Identity Card */}
                        <div className="bg-[#f4f7ed]/50 rounded-[32px] p-8 border-2 border-dashed border-[#496506]/10">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</p>
                              <p className="text-xl font-black text-gray-900">#{selectedOrder._id?.slice(-8).toUpperCase()}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Placed On</p>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#496506]" />
                                <p className="text-xl font-black text-gray-900">
                                  {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A'}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount</p>
                              <p className="text-3xl font-black text-[#496506]">₹{selectedOrder.totalAmount?.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>

                        {/* Order Details Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Items Section */}
                          <div className="space-y-6">
                            <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                              <Package className="w-6 h-6 text-[#496506]" />
                              Order Items
                            </h3>
                            <div className="space-y-4">
                              {selectedOrder.orderItems?.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                                  <div className="w-16 h-16 bg-[#f4f7ed] rounded-2xl flex-shrink-0 overflow-hidden">
                                    <img src={item.name?.toLowerCase().includes('medjool') ? imgMedjool.src : item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
                                    <p className="text-sm text-gray-500 font-medium">Quantity: {item.quantity}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-black text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    <p className="text-[10px] text-gray-400 font-bold">₹{item.price}/each</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Summary Breakdown */}
                            <div className="bg-gray-50 rounded-[32px] p-6 space-y-4">
                              <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                                <span>Subtotal</span>
                                <span className="text-gray-900">₹{selectedOrder.itemsPrice?.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                                <span>Shipping Fee</span>
                                <span className="text-gray-900">₹{selectedOrder.shippingAmount || 0}</span>
                              </div>
                              <div className="h-[1px] bg-gray-200"></div>
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-black text-gray-900">Total</span>
                                <span className="text-2xl font-black text-[#496506]">₹{selectedOrder.totalAmount?.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>

                          {/* Shipping & Payment Section */}
                          <div className="space-y-8">
                            <div className="space-y-6">
                              <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                                <Truck className="w-6 h-6 text-[#496506]" />
                                Shipping Details
                              </h3>
                              <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
                                <div>
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Full Name</p>
                                  <p className="font-bold text-gray-900">{selectedOrder.shippingAddress?.fullName || selectedOrder.shippingInfo?.fullName}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Address</p>
                                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                                    {selectedOrder.shippingAddress?.address || selectedOrder.shippingInfo?.address},<br />
                                    {selectedOrder.shippingAddress?.city || selectedOrder.shippingInfo?.city}, {selectedOrder.shippingAddress?.state || selectedOrder.shippingInfo?.state} - {selectedOrder.shippingAddress?.pinCode || selectedOrder.shippingInfo?.zipCode}
                                  </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                                    <p className="text-sm font-bold text-gray-900">{selectedOrder.shippingAddress?.phone || selectedOrder.shippingInfo?.phoneNo}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email</p>
                                    <p className="text-sm font-bold text-gray-900">{selectedOrder.shippingAddress?.email || selectedOrder.shippingInfo?.email}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-[#496506]" />
                                Payment Method
                              </h3>
                              <div className="bg-[#496506] p-6 rounded-[32px] text-white flex items-center justify-between shadow-lg shadow-[#496506]/20">
                                <div>
                                  <p className="text-[10px] font-black text-[#f4f7ed]/50 uppercase tracking-widest mb-1">Method</p>
                                  <p className="text-xl font-black">{selectedOrder.paymentMethod || 'COD'}</p>
                                </div>
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                  <Shield className="w-6 h-6" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <h2 className="text-3xl font-black text-gray-900 mb-2">Recent Orders</h2>
                          <p className="text-gray-500">Track and manage your recent purchases.</p>
                        </div>
                        
                        <div className="space-y-6">
                          {isLoadingOrders ? (
                            <div className="text-center py-20">
                              <p className="text-gray-500 animate-pulse">Loading your orders...</p>
                            </div>
                          ) : !orders || orders.length === 0 ? (
                            <div className="text-center py-20 bg-[#f4f7ed]/20 rounded-[40px] border-2 border-dashed border-[#496506]/10 px-6">
                              <ShoppingBag className="w-16 h-16 text-[#496506]/20 mx-auto mb-4" />
                              <p className="text-gray-900 font-bold text-xl mb-2">No orders yet</p>
                              <p className="text-gray-500 mb-8 max-w-xs mx-auto">Looks like you haven't placed any orders yet. Start shopping to see your orders here!</p>
                              <button 
                                onClick={() => window.location.href = '/shop'}
                                className="px-8 py-4 bg-[#496506] text-white rounded-2xl font-black hover:bg-[#3a5105] transition-all shadow-lg shadow-[#496506]/20"
                              >
                                Explore Shop
                              </button>
                            </div>
                          ) : (
                            (showAllOrders ? orders : orders.slice(0, 1)).map((order: any) => (
                              <div 
                                key={order._id || order.id} 
                                onClick={() => setSelectedOrder(order)}
                                className="group bg-[#f4f7ed]/30 p-6 rounded-3xl flex items-center justify-between border-2 border-transparent hover:border-[#496506]/20 hover:bg-white transition-all cursor-pointer"
                              >
                                <div className="flex items-center gap-6">
                                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                                    <ShoppingBag className="w-7 h-7 text-[#496506]" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-3 mb-1">
                                      <h3 className="font-black text-xl text-gray-900 leading-tight">#{order._id?.slice(-6).toUpperCase() || order.id}</h3>
                                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                                        (order.orderStatus || order.status)?.toUpperCase() === 'DELIVERED' 
                                          ? 'bg-green-100 text-green-700' 
                                          : 'bg-blue-100 text-blue-700'
                                      }`}>
                                        {order.orderStatus || order.status}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter">
                                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : order.date} • {order.orderItems?.length || order.items?.length || 0} Items
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-8">
                                  <div className="text-right flex flex-col items-end gap-1">
                                    <p className="font-black text-2xl text-gray-900">₹{(order.totalAmount || order.total || order.price)?.toLocaleString()}</p>
                                    <span className="text-[10px] font-black text-[#496506] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View Order</span>
                                  </div>
                                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center group-hover:bg-[#496506] group-hover:text-white shadow-sm transition-all">
                                    <ChevronRight className="w-6 h-6" />
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                        
                        {orders && orders.length > 1 && !selectedOrder && (
                          <button 
                            onClick={() => setShowAllOrders(!showAllOrders)}
                            className="w-full py-5 rounded-2xl border-2 border-dashed border-[#496506]/30 text-[#496506] font-black hover:bg-[#496506]/5 transition-all mt-6"
                          >
                            {showAllOrders ? "Show Recent Order" : `View All Orders (${orders.length})`}
                          </button>
                        )}
                      </>
                    )}
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
