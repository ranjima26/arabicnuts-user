"use client";

import { motion } from "motion/react";

export default function ShippingInformation() {
    return (
        <>
            <div className="flex justify-center pt-32 md:pt-48 pb-10 md:pb-20">
                <h1 className="text-black text-4xl sm:text-5xl md:text-7xl font-bold text-center flex items-center justify-center gap-3 md:gap-5">
                    <motion.span
                        className="inline-block"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        Shipping
                    </motion.span>
                    <motion.span
                        className="inline-block"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        Information
                    </motion.span>
                </h1>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-6 pb-20 mt-0">
                <p className="text-gray-500 text-lg md:text-xl leading-relaxed text-left mb-10 md:mb-16 font-normal">
                    Welcome to arabicdryfruits.com, owned and operated by Arabic Dry Fruits. This Shipping Policy outlines the details regarding shipping, delivery, and courier services for products purchased on our website.
                </p>

                {/* 1. Free Shipping */}
                <div className="flex flex-col gap-4 text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">1. Free Shipping:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        arabicdryfruits.com is pleased to offer free shipping on all orders delivered within India.
                    </p>
                </div>

                {/* 2. Delivery Time */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">2. Delivery Time:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        The estimated delivery time for orders is **3-5 days** from the date of purchase. Please note that delivery times may vary based on factors such as product availability, destination location, and any unforeseen circumstances.
                    </p>
                </div>

                {/* 3. Delivery Locations */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">3. Delivery Locations:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        We provide shipping services to locations across India. We regret to inform you that we currently do not offer international shipping.
                    </p>
                </div>

                {/* 4. Courier Service */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">4. Courier Service:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                      arabicdryfruits.com utilizes the services of **Delhivery**, a leading logistics and supply chain company based in Gurgaon, for the dispatch and delivery of orders. Delhivery is well known for its efficiency, reliability, and nationwide delivery coverage, ensuring your orders reach you safely and on time.
                    </p>
                </div>

                {/* 5. Order Tracking */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">5. Order Tracking:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        Once your order has been dispatched, you will receive a tracking number and a link to track the progress of your shipment. This information will be sent to the email address provided during the checkout process.
                    </p>
                </div>

                {/* 6. Shipment Confirmation */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">6. Shipment Confirmation:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        Upon shipment of your order, you will receive a confirmation email containing details about your purchase, including the items ordered, the total cost, and the shipping information.
                    </p>
                </div>

                {/* 7. Shipping Charges */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">7. Shipping Charges:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        We offer free shipping on all orders delivered within India. There are no additional shipping charges for standard delivery.
                    </p>
                </div>

                {/* 8. Shipping (dispatch) timeline */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">8. Shipping (dispatch) timeline:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        Orders are typically dispatched within **1-2 business days** from the date of purchase. Please note that orders placed on weekends or holidays will be processed on the next business day.
                    </p>
                </div>

                {/* 9. Delayed or Unsuccessful Delivery */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">9. Delayed or Unsuccessful Delivery:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        While we strive to ensure timely and successful deliveries, delays may occur due to unforeseen circumstances or issues with the courier service. In the event of a delayed or unsuccessful delivery, we will make every effort to communicate with you and provide updates on the status of your shipment.
                    </p>
                </div>

                {/* 10. Contact Information */}
                <div className="flex flex-col gap-4 text-left mt-12 border-t border-gray-100 pt-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">10. Contact Information:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        For any inquiries or concerns related to shipping, please contact us at:
                    </p>
                    <p className="text-gray-800 text-base leading-relaxed font-bold mt-2">
                        Email: <a href="mailto:info@arabicdryfruits.com" className="text-gray-600 hover:underline">info@arabicdryfruits.com</a>
                    </p>
                </div>

                
            </div>
        </>
    );
}
