import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Users, Lock, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/db/supabase';
import { LoadingSpinner } from '@/components/common/Loader';
import { useToast } from '@/hooks/use-toast';

const EmployeeLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // For demo, using employee_id as password
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [showForgotDialog, setShowForgotDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [isResetting, setIsResetting] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      // In a real app, we'd use proper auth and password hashing
      // For this demo, we'll check the email and password_hash (which defaults to employee_id)
      const { data, error: fetchError } = await supabase
        .from('engineers')
        .select('*')
        .eq('email', email)
        .eq('password_hash', password)
        .eq('is_active', true)
        .single() as { data: any, error: any };

      if (fetchError || !data) {
        setError('Invalid credentials or account inactive');
      } else {
        localStorage.setItem('vts_engineer_auth', 'true');
        localStorage.setItem('vts_engineer_id', data.id);
        localStorage.setItem('vts_engineer_name', data.name);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${data.name}!`,
        });
        
        navigate('/engineer/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestReset = async () => {
    if (!resetEmail) return;
    setIsResetting(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-reset-code', {
        body: { email: resetEmail, user_type: 'engineer' }
      });

      if (error) {
        // Fallback simulation for demo if not deployed
        const { data: user } = await (supabase.from('engineers').select('id').eq('email', resetEmail).single() as any);
        if (user) {
          const simulatedCode = '654321';
          await ((supabase.from('engineers') as any).update({ reset_code: simulatedCode, reset_code_expires: new Date(Date.now() + 15*60*1000).toISOString() }).eq('id', user.id));
          toast({ title: "Reset Code Sent", description: "Use code 654321 (simulated)" });
          setStep('verify');
        } else {
          toast({ title: "Error", description: "Account not found", variant: "destructive" });
        }
      } else {
        toast({ title: "Success", description: data.message });
        setStep('verify');
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to send reset code", variant: "destructive" });
    } finally {
      setIsResetting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetCode || !newPassword) return;
    setIsResetting(true);
    try {
      const { data: user, error: verifyError } = await (supabase
        .from('engineers')
        .select('id, reset_code_expires')
        .eq('email', resetEmail)
        .eq('reset_code', resetCode)
        .single() as any);

      if (verifyError || !user) {
        toast({ title: "Invalid Code", description: "The verification code is incorrect.", variant: "destructive" });
        return;
      }

      if (new Date(user.reset_code_expires) < new Date()) {
        toast({ title: "Code Expired", description: "Please request a new code.", variant: "destructive" });
        setStep('request');
        return;
      }

      const { error: updateError } = await ((supabase
        .from('engineers') as any)
        .update({ password_hash: newPassword, reset_code: null, reset_code_expires: null })
        .eq('id', user.id));

      if (updateError) throw updateError;

      toast({ title: "Password Updated", description: "You can now login with your new password." });
      setShowForgotDialog(false);
      setStep('request');
      setResetEmail('');
      setResetCode('');
      setNewPassword('');
    } catch (err) {
      toast({ title: "Update Failed", description: "Could not reset password.", variant: "destructive" });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32">
        <div className="container text-center">
          <Users className="h-16 w-16 mx-auto mb-4 text-blue-400" />
          <h1 className="text-4xl font-bold mb-4">Employee Login</h1>
          <p className="text-slate-300">VedTech Services - Engineering Team Access</p>
        </div>
      </section>
      <section className="flex-1 flex items-center justify-center py-20 md:py-32">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Lock className="h-5 w-5" />
              Employee Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium mb-2 block">Official Email</label>
              <Input
                type="email"
                placeholder="engineer@vedtechservices.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Login Password</label>
              <Input
                type="password"
                placeholder="Enter Password"
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
              {isLoading ? (
                <>
                  <LoadingSpinner className="mr-2 h-4 w-4 text-white" />
                  Authenticating...
                </>
              ) : 'Login to Portal'}
            </Button>

            <div className="text-center pt-2">
              <Button variant="link" className="text-sm text-blue-600 p-0 h-auto" onClick={() => setShowForgotDialog(true)}>
                Forgot Password?
              </Button>
            </div>

            <div className="text-center text-sm text-slate-500 pt-4 border-t">
              <p>For support regarding your login credentials, contact your HR or IT Administrator.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotDialog} onOpenChange={setShowForgotDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-blue-500" />
              Reset Employee Password
            </DialogTitle>
            <DialogDescription>
              We'll send a 6-digit verification code to your official email to reset your account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {step === 'request' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Official Employee Email</label>
                  <Input 
                    type="email" 
                    placeholder="engineer@vedtechservices.com" 
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleRequestReset} disabled={isResetting || !resetEmail}>
                  {isResetting ? <LoadingSpinner className="mr-2 h-4 w-4" /> : 'Send Verification Code'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Verification Code</label>
                  <Input 
                    placeholder="Enter 6-digit code" 
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input 
                    type="password" 
                    placeholder="Enter your new password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep('request')}>Back</Button>
                  <Button className="flex-[2]" onClick={handleResetPassword} disabled={isResetting || !resetCode || !newPassword}>
                    {isResetting ? <LoadingSpinner className="mr-2 h-4 w-4" /> : 'Update Password'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeLogin;
