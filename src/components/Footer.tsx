import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link to="/">
              <Logo />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fresh from Farms to Your Home. We deliver the finest organic produce across Telangana, supporting local farmers and sustainable agriculture.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#2E7D32] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2E7D32] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2E7D32] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-[#2E7D32]">Home</Link></li>
              <li><Link to="/shop" className="hover:text-[#2E7D32]">Shop All</Link></li>
              <li><Link to="/about" className="hover:text-[#2E7D32]">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-[#2E7D32]">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Categories</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link to="/shop?category=Fruits" className="hover:text-[#2E7D32]">Fresh Fruits</Link></li>
              <li><Link to="/shop?category=Vegetables" className="hover:text-[#2E7D32]">Vegetables</Link></li>
              <li><Link to="/shop?category=Leafy Greens" className="hover:text-[#2E7D32]">Leafy Greens</Link></li>
              <li><Link to="/shop?category=Organic" className="hover:text-[#2E7D32]">Organic Produce</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#2E7D32] shrink-0" />
                <span>Jubilee Hills, Hyderabad,<br />Telangana 500033</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#2E7D32] shrink-0" />
                <span>+91 82474 79383</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#2E7D32] shrink-0" />
                <span>hello@bazaaretaza.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 Bazaar E Taza. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-[#2E7D32]">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#2E7D32]">Terms of Service</Link>
            <Link to="/shipping" className="hover:text-[#2E7D32]">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
