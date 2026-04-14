import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Truck, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        
        const productsCol = collection(db, 'products');
        const q = query(productsCol, limit(4));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Product[];
          setFeaturedProducts(data);
        } else {
          // Fallback to local data if Firestore is empty
          const localFeatured = INITIAL_PRODUCTS.slice(0, 4).map((p, i) => ({ ...p, id: `p${i}` })) as Product[];
          setFeaturedProducts(localFeatured);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
        try {
          handleFirestoreError(error, OperationType.LIST, 'products');
        } catch (e) {
          // Fallback to local data on error
          const localFeatured = INITIAL_PRODUCTS.slice(0, 4).map((p, i) => ({ ...p, id: `p${i}` })) as Product[];
          setFeaturedProducts(localFeatured);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const categories = [
    { 
      name: 'Fruits', 
      image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400', 
      color: 'bg-red-50' 
    },
    { 
      name: 'Vegetables', 
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400', 
      color: 'bg-green-50' 
    },
    { 
      name: 'Leafy Greens', 
      image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400', 
      color: 'bg-emerald-50' 
    },
    { 
      name: 'Dairy', 
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400', 
      color: 'bg-blue-50' 
    },
    { 
      name: 'Bakery', 
      image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400', 
      color: 'bg-orange-50' 
    },
    { 
      name: 'Herbs & Spices', 
      image: 'https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=400', 
      color: 'bg-yellow-50' 
    },
    { 
      name: 'Organic Products', 
      image: 'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=400', 
      color: 'bg-lime-50' 
    },
    { 
      name: 'Others', 
      image: 'https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg?auto=compress&cs=tinysrgb&w=400', 
      color: 'bg-gray-50' 
    },
  ];

  const features = [
    {
      title: 'Freshness Guaranteed',
      description: 'Harvested daily and delivered within 24 hours to maintain peak nutritional value.',
      icon: Leaf,
    },
    {
      title: 'Fast Delivery',
      description: 'Express delivery across Hyderabad and major Telangana cities.',
      icon: Truck,
    },
    {
      title: 'Support Local Farmers',
      description: 'We source directly from small-scale farmers in Telangana, ensuring fair prices.',
      icon: Users,
    },
    {
      title: 'Quality Checked',
      description: 'Every item undergoes a rigorous 3-step quality check before packaging.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Fresh Vegetables"
            className="h-full w-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Farm Fresh Fruits & Vegetables Delivered to Your Doorstep
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Experience the taste of nature with Bazaar E Taza. Sourced directly from local Telangana farms to ensure maximum freshness.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-[#2E7D32] hover:bg-[#1B5E20] text-lg px-8 py-6" render={<Link to="/shop" />} nativeButton={false}>
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6" render={<Link to="/about" />} nativeButton={false}>
                Our Story
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600">Explore our wide range of fresh and organic produce</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/shop?category=${cat.name}`}
                className={`${cat.color} flex flex-col items-center justify-center p-6 rounded-2xl border border-transparent hover:border-[#2E7D32] transition-all group overflow-hidden`}
              >
                <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-bold text-gray-900">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Freshness</h2>
              <p className="text-gray-600">Handpicked seasonal favorites just for you</p>
            </div>
            <Link to="/shop" className="text-[#2E7D32] font-bold flex items-center gap-2 hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-[#2E7D32]" />
              <p className="text-gray-500">Loading fresh arrivals...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-[#2E7D32]">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#2E7D32] py-20 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-green-100">Trusted by thousands of families across Telangana</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Ananya Rao', city: 'Hyderabad', text: 'The quality of vegetables is unmatched. It feels like I just picked them from my own garden!' },
              { name: 'Suresh Kumar', city: 'Warangal', text: 'Fast delivery and excellent packaging. The organic mangoes are the best I have ever had.' },
              { name: 'Priya Reddy', city: 'Nizamabad', text: 'Supporting local farmers while getting fresh produce is a win-win. Highly recommend Bazaar E Taza.' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
              >
                <p className="italic mb-6">"{t.text}"</p>
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-green-200">{t.city}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">What Our Customers Say</h2>
          <p className="text-gray-500 mt-4 text-lg">Trusted by thousands of families across Hyderabad.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Priya Sharma", role: "Home Maker, Jubilee Hills", text: "The quality of spinach and mangoes is unmatched. It feels like I'm back in my village. Truly fresh!" },
            { name: "Rahul Verma", role: "Software Engineer, Gachibowli", text: "Finally a service that delivers what it promises. The morning delivery is so convenient for my busy schedule." },
            { name: "Anitha Reddy", role: "Nutritionist, Banjara Hills", text: "I recommend Bazaar E Taza to all my clients. Their organic range is authentic and very reasonably priced." }
          ].map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
              </div>
              <p className="text-gray-600 italic mb-6">"{t.text}"</p>
              <div>
                <div className="font-bold text-gray-900">{t.name}</div>
                <div className="text-sm text-gray-500">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-[#2E7D32] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">JOIN THE FRESHNESS REVOLUTION</h2>
            <p className="text-xl text-green-100">Get weekly updates on seasonal harvests and exclusive farm-to-home offers.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => { e.preventDefault(); toast.success('Subscribed successfully!'); }}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 h-14 rounded-xl px-6 bg-white/10 border border-white/20 text-white placeholder:text-green-200 focus:bg-white/20 focus:outline-none transition-all"
                required
              />
              <Button className="h-14 px-8 bg-white text-[#2E7D32] hover:bg-green-50 font-bold rounded-xl shadow-xl">
                SUBSCRIBE
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
