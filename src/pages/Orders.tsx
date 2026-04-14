import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Calendar, MapPin, ChevronRight, Loader2, ShoppingBag, Search, CheckCircle2, Clock, XCircle, Truck, Info } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'motion/react';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: {
    street: string;
    city: string;
    pincode: string;
  };
  paymentMethod: string;
  createdAt: any;
}

export default function Orders() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'delivered' | 'pending'>('all');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }

    if (user) {
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef,
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        setOrders(ordersData);
        setIsFetching(false);
      }, (error) => {
        console.error('Error fetching orders:', error);
        setIsFetching(false);
      });

      return () => unsubscribe();
    }
  }, [user, loading, navigate]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'processing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    const d = typeof date.toDate === 'function' ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'delivered' && order.status === 'delivered') ||
      (statusFilter === 'pending' && (order.status === 'pending' || order.status === 'processing' || order.status === 'shipped'));
    return matchesSearch && matchesStatus;
  });

  const isRecent = (date: any) => {
    if (!date) return false;
    const d = typeof date.toDate === 'function' ? date.toDate() : new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    return diff < 24 * 60 * 60 * 1000; // 24 hours
  };

  if (loading || isFetching) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#2E7D32] mx-auto" />
        <p className="mt-4 text-gray-600">Fetching your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-6">
        <div className="text-8xl">📦</div>
        <h2 className="text-3xl font-bold text-gray-900">No orders yet</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          You haven't placed any orders with Bazaar E Taza yet. Start shopping for the freshest produce!
        </p>
        <Button 
          className="bg-[#2E7D32] hover:bg-[#1B5E20] px-8 py-6 text-lg"
          onClick={() => navigate('/shop')}
        >
          Go to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500">Track and manage your recent purchases.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search by Order ID..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-full border border-green-100 flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-[#2E7D32]" />
            <span className="text-sm font-bold text-[#2E7D32]">{orders.length} Total Orders</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {(['all', 'delivered', 'pending'] as const).map((filter) => (
          <Button
            key={filter}
            variant={statusFilter === filter ? 'default' : 'outline'}
            onClick={() => setStatusFilter(filter)}
            className={`capitalize rounded-full px-6 ${
              statusFilter === filter ? 'bg-[#2E7D32] hover:bg-[#1B5E20]' : 'text-gray-600'
            }`}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden relative">
                  {isRecent(order.createdAt) && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-[#2E7D32] text-white text-[10px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-widest">
                        Recent
                      </div>
                    </div>
                  )}
                  <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-6">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm">
                          <Package className="h-6 w-6 text-[#2E7D32]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</p>
                          <p className="font-mono text-sm font-bold text-gray-900">#{order.id.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="hidden sm:block">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Date</p>
                          <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(order.createdAt)}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</p>
                          <Badge className={`mt-1 capitalize border flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Items List */}
                      <div className="md:col-span-2 space-y-4">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Items Preview</h4>
                        <div className="space-y-3">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-xs font-bold text-[#2E7D32] border">
                                  {item.quantity}x
                                </span>
                                <span className="font-bold text-gray-700">{item.name}</span>
                              </div>
                              <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <p className="text-xs text-gray-500 font-medium pl-2">
                              + {order.items.length - 3} more items
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="md:col-span-1 space-y-6">
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Delivery Address</h4>
                          <div className="flex gap-3 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-[#2E7D32] shrink-0" />
                            <p>
                              {order.address.street},<br />
                              {order.address.city} - {order.address.pincode}
                            </p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-500">Payment</span>
                            <span className="font-bold text-gray-900">{order.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between items-center text-lg font-black mb-4">
                            <span className="text-gray-900">Total</span>
                            <span className="text-[#2E7D32]">₹{order.totalAmount}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            className="w-full border-[#2E7D32] text-[#2E7D32] hover:bg-green-50 gap-2"
                            onClick={() => navigate(`/receipt/${order.id}`)}
                          >
                            <Info className="h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900">No matching orders</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
              <Button 
                variant="link" 
                className="text-[#2E7D32] mt-2"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
