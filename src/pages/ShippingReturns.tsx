import React from 'react';
import { motion } from 'motion/react';
import { Truck, RefreshCcw, ShieldCheck, Clock } from 'lucide-react';

export default function ShippingReturns() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Shipping & Returns</h1>
          <p className="text-gray-500">Everything you need to know about our delivery and quality guarantee.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#2E7D32]">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Delivery Areas</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We currently deliver across all major residential areas in Hyderabad and Secunderabad. We are expanding to other cities in Telangana soon!
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#2E7D32]">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Delivery Timing</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Orders placed before 10:00 PM are delivered the next morning between 6:00 AM and 11:00 AM to ensure maximum freshness.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#2E7D32]">
              <RefreshCcw className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Return Policy</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              If you are not satisfied with the quality of any item, you can return it to the delivery partner at the time of delivery for an immediate refund or replacement.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#2E7D32]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Quality Guarantee</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our produce is sourced directly from farms and undergoes a strict 3-step quality check before being packed for delivery.
            </p>
          </div>
        </div>

        <section className="space-y-4 pt-8">
          <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900">Is there a delivery fee?</h4>
              <p className="text-gray-600">We offer free delivery on all orders above ₹500. For orders below ₹500, a nominal delivery fee of ₹40 applies.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">How do I cancel my order?</h4>
              <p className="text-gray-600">You can cancel your order at any time before it is packed for delivery (usually by 11:00 PM on the day of ordering) through the "My Orders" section.</p>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
