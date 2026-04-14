export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  unit: string;
  stock: number;
  isOrganic: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  role: 'customer' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'COD' | 'UPI';
  createdAt: any;
}
