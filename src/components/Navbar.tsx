import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, User, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import Logo from './Logo';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';
import { useAuth } from '../AuthContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const location = useLocation();
  const { user, openAuthModal } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-[#2E7D32] ${
                location.pathname === link.path ? 'text-[#2E7D32]' : 'text-gray-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 mr-2">
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-100 hover:bg-green-100 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-[10px] font-bold">
                    {user.displayName?.[0] || user.email?.[0].toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-[#2E7D32] max-w-[100px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-gray-400 hover:text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="font-bold text-gray-600 hover:text-[#2E7D32]"
                  onClick={() => {
                    console.log('Login button clicked');
                    openAuthModal('login');
                  }}
                >
                  LOGIN
                </Button>
                <Button 
                  className="bg-[#2E7D32] hover:bg-[#1B5E20] font-bold shadow-lg shadow-[#2E7D32]/20"
                  onClick={() => {
                    console.log('Signup button clicked');
                    openAuthModal('signup');
                  }}
                >
                  SIGN UP
                </Button>
              </>
            )}
          </div>

          <Button variant="ghost" size="icon" className="relative" render={<Link to="/cart" />} nativeButton={false}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-[#2E7D32] p-0 text-[10px]">
                {totalItems}
              </Badge>
            )}
          </Button>
          
          {!user && (
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => {
              console.log('Mobile login button clicked');
              openAuthModal('login');
            }}>
              <LogIn className="h-5 w-5" />
            </Button>
          )}

          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" nativeButton={false} />} nativeButton={false}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-12">
                {user && (
                  <Link 
                    to="/profile"
                    className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100 hover:bg-green-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2E7D32] flex items-center justify-center text-white font-bold">
                      {user.displayName?.[0] || user.email?.[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 truncate">
                        {user.displayName || user.email?.split('@')[0]}
                      </span>
                      <span className="text-xs text-gray-500 truncate">{user.email}</span>
                      <span className="text-[10px] font-bold text-[#2E7D32] mt-1">VIEW PROFILE</span>
                    </div>
                  </Link>
                )}
                
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-2xl font-black tracking-tighter uppercase ${
                      location.pathname === link.path ? 'text-[#2E7D32]' : 'text-gray-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px bg-gray-100 my-2" />
                {user ? (
                  <Button 
                    variant="outline"
                    className="w-full h-14 text-lg font-bold rounded-2xl text-red-500 border-red-100 hover:bg-red-50"
                    onClick={handleLogout}
                    nativeButton={false}
                  >
                    LOGOUT
                  </Button>
                ) : (
                  <Button 
                    className="w-full h-14 bg-[#2E7D32] text-lg font-bold rounded-2xl"
                    onClick={() => {
                      console.log('Mobile login/signup button clicked');
                      openAuthModal('login');
                    }}
                    nativeButton={false}
                  >
                    LOGIN / SIGN UP
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
