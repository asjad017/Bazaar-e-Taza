import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../AuthContext';
import { toast } from 'sonner';
import { getProductImage } from '../lib/imageMapping';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to place your order');
      openAuthModal('login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-6">
        <div className="text-8xl">🛒</div>
        <h2 className="text-3xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Looks like you haven't added any fresh produce to your cart yet. Start shopping to fill it up!
        </p>
        <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] px-8 py-6 text-lg" render={<Link to="/shop" />} nativeButton={false}>
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <ShoppingBag className="h-8 w-8 text-[#2E7D32]" />
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="overflow-hidden border-none shadow-sm">
                  <CardContent className="p-4 flex gap-6">
                    <div className="h-24 w-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={item.imageUrl || getProductImage(item.name, item.category)}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getProductImage(item.name, item.category);
                        }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.unit}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border rounded-lg bg-gray-50">
                          <button
                            className="px-3 py-1 hover:bg-gray-200"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 font-bold text-sm">{item.quantity}</span>
                          <button
                            className="px-3 py-1 hover:bg-gray-200"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="font-bold text-[#2E7D32]">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-none shadow-md bg-gray-50">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
              <Button
                className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] py-6 text-lg gap-2"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </Button>
              <p className="text-xs text-center text-gray-500">
                Taxes included. Free delivery on all orders above ₹200.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
