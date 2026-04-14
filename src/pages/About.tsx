import React from 'react';
import { Leaf, Users, ShieldCheck, Heart, Award, Sprout } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2255441/pexels-photo-2255441.jpeg?auto=compress&cs=tinysrgb&w=2000"
          alt="Telangana Farm"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6"
          >
            OUR STORY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-medium max-w-3xl mx-auto text-gray-100"
          >
            Connecting Telangana's finest farmers directly to your kitchen since 2024.
          </motion.p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Sprout className="h-12 w-12 text-[#2E7D32] mx-auto" />
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            We believe that everyone deserves access to <span className="text-[#2E7D32]">truly fresh</span> produce.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Bazaar E Taza was founded in Hyderabad with a singular mission: to eliminate the long, wasteful supply chains that compromise the quality of our food and the livelihoods of our farmers.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Farmer at work"
                className="rounded-[2.5rem] shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#A5D6A7] rounded-[2.5rem] -z-0" />
            </motion.div>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-[#2E7D32] rounded-full text-sm font-bold tracking-wide uppercase">
                <Award className="h-4 w-4" />
                Rooted in Telangana
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                From the fields of Rangareddy to your doorstep.
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Our journey started in the local markets of Hyderabad, where we saw the disconnect between the vibrant fields of rural Telangana and the urban dinner table.
                </p>
                <p>
                  By sourcing directly from farms in districts like Rangareddy, Medak, and Mahbubnagar, we ensure that you get produce harvested just hours before it reaches your door. No cold storage, no artificial ripening—just pure nature.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-10 pt-8 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="text-4xl font-black text-[#2E7D32]">500+</div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Local Farmers</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-black text-[#2E7D32]">10k+</div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Happy Families</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Our Core Values</h2>
            <p className="text-gray-500 mt-4 text-lg">The principles that guide every delivery we make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Authentic Freshness', icon: Leaf, text: 'We bypass traditional warehouses. Your produce goes from the soil to our delivery vehicle in record time.' },
              { title: 'Farmer Empowerment', icon: Users, text: 'By cutting out middlemen, we ensure our farmers receive up to 40% more for their harvest.' },
              { title: 'Radical Transparency', icon: ShieldCheck, text: 'Know exactly where your food comes from. We trace every batch back to the specific farm and farmer.' },
            ].map((value, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-[#2E7D32] mb-8 group-hover:scale-110 transition-transform">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
