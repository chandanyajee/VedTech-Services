import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Save, Eye, EyeOff, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/db/supabase';

interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const AdminSettings: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [adminData, setAdminData] = useState({
    email: '',
    fullName: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const isAuth = localStorage.getItem('vts_admin_auth');
    if (!isAuth) {
      navigate('/admin/login');
      return;
    }

    const adminEmail = localStorage.getItem('vts_admin_email');
    if (adminEmail) {
      setAdminData(prev => ({ ...prev, email: adminEmail }));
      fetchAdminData(adminEmail);
    }
  }, [navigate]);

  const fetchAdminData = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        console.error('Error fetching admin data:', error);
      } else if (data) {
        const adminUser = data as AdminUser;
        setAdminData(prev => ({
          ...prev,
          email: adminUser.email,
          fullName: adminUser.full_name
        }));
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('vts_admin_auth');
    localStorage.removeItem('vts_admin_email');
    navigate('/admin/login');
  };

  const handleUpdateProfile = async () => {
    if (!adminData.fullName) {
      toast({
        title: "Error",
        description: "Full name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      const updateData = {
        full_name: adminData.fullName,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('admin_users')
        // @ts-ignore - admin_users table not in generated types
        .update(updateData)
        .eq('email', adminData.email);

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Profile updated successfully"
        });
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleChangePassword = async () => {
    if (!adminData.currentPassword || !adminData.newPassword || !adminData.confirmPassword) {
      toast({
        title: "Error",
        description: "All password fields are required",
        variant: "destructive"
      });
      return;
    }

    if (adminData.newPassword !== adminData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (adminData.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive"
      });
      return;
    }

    try {
      // Verify current password
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('password_hash')
        .eq('email', adminData.email)
        .maybeSingle();

      const user = adminUser as AdminUser | null;
      if (user?.password_hash !== adminData.currentPassword) {
        toast({
          title: "Error",
          description: "Current password is incorrect",
          variant: "destructive"
        });
        return;
      }

      // Update password
      const updateData = {
        password_hash: adminData.newPassword,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('admin_users')
        // @ts-ignore - admin_users table not in generated types
        .update(updateData)
        .eq('email', adminData.email);

      if (error) {
        console.error('Error updating password:', error);
        toast({
          title: "Error",
          description: "Failed to update password",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Password updated successfully"
        });
        setAdminData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Settings</h1>
              <p className="text-slate-300">Manage your admin account and credentials</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-transparent border-white hover:bg-white hover:text-slate-900" onClick={() => navigate('/admin/dashboard')}>
                Back to Dashboard
              </Button>
              <Button variant="outline" className="bg-transparent border-white hover:bg-white hover:text-slate-900" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Settings Content */}
      <section className="py-8">
        <div className="container max-w-4xl">
          <div className="grid gap-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email Address</label>
                  <Input
                    type="email"
                    value={adminData.email}
                    disabled
                    className="bg-slate-100"
                  />
                  <p className="text-xs text-slate-600 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={adminData.fullName}
                    onChange={(e) => setAdminData({ ...adminData, fullName: e.target.value })}
                  />
                </div>

                <Button onClick={handleUpdateProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Current Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      value={adminData.currentPassword}
                      onChange={(e) => setAdminData({ ...adminData, currentPassword: e.target.value })}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">New Password</label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password (min 8 characters)"
                    value={adminData.newPassword}
                    onChange={(e) => setAdminData({ ...adminData, newPassword: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Confirm New Password</label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={adminData.confirmPassword}
                    onChange={(e) => setAdminData({ ...adminData, confirmPassword: e.target.value })}
                  />
                </div>

                <Button onClick={handleChangePassword}>
                  <Save className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </CardContent>
            </Card>

            {/* Current Credentials Display */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Current Admin Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> {adminData.email}</p>
                  <p><strong>Role:</strong> System Administrator</p>
                  <p><strong>Access Level:</strong> Full Access</p>
                  <p className="text-xs text-blue-700 mt-4">
                    ⚠️ Keep your credentials secure. Never share your password with anyone.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminSettings;
