import React from 'react';
import { motion } from 'motion/react';

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
        <p className="text-gray-500">Last updated: April 10, 2026</p>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing or using the Bazaar E Taza website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">2. Use of the Service</h2>
          <p className="text-gray-600 leading-relaxed">
            You must be at least 18 years old to use our service. You are responsible for maintaining the confidentiality of your account and password.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">3. Orders and Payments</h2>
          <p className="text-gray-600 leading-relaxed">
            All orders are subject to availability. We reserve the right to refuse or cancel any order for any reason. Prices are subject to change without notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">4. Delivery</h2>
          <p className="text-gray-600 leading-relaxed">
            We aim to deliver your order within the estimated timeframe. However, delivery times are not guaranteed and may be affected by factors beyond our control.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">5. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">
            Bazaar E Taza shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our service.
          </p>
        </section>
      </motion.div>
    </div>
  );
}
