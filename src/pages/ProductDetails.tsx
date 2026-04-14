import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, ShieldCheck, Leaf, Truck, Loader2 } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../constants';
import { useCart } from '../CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Product } from '../types';
import { getProductImage } from '../lib/imageMapping';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          // Try to find in local data if not in Firestore (for backward compatibility)
          const localProduct = INITIAL_PRODUCTS.map((p, i) => ({ ...p, id: `p${i}` })).find((p) => p.id === id);
          if (localProduct) {
            setProduct(localProduct as Product);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        handleFirestoreError(error, OperationType.GET, `products/${id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#2E7D32]" />
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
      </div>
    );
  }

  const displayImage = (!hasError && product.imageUrl) ? product.imageUrl : getProductImage(product.name, product.category);

  return (
    <div className="container mx-auto px-4 py-12">
      <Button
        variant="ghost"
        className="mb-8 gap-2 text-gray-600 hover:text-[#2E7D32]"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100"
        >
          <img
            src={displayImage}
            alt={product.name}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
          />
          {product.isOrganic && (
            <Badge className="absolute top-4 left-4 bg-[#2E7D32] text-lg px-4 py-1">
              Organic
            </Badge>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <div className="text-[#2E7D32] font-bold mb-2">{product.category}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#2E7D32]">₹{product.price}</span>
              <span className="text-gray-500">/ {product.unit}</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 font-bold w-12 text-center">{quantity}</span>
                <button
                  className="px-4 py-2 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <Button
                className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20] py-6 text-lg gap-2"
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart(product as any);
                  }
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
            </div>
            <Button variant="outline" className="w-full py-6 text-lg border-[#2E7D32] text-[#2E7D32] hover:bg-green-50">
              Buy Now
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8 border-t">
            <div className="text-center space-y-2">
              <div className="mx-auto w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#2E7D32]">
                <Leaf className="h-5 w-5" />
              </div>
              <div className="text-xs font-bold">100% Fresh</div>
            </div>
            <div className="text-center space-y-2">
              <div className="mx-auto w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#2E7D32]">
                <Truck className="h-5 w-5" />
              </div>
              <div className="text-xs font-bold">Fast Delivery</div>
            </div>
            <div className="text-center space-y-2">
              <div className="mx-auto w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#2E7D32]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-xs font-bold">Quality Check</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
