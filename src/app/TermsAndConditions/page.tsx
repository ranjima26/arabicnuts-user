"use client";

import { motion } from "motion/react";

export default function TermsAndConditions() {
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
                        Terms &
                    </motion.span>
                    <motion.span
                        className="inline-block"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        Conditions
                    </motion.span>
                </h1>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-6 pb-20 mt-0">
                <p className="text-gray-500 text-lg md:text-xl leading-relaxed text-left mb-10 md:mb-16 font-normal">
                    Welcome to arabicdryfruits.com, a website owned and operated by Arabic Dry Fruits. By using this website, you accept and agree to comply with these Terms and Conditions. Please read the following terms carefully.
                </p>

                {/* 1. Intellectual Property */}
                <div className="flex flex-col gap-4 text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">1. Intellectual Property:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        The content, design, and intellectual property of this website are owned by Arabic Dry Fruits. Reproduction, distribution, or any other use of the materials on this website is prohibited without the express written consent of Arabic Dry Fruits.
                    </p>
                </div>

                {/* 2. Accuracy of Information */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">2. Accuracy of Information:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        While we strive to provide accurate and up-to-date information on this website, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics.
                    </p>
                </div>

                {/* 3. Product Availability */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">3. Product Availability:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        Product availability on the website is subject to change without notice. We do not guarantee the availability of any product listed on the website.
                    </p>
                </div>

                {/* 4. External Links */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">4. External Links:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        This website may contain links to external websites. These links are provided for your convenience, and we do not endorse the content of third-party websites.
                    </p>
                </div>

                {/* 5. User Responsibilities */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">5. User Responsibilities:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        You are responsible for ensuring that all information you provide on this website is accurate, current, and complete. You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of this site by any third party.
                    </p>
                </div>

                {/* 6. Order Acceptance */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">6. Order Acceptance:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        All orders placed on arabicdryfruits.com are subject to acceptance. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product or pricing information, or suspicion of fraudulent activity.
                    </p>
                </div>

                {/* 7. Pricing and Payment */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">7. Pricing and Payment:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        Prices for products are subject to change without notice. We reserve the right to modify or discontinue products at any time. Payments are processed through secure payment gateways. We do not store credit card details.
                    </p>
                </div>

                {/* 8. Shipping */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">8. Shipping:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        Shipping costs and delivery times are provided during the checkout process. We are not responsible for delays or issues caused by shipping carriers.
                    </p>
                </div>

                {/* 9. Returns and Refunds */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">9. Returns and Refunds:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        Our returns and refunds policy is outlined in detail on the Returns and Refunds page. Please review this information before making a purchase.
                    </p>
                </div>

                {/* 10. User Accounts */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">10. User Accounts:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        You may be required to create a user account to access certain features of the website. You are responsible for maintaining the confidentiality of your account information and for restricting access to your account.
                    </p>
                </div>

                {/* 11. Changes to Terms and Conditions */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">11. Changes to Terms and Conditions:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        Arabic Dry Fruits reserves the right to change these terms and conditions at any time without notice. By using this website, you agree to be bound by the current version of these terms and conditions.
                    </p>
                </div>

                {/* 12. Governing Law */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">12. Governing Law:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        These terms and conditions are governed by and construed in accordance with the laws of Kerala, India, and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of Kerala, India, specifically the High Court of Kerala.
                    </p>
                </div>

                {/* 13. Contact Information */}
                <div className="flex flex-col gap-4 text-left mt-12 border-t border-gray-100 pt-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">13. Contacting Us:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">
                        If you have any questions about these Terms and Conditions, please contact us at:
                    </p>
                    <p className="text-gray-800 text-base leading-relaxed font-bold mt-2">
                        Email: <a href="mailto:info@arabicdryfruits.com" className="text-gray-600 hover:underline">info@arabicdryfruits.com</a>
                    </p>
                </div>

            </div>
        </>
    );
}
