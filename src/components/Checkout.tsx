"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Truck,
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { clearBuyNowItem, clearCartItems } from '@/redux/slices/cartSlice';
import jarImage from '@/assets/0d50403659dbeb714860454d0322380314619c03.png';
import imgMedjool from "@/assets/medjool_dates.png";
import { useAuth } from '@/hooks/useAuth';
import { useCreateNewOrderMutation } from '@/redux/api/orderApi';
import { toast } from 'sonner';


// ── Checkout Validation Helpers ──────────────────────────────────────────────
const checkoutValidators: Record<string, (v: string) => string> = {
  name: (v) => v.trim() ? "" : "Full name is required.",
  email: (v) => {
    if (!v) return "Email is required.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Please enter a valid email address.";
  },
  phone: (v) => {
    if (!v) return "Phone number is required.";
    return /^[6-9]\d{9}$/.test(v.replace(/\s/g, "")) ? "" : "Enter a valid 10-digit Indian mobile number.";
  },
  address: (v) => v.trim() ? "" : "Delivery address is required.",
  city: (v) => v.trim() ? "" : "City is required.",
  state: (v) => v.trim() ? "" : "State is required.",
  pinCode: (v) => {
    if (!v) return "Pin code is required.";
    return /^\d{6}$/.test(v) ? "" : "Enter a valid 6-digit pin code.";
  },
};

function FieldError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
      <XCircle size={12} className="shrink-0" />
      {message}
    </p>
  );
}

