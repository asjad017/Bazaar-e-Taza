import React from 'react';
import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-gray-500">Last updated: April 10, 2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">1. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed">
            We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support. This may include your name, email address, phone number, and delivery address.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">2. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed">
            We use the information we collect to process your orders, communicate with you about your delivery, and improve our services. We may also send you promotional emails about new products or special offers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">3. Data Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized access. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">4. Sharing of Information</h2>
          <p className="text-gray-600 leading-relaxed">
            We do not sell or rent your personal information to third parties. We may share your information with service providers who help us with our business operations, such as delivery partners.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">5. Your Choices</h2>
          <p className="text-gray-600 leading-relaxed">
            You can update your account information at any time by logging into your account. You can also opt-out of receiving promotional emails by following the instructions in those emails.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
