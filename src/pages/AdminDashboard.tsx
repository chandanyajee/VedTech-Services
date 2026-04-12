import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Ticket, Search, RefreshCw, Mail, Phone, Calendar, User, Building, LogOut, UserCog, Edit, Settings, PieChart, TrendingUp, Filter, CheckCircle2, Award } from 'lucide-react';
import { supabase } from '@/db/supabase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface SupportTicket {
  id: string;
  ticket_id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  service_type: string;
  category: string;
  priority: string;
  subject: string;
  description: string;
  status: string;
  engineer_id: string | null;
  notes: string | null;
  is_amc_customer: boolean;
  created_at: string;
  updated_at: string;
}

interface Engineer {
  id: string;
  name: string;
  email: string;
  specialization: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>([]);
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    status: '',
    engineer_id: '',
    notes: ''
  });

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem('vts_admin_auth');
    if (!isAuth) {
      navigate('/admin/login');
      return;
    }

    fetchTickets();
    fetchEngineers();
  }, [navigate]);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tickets:', error);
      } else {
        setTickets(data || []);
        setFilteredTickets(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEngineers = async () => {
    try {
      const { data, error } = await supabase
        .from('engineers')
        .select('*')
        .eq('status', 'available');

      if (error) {
        console.error('Error fetching engineers:', error);
      } else {
        setEngineers(data || []);
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

  const handleEditTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setEditForm({
      status: ticket.status,
      engineer_id: ticket.engineer_id || 'unassigned',
      notes: ticket.notes || ''
    });
    setShowEditDialog(true);
  };

  const handleUpdateTicket = async () => {
    if (!selectedTicket) return;

    try {
      const engineerId = editForm.engineer_id === 'unassigned' ? null : editForm.engineer_id;
      
      // Use raw SQL to update
      const { error } = await supabase.rpc('update_ticket_admin', {
        p_ticket_id: selectedTicket.id,
        p_status: editForm.status,
        p_engineer_id: engineerId,
        p_notes: editForm.notes
      } as any);

      if (error) {
        console.error('Error updating ticket:', error);
        toast({
          title: "Error",
          description: "Failed to update ticket",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Ticket updated successfully"
        });
        setShowEditDialog(false);
        fetchTickets();
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    let filtered = tickets;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(ticket => ticket.status.toLowerCase() === filterStatus.toLowerCase());
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.ticket_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTickets(filtered);
  }, [searchTerm, filterStatus, tickets]);

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

  const getEngineerName = (engineerId: string | null) => {
    if (!engineerId) return 'Unassigned';
    const engineer = engineers.find(e => e.id === engineerId);
    return engineer ? engineer.name : 'Unknown';
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open' || t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length,
    amc: tickets.filter(t => t.is_amc_customer).length
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-slate-300">VedTech Services - Support Management</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => navigate('/admin/engineers')}>
                <UserCog className="h-4 w-4 mr-2" />
                Engineers
              </Button>
              <Button variant="secondary" onClick={() => navigate('/admin/settings')}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" className="bg-transparent border-white hover:bg-white hover:text-slate-900" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats and Advanced Insights */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold">{stats.total}</p>
                      <Ticket className="h-5 w-5 text-primary opacity-50" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Open</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-yellow-600">{stats.open}</p>
                      <Calendar className="h-5 w-5 text-yellow-600 opacity-50" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Resolved</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                      <CheckCircle2 className="h-5 w-5 text-green-600 opacity-50" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">AMC</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-purple-600">{stats.amc}</p>
                      <Award className="h-5 w-5 text-purple-600 opacity-50" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-slate-900 text-white border-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <PieChart className="h-24 w-24" />
              </div>
              <CardContent className="pt-6 relative z-10">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase mb-2">
                  <TrendingUp className="h-4 w-4" />
                  Performance Insight
                </div>
                <h3 className="text-lg font-bold mb-1">Success Rate: 94%</h3>
                <p className="text-xs text-slate-400 mb-4">Average resolution time: 3.8 hours</p>
                <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                  <div className="bg-primary h-full rounded-full" style={{ width: '94%' }} />
                </div>
                <p className="text-[10px] text-slate-500">Based on last 30 days of ticket history</p>
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
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <CardTitle>Support Tickets</CardTitle>
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                    <Filter className="h-4 w-4 text-slate-500 ml-2" />
                    <Button
                      variant={filterStatus === 'all' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setFilterStatus('all')}
                      className="h-8"
                    >
                      All
                    </Button>
                    <Button
                      variant={filterStatus === 'open' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setFilterStatus('open')}
                      className="h-8"
                    >
                      Open
                    </Button>
                    <Button
                      variant={filterStatus === 'resolved' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setFilterStatus('resolved')}
                      className="h-8"
                    >
                      Resolved
                    </Button>
                  </div>
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-10"
                    />
                  </div>
                  <Button size="icon" variant="outline" className="h-10 w-10" onClick={fetchTickets}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-slate-600">Loading tickets...</p>
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="text-center py-12">
                  <Ticket className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-600">No tickets found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-bold text-lg">{ticket.ticket_id}</p>
                            {ticket.is_amc_customer && (
                              <Badge className="bg-purple-100 text-purple-800">AMC</Badge>
                            )}
                          </div>
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
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-slate-400" />
                            <span>{ticket.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span>{formatDate(ticket.created_at)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <UserCog className="h-4 w-4 text-slate-400" />
                            <span className="font-semibold">{getEngineerName(ticket.engineer_id)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 text-sm">
                        <p className="text-slate-600"><strong>Service:</strong> {ticket.service_type}</p>
                        <p className="text-slate-600"><strong>Category:</strong> {ticket.category}</p>
                        <p className="text-slate-600"><strong>Location:</strong> {ticket.location}</p>
                      </div>

                      <div className="mb-3 p-3 bg-slate-50 rounded text-sm">
                        <p className="text-slate-700">{ticket.description}</p>
                      </div>

                      {ticket.notes && (
                        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                          <p className="font-semibold text-blue-900 mb-1">Internal Notes:</p>
                          <p className="text-blue-800">{ticket.notes}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleEditTicket(ticket)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Manage Ticket
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.location.href = `mailto:${ticket.email}?subject=Re: ${ticket.ticket_id}`}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Reply via Email
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

      {/* Edit Ticket Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Ticket: {selectedTicket?.ticket_id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={editForm.status} onValueChange={(value) => setEditForm({...editForm, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="waiting">Waiting</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Assign Engineer</label>
              <Select value={editForm.engineer_id} onValueChange={(value) => setEditForm({...editForm, engineer_id: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select engineer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {engineers.map((engineer) => (
                    <SelectItem key={engineer.id} value={engineer.id}>
                      {engineer.name} - {engineer.specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Internal Notes</label>
              <Textarea
                placeholder="Add notes about this ticket..."
                value={editForm.notes}
                onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                rows={4}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1" onClick={handleUpdateTicket}>
                Update Ticket
              </Button>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
