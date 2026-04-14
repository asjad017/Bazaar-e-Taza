import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { INITIAL_PRODUCTS } from '../constants';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [priceRange, setPriceRange] = useState(1000);

  const categories = ['All', 'Fruits', 'Vegetables', 'Leafy Greens', 'Exotic Fruits', 'Organic Products', 'Dairy', 'Bakery', 'Herbs & Spices', 'Others'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const productsCol = collection(db, 'products');
      const q = query(productsCol, orderBy('name'));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(data);
      } else {
        // Fallback to local data if Firestore is empty
        const localProducts = INITIAL_PRODUCTS.map((p, i) => ({ ...p, id: `p${i}` })) as Product[];
        setProducts(localProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      try {
        handleFirestoreError(error, OperationType.LIST, 'products');
      } catch (e) {
        // Fallback to local data on error
        const localProducts = INITIAL_PRODUCTS.map((p, i) => ({ ...p, id: `p${i}` })) as Product[];
        setProducts(localProducts);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#2E7D32]" />
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === cat
                      ? 'bg-green-100 text-[#2E7D32] font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-[#2E7D32]" />
              Price Range
            </h3>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#2E7D32]"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>₹0</span>
              <span>Up to ₹{priceRange}</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search fresh produce..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredProducts.length} products
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-[#2E7D32]" />
              <p className="text-gray-500 font-medium">Loading fresh produce...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product as any} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🥬</div>
              <h3 className="text-xl font-bold text-gray-900">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
              <Button
                variant="link"
                className="text-[#2E7D32] mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setPriceRange(1000);
                  setSearchParams({});
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
