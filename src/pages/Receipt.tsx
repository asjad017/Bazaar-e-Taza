import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  User, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  Printer, 
  Download,
  ShoppingBasket,
  MapPin,
  Phone,
  Mail,
  Leaf,
  Loader2
} from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

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
  status: string;
  address: {
    street: string;
    city: string;
    pincode: string;
  };
  paymentMethod: string;
  createdAt: any;
  customerName?: string;
}

export default function Receipt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      try {
        const orderDoc = await getDoc(doc(db, 'orders', id));
        if (orderDoc.exists()) {
          setOrder({ id: orderDoc.id, ...orderDoc.data() } as Order);
        } else {
          console.error('Order not found');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    const d = typeof date.toDate === 'function' ? date.toDate() : new Date(date);
    return d.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#2E7D32] mx-auto" />
        <p className="mt-4 text-gray-600 font-medium">Generating your receipt...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-6">
        <div className="text-8xl">📄</div>
        <h2 className="text-3xl font-bold text-gray-900">Receipt Not Found</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          We couldn't find the receipt you're looking for. It might have been moved or deleted.
        </p>
        <Button 
          className="bg-[#2E7D32] hover:bg-[#1B5E20]"
          onClick={() => navigate('/orders')}
        >
          Back to Orders
        </Button>
      </div>
    );
  }

  const subtotal = order.totalAmount;
  const tax = 0; // Mock tax calculation if needed
  const finalTotal = subtotal + tax;

  const downloadPDF = async () => {
    if (!receiptRef.current) return;
    
    try {
      setIsDownloading(true);
      const element = receiptRef.current;
      
      // Use html-to-image to generate a high-quality PNG
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 3, // Higher pixel ratio for better clarity
        backgroundColor: '#ffffff',
        style: {
          transform: 'scale(1)', // Ensure no scaling issues
        }
      });
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // If the content is longer than A4, we might need to handle multiple pages, 
      // but for a receipt, we'll scale it to fit the width.
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, 297)); 
      
      pdf.save(`BazaarETaza-Receipt-${order.id.slice(-8).toUpperCase()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="flex items-center justify-between mb-8 no-print">
        <Button 
          variant="ghost" 
          className="text-gray-600 hover:text-[#2E7D32] gap-2"
          onClick={() => navigate('/orders')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button 
            className="bg-[#2E7D32] hover:bg-[#1B5E20] gap-2"
            onClick={downloadPDF}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {isDownloading ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        ref={receiptRef}
      >
        <Card className="border-none shadow-2xl overflow-hidden bg-white">
          {/* Receipt Header */}
          <div className="bg-[#2E7D32] p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Leaf className="h-32 w-32 rotate-12" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Leaf className="h-8 w-8" />
                <span className="text-2xl font-black tracking-tighter">BAZAAR E TAZA</span>
              </div>
              <p className="text-green-100 text-sm font-medium">Freshness Delivered to Your Doorstep</p>
              <div className="mt-6 inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Official Bill Receipt
              </div>
            </div>
          </div>

          <CardContent className="p-8 md:p-12">
            {/* Bill Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <FileText className="h-4 w-4 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Bill Number</p>
                    <p className="font-mono text-sm font-bold text-gray-900">#{order.id.toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Calendar className="h-4 w-4 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date & Time</p>
                    <p className="text-sm font-bold text-gray-900">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <User className="h-4 w-4 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer</p>
                    <p className="text-sm font-bold text-gray-900">{order.customerName || 'Valued Customer'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <CreditCard className="h-4 w-4 text-[#2E7D32]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Payment Method</p>
                    <p className="text-sm font-bold text-gray-900 uppercase">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Itemized List */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingBasket className="h-5 w-5 text-[#2E7D32]" />
                <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">Itemized List</h3>
              </div>
              <div className="border border-gray-100 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <th className="px-6 py-4">Item Description</th>
                      <th className="px-6 py-4 text-center">Qty</th>
                      <th className="px-6 py-4 text-right">Price</th>
                      <th className="px-6 py-4 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {order.items.map((item, idx) => (
                      <tr key={idx} className="text-sm">
                        <td className="px-6 py-4 font-bold text-gray-700">{item.name}</td>
                        <td className="px-6 py-4 text-center text-gray-500 font-medium">{item.quantity}</td>
                        <td className="px-6 py-4 text-right text-gray-500 font-medium">₹{item.price}</td>
                        <td className="px-6 py-4 text-right font-bold text-gray-900">₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals Section */}
            <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
              <div className="flex-1 p-6 bg-gray-50 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-[#2E7D32] font-bold text-sm mb-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Status: PAID
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Shipping Address</p>
                  <div className="flex gap-2 text-xs text-gray-600 leading-relaxed">
                    <MapPin className="h-3 w-3 text-[#2E7D32] shrink-0 mt-0.5" />
                    <p>{order.address.street}, {order.address.city} - {order.address.pincode}</p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-64 space-y-3">
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Tax (GST 0%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-lg font-black text-gray-900">Final Total</span>
                  <span className="text-2xl font-black text-[#2E7D32]">₹{finalTotal}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-dashed border-gray-200">
              <p className="text-gray-900 font-black italic mb-4">"Thank you for shopping with Bazaar E Taza!"</p>
              <div className="flex justify-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  +91 82474 79383
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  hello@bazaaretaza.com
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; }
          .container { max-width: 100% !important; width: 100% !important; padding: 0 !important; margin: 0 !important; }
          .shadow-2xl { shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
