import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, X, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot-password'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // Reset mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateGmail = (email: string) => {
    return email.toLowerCase().endsWith('@gmail.com');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Forgot password requested', { email });
    if (!validateGmail(email)) {
      toast.error('Please enter your registered Gmail address');
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset link sent to your Gmail!');
      setMode('login');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Auth form submitted', { mode, email: email.trim() });
    
    if (mode === 'forgot-password') {
      return handleForgotPassword(e);
    }

    const cleanEmail = email.trim();

    if (!validateGmail(cleanEmail)) {
      toast.error('Please use a valid Gmail address (example@gmail.com)');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      if (mode === 'signup') {
        if (!fullName.trim()) {
          toast.error('Please enter your full name');
          setIsLoading(false);
          return;
        }
        console.log('Attempting signup...');
        const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
        await updateProfile(userCredential.user, { displayName: fullName.trim() });
        
        // Create user document in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: fullName.trim(),
          email: cleanEmail,
          role: 'customer',
          createdAt: new Date().toISOString()
        });

        toast.success('Account created successfully!');
      } else {
        console.log('Attempting login...');
        await signInWithEmailAndPassword(auth, cleanEmail, password);
        toast.success('Welcome back!');
      }
      onClose();
    } catch (error: any) {
      console.error('Auth Error:', error);
      let message = 'Authentication failed';
      
      // User-friendly error messages
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        message = 'Invalid Gmail or password. Please try again.';
      } else if (error.code === 'auth/email-already-in-use') {
        message = 'This Gmail is already registered. Please login instead.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password is too weak. Please use at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid Gmail format.';
      } else if (error.code === 'auth/network-request-failed') {
        message = 'Network error. Please check your connection.';
      } else if (error.message) {
        message = error.message;
      }
      
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[90] overflow-y-auto p-4 md:p-8 flex justify-center items-center">
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md pointer-events-auto my-auto"
            >
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl border border-gray-100">
                <div className="relative p-8 md:p-10">
                  <button
                    onClick={onClose}
                    className="absolute right-6 top-6 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="mb-8 text-center">
                    <h2 className="text-3xl font-black tracking-tighter text-gray-900 uppercase">
                      {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
                    </h2>
                    <p className="mt-2 text-gray-500">
                      {mode === 'login' 
                        ? 'Enter your Gmail details to access your fresh produce.' 
                        : mode === 'signup'
                        ? 'Join Bazaar E Taza for the freshest farm delivery.'
                        : 'Enter your Gmail to receive a reset link.'}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      {mode === 'signup' && (
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="h-14 rounded-xl border-transparent bg-gray-50 pl-12 focus:bg-white focus:border-[#2E7D32] transition-all"
                            required
                          />
                        </div>
                      )}
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="Gmail Address (example@gmail.com)"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-14 rounded-xl border-transparent bg-gray-50 pl-12 focus:bg-white focus:border-[#2E7D32] transition-all"
                          required
                        />
                      </div>
                      {mode !== 'forgot-password' && (
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-14 rounded-xl border-transparent bg-gray-50 pl-12 focus:bg-white focus:border-[#2E7D32] transition-all"
                            required
                          />
                        </div>
                      )}

                      {mode === 'login' && (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setMode('forgot-password')}
                            className="text-sm font-medium text-[#2E7D32] hover:underline"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="h-14 w-full rounded-xl bg-[#2E7D32] text-white text-lg font-bold hover:bg-[#1B5E20] shadow-xl shadow-[#2E7D32]/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          <>
                            {mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Send Link'}
                            <ArrowRight className="h-5 w-5" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-gray-500">
                      {mode === 'login' ? (
                        <>
                          Don't have an account?{' '}
                          <button
                            onClick={() => setMode('signup')}
                            className="font-bold text-[#2E7D32] hover:underline"
                          >
                            Sign Up
                          </button>
                        </>
                      ) : (
                        <>
                          Remember your password?{' '}
                          <button
                            onClick={() => setMode('login')}
                            className="font-bold text-[#2E7D32] hover:underline"
                          >
                            Login
                          </button>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
