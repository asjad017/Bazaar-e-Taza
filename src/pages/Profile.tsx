import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, Mail, Save, Loader2, Package } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TELANGANA_CITIES } from '../constants';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export default function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    street: '',
    city: 'Hyderabad',
    pincode: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }

    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.displayName || '',
      }));
      fetchAdditionalData();
    }
  }, [user, loading, navigate]);

  const fetchAdditionalData = async () => {
    if (!user) return;
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfileData({
          name: user.displayName || '',
          phone: data.phone || '',
          street: data.address?.street || '',
          city: data.address?.city || 'Hyderabad',
          pincode: data.address?.pincode || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
      // Update Auth Profile (Name)
      if (profileData.name !== user.displayName) {
        await updateProfile(user, { displayName: profileData.name });
      }

      // Update Firestore Data
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        name: profileData.name,
        email: user.email,
        phone: profileData.phone,
        address: {
          street: profileData.street,
          city: profileData.city,
          state: 'Telangana',
          pincode: profileData.pincode,
        },
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Update Error:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#2E7D32] mx-auto" />
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-500">Manage your personal information and delivery address.</p>
          </div>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => navigate('/orders')}
          >
            <Package className="h-4 w-4" />
            View My Orders
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <Card className="md:col-span-1 border-none shadow-md bg-gray-50">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-24 h-24 bg-[#2E7D32] text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-xl">{user?.displayName || 'User'}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <div className="pt-4 border-t border-gray-200 text-left space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-[#2E7D32]" />
                  {user?.email}
                </div>
                {profileData.phone && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-[#2E7D32]" />
                    {profileData.phone}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          <Card className="md:col-span-2 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-5 w-5 text-[#2E7D32]" />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="font-bold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#2E7D32]" />
                    Delivery Address
                  </h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Street / Area</label>
                    <Input
                      name="street"
                      value={profileData.street}
                      onChange={handleInputChange}
                      placeholder="House No, Street, Landmark"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">City</label>
                      <select
                        name="city"
                        value={profileData.city}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {TELANGANA_CITIES.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Pincode</label>
                      <Input
                        name="pincode"
                        value={profileData.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit pincode"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSaving}
                  className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] h-12 text-lg font-bold gap-2"
                >
                  {isSaving ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Save className="h-5 w-5" />
                  )}
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
