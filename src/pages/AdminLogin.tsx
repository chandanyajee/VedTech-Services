import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setError('');
    setIsLoading(true);

    // Simple authentication (in production, use proper auth)
    if (email === 'admin@vedtechservices.com' && password === 'VTS@Admin2025') {
      localStorage.setItem('vts_admin_auth', 'true');
      localStorage.setItem('vts_admin_email', email);
      navigate('/admin/tickets');
    } else {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-blue-400" />
          <h1 className="text-4xl font-bold mb-4">Admin Login</h1>
          <p className="text-slate-300">VedTech Services - Support Team Access</p>
        </div>
      </section>

      <section className="flex-1 flex items-center justify-center py-20">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium mb-2 block">Admin Email</label>
              <Input
                type="email"
                placeholder="admin@vedtechservices.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <Button 
              className="w-full" 
              onClick={handleLogin}
              disabled={isLoading || !email || !password}
            >
              {isLoading ? 'Logging in...' : 'Login to Admin Dashboard'}
            </Button>

            <div className="text-center text-sm text-slate-600 pt-4 border-t">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <p>Email: admin@vedtechservices.com</p>
              <p>Password: VTS@Admin2025</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AdminLogin;
