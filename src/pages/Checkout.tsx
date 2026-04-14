import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, CreditCard, Truck, MapPin, Loader2 } from 'lucide-react';
import { useCart } from '../CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TELANGANA_CITIES } from '../constants';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, loading, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [newOrderId, setNewOrderId] = useState<string | null>(null);

  // Protect route
  React.useEffect(() => {
    if (!loading && !user) {
      toast.error('Please login to access checkout');
      openAuthModal('login');
      navigate('/cart');
    }
  }, [user, loading, navigate, openAuthModal]);

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    phone: '',
    email: user?.email || '',
    street: '',
    city: 'Hyderabad',
    pincode: '',
    paymentMethod: 'COD',
  });

  if (loading || (!user && !orderPlaced)) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E7D32] mx-auto"></div>
        <p className="mt-4 text-gray-600">Verifying session...</p>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsProcessing(true);
    
    try {
      const orderData = {
        userId: user.uid,
        customerName: formData.name,
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: totalPrice,
        status: 'pending',
        address: {
          street: formData.street,
          city: formData.city,
          state: 'Telangana',
          pincode: formData.pincode
        },
        paymentMethod: formData.paymentMethod,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      setNewOrderId(docRef.id);
      
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Order Error:', error);
      toast.error('Failed to place order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-[#2E7D32]"
        >
          <CheckCircle2 className="h-12 w-12" />
        </motion.div>
        <h2 className="text-4xl font-bold text-gray-900">Thank You!</h2>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Your order has been placed successfully. We'll deliver your fresh produce soon!
        </p>
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            className="border-[#2E7D32] text-[#2E7D32] hover:bg-green-50 px-8 py-6 text-lg"
            onClick={() => navigate(`/receipt/${newOrderId}`)}
          >
            View Receipt
          </Button>
          <Button
            className="bg-[#2E7D32] hover:bg-[#1B5E20] px-8 py-6 text-lg"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Truck className="h-5 w-5 text-[#2E7D32]" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Input
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="md:col-span-2"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </section>

            {/* Shipping Address */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#2E7D32]" />
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="street"
                  placeholder="Street Address / Area"
                  required
                  className="md:col-span-2"
                  value={formData.street}
                  onChange={handleInputChange}
                />
                <select
                  name="city"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.city}
                  onChange={handleInputChange}
                >
                  {TELANGANA_CITIES.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <Input
                  name="pincode"
                  placeholder="Pincode"
                  required
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
              </div>
            </section>

            {/* Payment Method */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#2E7D32]" />
                Payment Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'COD' ? 'border-[#2E7D32] bg-green-50' : 'hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === 'COD'}
                    onChange={handleInputChange}
                    className="accent-[#2E7D32]"
                  />
                  <div>
                    <div className="font-bold">Cash on Delivery</div>
                    <div className="text-xs text-gray-500">Pay when you receive</div>
                  </div>
                </label>
                <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'UPI' ? 'border-[#2E7D32] bg-green-50' : 'hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={formData.paymentMethod === 'UPI'}
                    onChange={handleInputChange}
                    className="accent-[#2E7D32]"
                  />
                  <div>
                    <div className="font-bold">UPI Payment</div>
                    <div className="text-xs text-gray-500">Google Pay, PhonePe, etc.</div>
                  </div>
                </label>
              </div>
            </section>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] py-8 text-xl font-bold"
            >
              {isProcessing ? 'Processing...' : `Place Order (₹${totalPrice})`}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-none shadow-md">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-bold text-lg">Order Summary</h3>
              <div className="space-y-4 max-h-60 overflow-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-[#2E7D32]">₹{totalPrice}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
