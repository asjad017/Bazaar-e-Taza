import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { getProductImage } from '../lib/imageMapping';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const displayImage = (!hasError && product.imageUrl) ? product.imageUrl : getProductImage(product.name, product.category);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden group bg-gray-100">
          {!isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          )}
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setHasError(true);
              setIsLoaded(true);
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
            style={{ display: 'block' }}
          />
          {product.isOrganic && (
            <Badge className="absolute top-2 left-2 bg-[#2E7D32] hover:bg-[#2E7D32]">
              Organic
            </Badge>
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button size="icon" variant="secondary" className="rounded-full" render={<Link to={`/product/${product.id}`} />} nativeButton={false}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
          <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold text-[#2E7D32]">₹{product.price}</span>
            <span className="text-xs text-gray-500">/ {product.unit}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] gap-2"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
