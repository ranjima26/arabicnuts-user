"use client";

import { motion } from "motion/react";

export default function ReturnPolicy() {
    return (
        <>
            <div className="flex justify-center pt-32 md:pt-48 pb-10 md:pb-20">
                <h1 className="text-black text-4xl sm:text-5xl md:text-7xl font-bold text-center flex flex-col items-center justify-center gap-2 md:gap-4">
                    <motion.span
                        className="inline-block"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        Return, Cancellation
                    </motion.span>
                    <motion.span
                        className="inline-block"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        & Refund Policy
                    </motion.span>
                </h1>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-6 pb-20 mt-0">
                <p className="text-gray-500 text-lg md:text-xl leading-relaxed text-left mb-10 md:mb-16 font-normal">
                    Welcome to arabicdryfruits.com, owned and operated by Arabic Dry Fruits. This Return, Cancellation, and Refund Policy outlines the procedures for returning products, cancelling orders, and requesting refunds.
                </p>

                {/* 1. Return Policy */}
                <div className="flex flex-col gap-4 text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">1. Return Policy:</h2>
                    <div className="flex flex-col gap-4 mt-2">
                        <p className="text-gray-800 text-base leading-relaxed">
                            Once items are delivered, they cannot be returned as opened or used products cannot be reused or resold.
                        </p>
                        <p className="text-gray-800 text-base leading-relaxed">
                            Damages caused by neglect, improper use, or incorrect application will not be covered under this policy.
                        </p>
                        <p className="text-gray-800 text-base leading-relaxed">
                            We do not assume responsibility for adverse reactions or sensitivities caused by specific product ingredients. Patch tests are recommended as advised on each product packaging.
                        </p>
                    </div>
                </div>

                {/* 2. Refund Policy */}
                <div className="flex flex-col gap-4 text-left mt-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">2. Refund Policy:</h2>
                    <div className="flex flex-col gap-4 mt-2">
                        <p className="text-gray-800 text-base leading-relaxed font-semibold">
                            Arabic Dry Fruits is not responsible for any damage that occurs after the product has been delivered.
                        </p>
                        <ul className="list-disc ml-5 space-y-3 text-gray-800 text-base leading-relaxed">
                            <li>Claims for missing items, leakage, breakage, damage, or incorrect product require an **unboxing video** showing the original packaging.</li>
                            <li>To claim a refund, contact customer care at **+91 989 5544 321** or email **info@arabicdryfruits.com** with the subject “Refund for [Order ID]” and relevant images/videos.</li>
                            <li>If a package is tampered with, damaged, or defective, refuse to accept it and contact us immediately.</li>
                            <li>If your order is marked as delivered but not received, report this within **3 days** of delivery status. No refunds after this period.</li>
                            <li>Delivery charges are non-refundable.</li>
                            <li>Claims for refunds must be made within **24 hours** of delivery.</li>
                            <li>Once accepted, refunds may take up to **10 days** to be credited. Transaction ID and details will be provided.</li>
                        </ul>
                    </div>
                </div>

                {/* 3. Return Policy (Damaged in Transit) */}
                <div className="flex flex-col gap-4 text-left mt-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">3. Return Policy (Damaged in Transit):</h2>
                    <div className="flex flex-col gap-4 mt-2">
                        <p className="text-gray-800 text-base leading-relaxed">
                            Refund or exchange can be initiated for products damaged during transit (leakage, broken, or missing items) after claim verification.
                        </p>
                        <p className="text-gray-800 text-base leading-relaxed">
                            Contact customer care within **24-48 hours** of receiving the damaged product for claims.
                        </p>
                    </div>
                </div>

                {/* 4. Cancellation Policy */}
                <div className="flex flex-col gap-4 text-left mt-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">4. Cancellation Policy:</h2>
                    <div className="flex flex-col gap-4 mt-2">
                        <p className="text-gray-800 text-base leading-relaxed">
                            Orders can be cancelled before dispatch. A processing fee of **2.5%** will be deducted from the refund amount for cancellations.
                        </p>
                        <p className="text-gray-800 text-base leading-relaxed">
                            Refunds for paid orders will be credited to the original payment account within **10 days** of cancellation acceptance.
                        </p>
                        <p className="text-gray-800 text-base leading-relaxed">
                            Orders already shipped cannot be cancelled. If a prepaid order is returned after shipment, **₹90** will be deducted from the refund.
                        </p>
                    </div>
                </div>

                {/* 5. Contact Us */}
                <div className="flex flex-col gap-4 text-left mt-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">5. Contact Us:</h2>
                    <div className="flex flex-col gap-2 mt-2">
                        <p className="text-gray-800 text-base leading-relaxed">
                            For any queries, you can reach us at:
                        </p>
                        <p className="text-gray-800 text-base leading-relaxed font-bold mt-2">
                            Customer Care: <span className="text-gray-600">+91 989 5544 321</span>
                        </p>
                        <p className="text-gray-800 text-base leading-relaxed font-bold">
                            Email: <a href="mailto:info@arabicdryfruits.com" className="text-gray-600 hover:underline">info@arabicdryfruits.com</a>
                        </p>
                    </div>
                </div>

                
            </div>
        </>
    );
}
