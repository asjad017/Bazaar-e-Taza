import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! Our team will get back to you within 24 hours.');
    (e.target as HTMLFormElement).reset();
  };

  const faqs = [
    { q: "What are your delivery hours?", a: "We deliver fresh produce every day from 6:00 AM to 11:00 AM to ensure you get the morning's harvest." },
    { q: "Do you deliver across all of Hyderabad?", a: "Yes, we currently cover all major residential areas in Hyderabad and Secunderabad." },
    { q: "Is there a minimum order value?", a: "To maintain our farm-to-home service, we have a minimum order value of ₹300." },
    { q: "How do I track my order?", a: "Once your order is out for delivery, you will receive a WhatsApp notification with a real-time tracking link." }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-[#2E7D32] py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Leaf className="h-64 w-64 rotate-12" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-10">
          <Globe className="h-48 w-48 -rotate-12" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase"
          >
            GET IN TOUCH
          </motion.h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto font-medium">
            Have questions about our produce or delivery? We're here to help you bring freshness home.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-4">
              {[
                { icon: Phone, title: "Call Us", detail: "+91 82474 79383", sub: "Mon-Sat, 9am - 6pm" },
                { icon: Mail, title: "Email Us", detail: "hello@bazaaretaza.com", sub: "Online support 24/7" },
                { icon: MapPin, title: "Visit Us", detail: "Jubilee Hills, Hyderabad", sub: "Telangana 500033" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-green-50 flex items-center gap-6 hover:border-[#2E7D32] transition-colors group"
                >
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-[#2E7D32] shrink-0 group-hover:bg-[#2E7D32] group-hover:text-white transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-[#2E7D32] font-bold">{item.detail}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-black">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl border border-green-50"
            >
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                  <Input placeholder="Enter your name" className="h-14 rounded-xl bg-green-50/50 border-transparent focus:bg-white focus:border-[#2E7D32] transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                  <Input type="email" placeholder="name@company.com" className="h-14 rounded-xl bg-green-50/50 border-transparent focus:bg-white focus:border-[#2E7D32] transition-all" required />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Subject</label>
                  <Input placeholder="How can we help you?" className="h-14 rounded-xl bg-green-50/50 border-transparent focus:bg-white focus:border-[#2E7D32] transition-all" required />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Message</label>
                  <textarea
                    className="flex min-h-[180px] w-full rounded-xl border-transparent bg-green-50/50 px-4 py-3 text-sm focus:bg-white focus:border-[#2E7D32] focus:ring-0 transition-all outline-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] h-16 rounded-xl text-lg font-black uppercase tracking-tighter gap-3 shadow-xl shadow-[#2E7D32]/20 transition-all hover:scale-[1.01] active:scale-95">
                    <Send className="h-5 w-5" />
                    Send Message
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-32 bg-green-50/30 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="bg-[#2E7D32] text-white hover:bg-[#2E7D32] border-none px-6 py-1.5 mb-6 rounded-full font-bold tracking-widest text-[10px] uppercase">Common Questions</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">Frequently Asked Questions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-[2rem] border border-green-100 shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-[#2E7D32]" />
                    </div>
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-medium">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
