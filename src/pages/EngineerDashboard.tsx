import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wrench, LogOut, Ticket, Clock, CheckCircle2, User, Mail, Phone } from 'lucide-react';
import { supabase } from '@/db/supabase';
import { useNavigate } from 'react-router-dom';

interface Engineer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  status: string;
}

interface AssignedTicket {
  id: string;
  ticket_id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service_type: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  created_at: string;
}

const EngineerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [engineer, setEngineer] = useState<Engineer | null>(null);
  const [tickets, setTickets] = useState<AssignedTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const engineerEmail = localStorage.getItem('vts_engineer_email');
    if (engineerEmail) {
      setEmail(engineerEmail);
      fetchEngineerData(engineerEmail);
    }
  }, []);

  const fetchEngineerData = async (engineerEmail: string) => {
    setIsLoading(true);
    try {
      // Fetch engineer details
      const { data: engineerData, error: engineerError } = await supabase
        .from('engineers')
        .select('*')
        .eq('email', engineerEmail)
        .single();

      if (engineerError || !engineerData) {
        console.error('Engineer not found');
        handleLogout();
        return;
      }

      const eng = engineerData as any;
      setEngineer(eng);
      setIsLoggedIn(true);

      // Fetch assigned tickets
      const { data: ticketsData, error: ticketsError } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('engineer_id', eng.id)
        .order('created_at', { ascending: false });

      if (ticketsError) {
        console.error('Error fetching tickets:', ticketsError);
      } else {
        setTickets(ticketsData || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email) return;

    const { data: engineerData, error } = await supabase
      .from('engineers')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !engineerData) {
      alert('Engineer not found with this email');
      return;
    }

    localStorage.setItem('vts_engineer_email', email);
    fetchEngineerData(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('vts_engineer_email');
    setIsLoggedIn(false);
    setEngineer(null);
    setTickets([]);
    setEmail('');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'waiting':
        return 'bg-orange-100 text-orange-800';
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
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="container text-center">
            <Wrench className="h-16 w-16 mx-auto mb-4 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Engineer Dashboard</h1>
            <p className="text-xl text-slate-300">VedTech Services - Engineer Portal</p>
          </div>
        </section>

        <section className="flex-1 flex items-center justify-center py-20">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-center">Engineer Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Engineer Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <Button className="w-full" onClick={handleLogin} disabled={!email}>
                Access Dashboard
              </Button>
              <div className="text-sm text-slate-600 text-center pt-4 border-t">
                <p className="font-semibold mb-2">Demo Engineer Accounts:</p>
                <p>rajesh@vedtechservices.com</p>
                <p>priya@vedtechservices.com</p>
                <p>amit@vedtechservices.com</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open' || t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {engineer?.name}!</h1>
              <p className="text-slate-300">{engineer?.specialization}</p>
              <p className="text-sm text-slate-400">{engineer?.email}</p>
            </div>
            <Button variant="outline" className="bg-transparent border-white hover:bg-white hover:text-slate-900" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Assigned Tickets</p>
                    <p className="text-3xl font-bold">{stats.total}</p>
                  </div>
                  <Ticket className="h-10 w-10 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">In Progress</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.open}</p>
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
                    <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
                  </div>
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tickets */}
      <section className="py-8">
        <div className="container">
          <Card>
            <CardHeader>
              <CardTitle>My Assigned Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-slate-600">Loading tickets...</p>
                </div>
              ) : tickets.length === 0 ? (
                <div className="text-center py-12">
                  <Ticket className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-600">No tickets assigned yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-lg mb-1">{ticket.ticket_id}</p>
                          <p className="text-slate-900 font-semibold">{ticket.subject}</p>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-slate-400" />
                            <span className="font-semibold">{ticket.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-slate-400" />
                            <span>{ticket.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-slate-400" />
                            <span>{ticket.phone}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p><strong>Company:</strong> {ticket.company}</p>
                          <p><strong>Service:</strong> {ticket.service_type}</p>
                          <p><strong>Created:</strong> {formatDate(ticket.created_at)}</p>
                        </div>
                      </div>

                      <div className="mb-3 p-3 bg-slate-50 rounded text-sm">
                        <p className="text-slate-700">{ticket.description}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => window.location.href = `mailto:${ticket.email}?subject=Re: ${ticket.ticket_id}`}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email Customer
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.location.href = `tel:${ticket.phone}`}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call Customer
                        </Button>
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

export default EngineerDashboard;
