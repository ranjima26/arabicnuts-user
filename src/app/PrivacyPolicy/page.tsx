"use client";

import { motion } from "motion/react";

export default function PrivacyPolicy() {
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
                        Privacy
                    </motion.span>
                    <motion.span
                        className="inline-block"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        Policy
                    </motion.span>
                </h1>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-6 pb-20 mt-0">
                <p className="text-gray-500 text-lg md:text-xl leading-relaxed text-left mb-10 md:mb-16 font-normal">
                    Welcome to arabicdryfruits.com, owned and operated by Arabic Dry Fruits. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website arabicdryfruits.com.
                </p>

                {/* 1 */}
                <div className="flex flex-col gap-4 text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">1. Information We Collect:</h2>
                    <div className="flex flex-col gap-6 mt-2">
                        <p className="text-gray-800 text-base leading-relaxed">
                            <strong className="font-bold text-[#111] text-base md:text-lg">Personal Identification Information:</strong> We may collect personal identification information when users visit our site, register, place an order, subscribe to the newsletter, or engage in other activities.
                        </p>
                        <p className="text-gray-800 text-base leading-relaxed">
                            <strong className="font-bold text-[#111] text-base md:text-lg">Non-personal Identification Information:</strong> We may collect non-personal identification information such as browser type, operating system, and other technical details.
                        </p>
                    </div>
                </div>

                {/* 2 */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">2. How We Use Collected Information:</h2>
                    <div className="flex flex-col gap-6 mt-2">
                        <p className="text-gray-800 text-base leading-relaxed">
                            <strong className="font-bold text-[#111] text-base md:text-lg">Order Processing:</strong> Personal information may be used to process orders and provide a personalized user experience.
                        </p>
                        <p className="text-gray-800 text-base leading-relaxed">
                            <strong className="font-bold text-[#111] text-base md:text-lg">Communication:</strong> We may use the email address provided for order processing to send periodic emails related to orders and updates. The email address may also be used for responding to inquiries and other requests.
                        </p>
                    </div>
                </div>

                {/* 3 */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">3. How We Protect Your Information:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">We implement appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our site.</p>
                </div>

                {/* 4 */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">4. Sharing Your Personal Information:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">We do not sell, trade, or rent users' personal identification information to others. Generic aggregated demographic information may be shared with trusted affiliates for statistical purposes.</p>
                </div>

                {/* 5 */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">5. Third-party Websites:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">arabicdryfruits.com may contain links to external websites for your convenience. We do not endorse the content or practices of third-party sites. Users are advised to read the privacy policies of these external sites.</p>
                </div>

                {/* 6 */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">6. Cookies:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">Our site may use "cookies" to enhance user experience. Users may choose to set their web browser to refuse cookies or to alert them when cookies are being sent. Note that some parts of the site may not function properly if cookies are disabled.</p>
                </div>

                {/* 7 */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">7. Changes to this Privacy Policy:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">Arabic Dry fruits has the discretion to update this privacy policy at any time. Users are encouraged to check this page for any changes. The last updated date will be revised accordingly.</p>
                </div>

                {/* 8 */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">8. Your Acceptance of These Terms:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">By using arabicdryfruits.com, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our site.</p>
                </div>

                {/* 9 */}
                <div className="flex flex-col gap-4 text-left mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111]">9. Contacting Us:</h2>
                    <p className="text-gray-800 text-base leading-relaxed">If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:</p>
                </div>

                <div className="mt-10">
                    <p className="text-gray-800 text-base leading-relaxed font-bold">
                        Email: <a href="mailto:info@arabicdryfruits.com" className="font-semibold text-gray-600 hover:underline">info@arabicdryfruits.com</a>
                    </p>
                </div>
            </div>
        </>
    );
}
