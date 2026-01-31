import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Ticket, Clock, CheckCircle2, Shield, FileText, Plus, Search } from 'lucide-react';
import { supabase } from '@/db/supabase';
import { useNavigate } from 'react-router-dom';

interface CustomerTicket {
  id: string;
  ticket_id: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  service_type: string;
  created_at: string;
  updated_at: string;
}

interface AMCSubscription {
  id: string;
  plan_name: string;
  start_date: string;
  end_date: string;
  status: string;
  amount: number;
}

const CustomerDashboard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [tickets, setTickets] = useState<CustomerTicket[]>([]);
  const [amcSubscriptions, setAmcSubscriptions] = useState<AMCSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      // Check if customer exists
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('email', email)
        .single();

      if (customerError || !customerData) {
        alert('No account found with this email. Please raise a ticket first to create an account.');
        setIsLoading(false);
        return;
      }

      const customer = customerData as any;
      setCustomerName(customer.name);
      setIsLoggedIn(true);
      
      // Fetch tickets
      const { data: ticketsData } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false });

      setTickets(ticketsData || []);

      // Fetch AMC subscriptions
      const { data: amcData } = await supabase
        .from('amc_subscriptions')
        .select(`
          id,
          start_date,
          end_date,
          status,
          amount,
          amc_plans (name)
        `)
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false });

      if (amcData) {
        const formattedAMC = amcData.map((sub: any) => ({
          id: sub.id,
          plan_name: sub.amc_plans?.name || 'Unknown Plan',
          start_date: sub.start_date,
          end_date: sub.end_date,
          status: sub.status,
          amount: sub.amount
        }));
        setAmcSubscriptions(formattedAMC);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setCustomerName('');
    setTickets([]);
    setAmcSubscriptions([]);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isAMCActive = amcSubscriptions.some(
    sub => sub.status === 'active' && new Date(sub.end_date) >= new Date()
  );

  const filteredTickets = tickets.filter(ticket =>
    ticket.ticket_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <section className="bg-gradient-to-br from-primary via-blue-600 to-primary text-white py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Customer Dashboard</h1>
            <p className="text-xl text-blue-100">Track your tickets and AMC status</p>
          </div>
        </section>

        <section className="flex-1 flex items-center justify-center py-20">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-center">Login to Your Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handleLogin}
                disabled={isLoading || !email}
              >
                {isLoading ? 'Loading...' : 'Access Dashboard'}
              </Button>
              <p className="text-sm text-slate-600 text-center">
                Don't have an account? <a href="/support" className="text-primary hover:underline">Raise a ticket</a> to get started
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-primary text-white py-12">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {customerName}!</h1>
              <p className="text-blue-100">{email}</p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Tickets</p>
                    <p className="text-3xl font-bold">{tickets.length}</p>
                  </div>
                  <Ticket className="h-10 w-10 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Open Tickets</p>
                    <p className="text-3xl font-bold">
                      {tickets.filter(t => t.status === 'open' || t.status === 'in-progress').length}
                    </p>
                  </div>
                  <Clock className="h-10 w-10 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Resolved</p>
                    <p className="text-3xl font-bold">
                      {tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length}
                    </p>
                  </div>
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">AMC Status</p>
                    <p className="text-lg font-bold">
                      {isAMCActive ? (
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      ) : (
                        <Badge className="bg-slate-100 text-slate-800">Inactive</Badge>
                      )}
                    </p>
                  </div>
                  <Shield className="h-10 w-10 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AMC Subscriptions */}
      {amcSubscriptions.length > 0 && (
        <section className="py-8">
          <div className="container">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>AMC Subscriptions</CardTitle>
                  <Button size="sm" onClick={() => navigate('/amc-plans')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {amcSubscriptions.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-semibold">{sub.plan_name}</p>
                        <p className="text-sm text-slate-600">
                          {formatDate(sub.start_date)} - {formatDate(sub.end_date)}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={sub.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}>
                          {sub.status}
                        </Badge>
                        <p className="text-sm font-semibold mt-1">₹{sub.amount.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Tickets */}
      <section className="py-8">
        <div className="container">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <CardTitle>My Support Tickets</CardTitle>
                <div className="flex gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button onClick={() => navigate('/support')}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Ticket
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredTickets.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-600">No tickets found</p>
                  <Button className="mt-4" onClick={() => navigate('/support')}>
                    Raise Your First Ticket
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-lg">{ticket.ticket_id}</p>
                          <p className="text-slate-900">{ticket.subject}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>Category: {ticket.category}</span>
                        <span>•</span>
                        <span>Service: {ticket.service_type || 'General'}</span>
                        <span>•</span>
                        <span>Created: {formatDate(ticket.created_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;