export function Checkout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('online');
  const [createNewOrder, { isLoading: isCreatingOrder }] = useCreateNewOrderMutation();
  const [isMounted, setIsMounted] = useState(false);
  
  const [shippingData, setShippingData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: ''
  });

  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({
    name: '', email: '', phone: '', address: '', city: '', state: '', pinCode: ''
  });
  const [shippingTouched, setShippingTouched] = useState<Record<string, boolean>>({
    name: false, email: false, phone: false, address: false, city: false, state: false, pinCode: false
  });

  const { cartItems, buyNowItem } = useSelector((state: any) => state.cart);

  const getSafePrice = (price: any) => {
    const raw = typeof price === 'string' ? price.replace(/[^\d]/g, '') : String(price);
    return Number(raw) || 0;
  };

  const items = user ? (buyNowItem ? [buyNowItem] : cartItems) : [];

  const subtotal = items.reduce((acc: number, item: any) => {
    const price = getSafePrice(item.price);
    const qty = Number(item.qty || item.quantity) || 1;
    return acc + (price * qty);
  }, 0);

  const total = subtotal;

  const validateAllFields = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    Object.keys(checkoutValidators).forEach((key) => {
      const err = checkoutValidators[key](shippingData[key as keyof typeof shippingData]);
      newErrors[key] = err;
      if (err) isValid = false;
    });
    setShippingErrors(newErrors);
    setShippingTouched(Object.keys(checkoutValidators).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    return isValid;
  };

  const fieldLabels: Record<string, string> = {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    address: "Delivery Address",
    city: "City",
    state: "State",
    pinCode: "Pin Code",
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      Swal.fire({
        title: 'Cart is Empty',
        text: 'Please add at least one item to your cart before placing an order.',
        icon: 'warning',
        confirmButtonColor: '#496506',
        customClass: { popup: 'rounded-[32px]', confirmButton: 'rounded-xl px-8 py-3' }
      });
      return;
    }

    if (!validateAllFields()) {
      // Collect which specific fields failed
      const failedFields = Object.keys(checkoutValidators)
        .filter((key) => checkoutValidators[key](shippingData[key as keyof typeof shippingData]) !== "")
        .map((key) => fieldLabels[key] || key);

      Swal.fire({
        title: 'Missing or Invalid Details',
        html: `<p style="margin-bottom:10px">Please correct the following fields before proceeding:</p><ul style="text-align:left;padding-left:20px">${failedFields.map(f => `<li style="margin:4px 0">• ${f}</li>`).join('')}</ul>`,
        icon: 'error',
        confirmButtonColor: '#e7000b',
        customClass: { popup: 'rounded-[32px]', confirmButton: 'rounded-xl px-8 py-3' }
      });
      return;
    }

    // Capture current items to preserve summary during success state
    const orderItems = items.map((item: { name: any; qty: any; quantity: any; image: any; price: any; productId: any; _id: any; }) => ({
      name: item.name,
      quantity: item.qty || item.quantity || 1,
      image: item.image,
      price: getSafePrice(item.price),
      productId: item.productId || item._id,
      qty: item.qty || 1
    }));

    createNewOrder({
      shippingAddress: {
        ...shippingData,
        fullName: shippingData.name
      },
      orderItems: orderItems,
      itemsPrice: subtotal,
      shippingPrice: 0,
      totalPrice: total,
      paymentMethod: paymentMethod,
      paymentInfo: {
        id: "COD",
        status: "Succeeded"
      },
      clearCart: !buyNowItem
    }).unwrap().then(() => {
      toast.success('Order Successful!', {
        description: 'Thank you for shopping with Arabic Dry Fruits. Your premium selection is being prepared!',
      });
      // Clear relevant items
      if (buyNowItem && buyNowItem._id) {
        dispatch(clearBuyNowItem());
      } else {
        dispatch(clearCartItems());
      }

      // Navigate to orders
      router.push('/profile?tab=orders');
    }).catch((err) => {
      toast.error(err?.data?.message || "Failed to place order");
    });
  };

  React.useEffect(() => {
    setIsMounted(true);
    // Redirect if not logged in
    if (!user && isMounted) {
      router.push('/');
    }
  }, [user, isMounted, router]);

  React.useEffect(() => {
    if (user && !shippingData.name && !shippingData.email) {
      setShippingData(prev => ({
        ...prev,
        name: user?.name || '',
        email: user?.email || '',
      }));
    }
  }, [user, shippingData.name, shippingData.email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
    // Live validation once the field has been touched
    if (shippingTouched[name] && checkoutValidators[name]) {
      setShippingErrors(prev => ({ ...prev, [name]: checkoutValidators[name](value) }));
    }
  };

  const handleBlur = (name: string) => {
    setShippingTouched(prev => ({ ...prev, [name]: true }));
    if (checkoutValidators[name]) {
      setShippingErrors(prev => ({
        ...prev,
        [name]: checkoutValidators[name](shippingData[name as keyof typeof shippingData])
      }));
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <form onSubmit={handlePlaceOrder} className="max-w-7xl mx-auto">

          {/* Header & Breadcrumbs */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Checkout</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Link href="/cart" className="hover:text-gray-800 transition-colors">Cart</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-800 font-medium">Shipping & Payment</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left Column: Forms */}
            <div className="lg:col-span-2 space-y-8">

              {/* Shipping Information */}
              <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#496506] via-[#3d5405] to-[#496506] rounded-full flex items-center justify-center text-white shadow-md shadow-[#496506]/20">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#343A40]">Shipping Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={shippingData.name}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('name')}
                        placeholder="Enter your full name"
                        className={`w-full bg-gray-50 border rounded-2xl py-4 pl-12 pr-4 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:bg-white transition-all outline-none font-bold ${
                          shippingTouched.name && shippingErrors.name
                            ? 'border-red-400 focus:ring-red-200'
                            : shippingTouched.name && !shippingErrors.name
                            ? 'border-green-400 focus:ring-green-200'
                            : 'border-gray-100 focus:ring-[#496506]'
                        }`}
                      />
                    </div>
                    <FieldError message={shippingTouched.name ? shippingErrors.name : ""} />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={shippingData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('email')}
                        placeholder="Enter your email address"
                        className={`w-full bg-gray-50 border rounded-2xl py-4 pl-12 pr-4 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:bg-white transition-all outline-none font-bold ${
                          shippingTouched.email && shippingErrors.email
                            ? 'border-red-400 focus:ring-red-200'
                            : shippingTouched.email && !shippingErrors.email
                            ? 'border-green-400 focus:ring-green-200'
                            : 'border-gray-100 focus:ring-[#496506]'
                        }`}
                      />
                    </div>
                    <FieldError message={shippingTouched.email ? shippingErrors.email : ""} />
                  </div>

                  {/* Phone Number */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={shippingData.phone}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('phone')}
                        placeholder="Enter your 10-digit mobile number"
                        maxLength={10}
                        className={`w-full bg-gray-50 border rounded-2xl py-4 pl-12 pr-4 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:bg-white transition-all outline-none font-bold ${
                          shippingTouched.phone && shippingErrors.phone
                            ? 'border-red-400 focus:ring-red-200'
                            : shippingTouched.phone && !shippingErrors.phone
                            ? 'border-green-400 focus:ring-green-200'
                            : 'border-gray-100 focus:ring-[#496506]'
                        }`}
                      />
                    </div>
                    <FieldError message={shippingTouched.phone ? shippingErrors.phone : ""} />
                  </div>

                  {/* Delivery Address */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Delivery Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={shippingData.address}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('address')}
                        placeholder="Enter house no, building & street name"
                        className={`w-full bg-gray-50 border rounded-2xl py-4 pl-12 pr-4 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:bg-white transition-all outline-none font-bold ${
                          shippingTouched.address && shippingErrors.address
                            ? 'border-red-400 focus:ring-red-200'
                            : shippingTouched.address && !shippingErrors.address
                            ? 'border-green-400 focus:ring-green-200'
                            : 'border-gray-100 focus:ring-[#496506]'
                        }`}
                      />
                    </div>
                    <FieldError message={shippingTouched.address ? shippingErrors.address : ""} />
                  </div>

                  {/* City, State, Pin Code */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">City</label>
                     <input
                      type="text"
                      name="city"
                      value={shippingData.city}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('city')}
                      placeholder="Enter your city"
                      className={`w-full bg-gray-50 border rounded-2xl py-4 px-6 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:bg-white transition-all outline-none font-bold ${
                        shippingTouched.city && shippingErrors.city
                          ? 'border-red-400 focus:ring-red-200'
                          : shippingTouched.city && !shippingErrors.city
                          ? 'border-green-400 focus:ring-green-200'
                          : 'border-gray-100 focus:ring-[#496506]'
                      }`}
                    />
                    <FieldError message={shippingTouched.city ? shippingErrors.city : ""} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">State</label>
                       <input
                          type="text"
                          name="state"
                          value={shippingData.state}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('state')}
                          placeholder="Enter your state"
                          className={`w-full bg-gray-50 border rounded-2xl py-4 px-6 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:bg-white transition-all outline-none font-bold ${
                            shippingTouched.state && shippingErrors.state
                              ? 'border-red-400 focus:ring-red-200'
                              : shippingTouched.state && !shippingErrors.state
                              ? 'border-green-400 focus:ring-green-200'
                              : 'border-gray-100 focus:ring-[#496506]'
                          }`}
                        />
                        <FieldError message={shippingTouched.state ? shippingErrors.state : ""} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider ml-1">Pin Code</label>
                       <input
                          type="text"
                          name="pinCode"
                          value={shippingData.pinCode}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('pinCode')}
                          placeholder="Enter your 6-digit pin code"
                          maxLength={6}
                          className={`w-full bg-gray-50 border rounded-2xl py-4 px-6 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:bg-white transition-all outline-none font-bold ${
                            shippingTouched.pinCode && shippingErrors.pinCode
                              ? 'border-red-400 focus:ring-red-200'
                              : shippingTouched.pinCode && !shippingErrors.pinCode
                              ? 'border-green-400 focus:ring-green-200'
                              : 'border-gray-100 focus:ring-[#496506]'
                          }`}
                        />
                        <FieldError message={shippingTouched.pinCode ? shippingErrors.pinCode : ""} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#496506] via-[#3d5405] to-[#496506] rounded-full flex items-center justify-center text-white shadow-md shadow-[#496506]/20">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#343A40]">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  {/* COD */}
                  <label
                    className={`flex items-center justify-between p-6 rounded-[24px] cursor-pointer transition-all border-2 ${paymentMethod === 'cod'
                        ? 'bg-gray-50 border-[#496506] shadow-md'
                        : 'bg-white border-gray-100 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#496506] via-[#3d5405] to-[#496506] rounded-2xl flex items-center justify-center text-white shadow-sm shadow-[#496506]/20">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Cash on Delivery</p>
                        <p className="text-xs text-gray-400 font-medium">Pay when you receive</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      className="w-6 h-6 accent-[#496506]"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                  </label>

                  {/* Online */}
                  <label
                    className={`flex items-center justify-between p-6 rounded-[24px] cursor-pointer transition-all border-2 ${paymentMethod === 'online'
                        ? 'bg-gray-50 border-[#496506] shadow-md'
                        : 'bg-white border-gray-100 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#496506] via-[#3d5405] to-[#496506] rounded-2xl flex items-center justify-center text-white shadow-sm shadow-[#496506]/20">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">Online Payment</p>
                        <p className="text-xs text-gray-400 font-medium">Credit/Debit Card, UPI, Wallets</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      className="w-6 h-6 accent-[#496506]"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                    />
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[32px] p-8 sticky top-32 border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                <h2 className="text-2xl font-bold text-[#343A40] mb-8">Summarised</h2>

                {/* Product List */}
                <div className="space-y-4 mb-8">
                  {items.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white rounded-[24px] p-4 flex items-center gap-4 relative">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden shrink-0 relative">
                        <img src={item.name?.toLowerCase().includes('medjool') ? imgMedjool.src : item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                          {item.qty || item.quantity}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <p className="font-bold text-sm text-gray-800 leading-tight mb-1">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Qty: {item.qty || item.quantity}</p>
                      </div>
                      <p className="font-bold text-sm text-gray-800 whitespace-nowrap">₹{(getSafePrice(item.price) * (item.qty || item.quantity)).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Shipping */}
                <div className="space-y-4 mb-8 border-b border-gray-200 pb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="font-bold text-gray-800">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Shipping</span>
                    <span className="font-bold text-[#496506]">Free</span>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="bg-white rounded-[24px] p-6 mb-8 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-500">Total Amount</span>
                  <span className="text-3xl font-bold text-gray-800">₹{total.toLocaleString()}</span>
                </div>

                {/* Security Note */}
                <div className="flex items-start gap-3 mb-8 bg-white/30 p-4 rounded-2xl">
                  <ShieldCheck className="w-5 h-5 text-gray-400 shrink-0" />
                  <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                    Your payment is secure. We use industry-standard encryption to protect your data.
                  </p>
                </div>

                {/* Desktop CTA */}
                <button 
                  type="submit"
                  disabled={isCreatingOrder}
                  className="w-full py-4 bg-gradient-to-br from-[#496506] via-[#3d5405] to-[#496506] text-white rounded-lg transition-all duration-300 font-bold text-lg mb-6 shadow-lg shadow-[#496506]/20 hover:shadow-2xl hover:shadow-[#496506]/40 hover:-translate-y-1 active:scale-[0.98] disabled:opacity-50 disabled:translate-y-0"
                >
                  {isCreatingOrder ? "Placing Order..." : "Proceed to Payment"}
                </button>
              </div>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
}
