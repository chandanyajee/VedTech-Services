import React, { useState } from 'react';
import { Headset, Ticket, Clock, CheckCircle2, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/db/supabase';
import { useNavigate } from 'react-router-dom';

const Support: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({ ticketId: '', email: '', isNewCustomer: false });
  
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      location: "",
      serviceType: "",
      priority: "",
      category: "",
      subject: "",
      description: ""
    }
  });

  const copyTicketId = () => {
    navigator.clipboard.writeText(ticketDetails.ticketId);
    toast({
      title: "Copied!",
      description: "Ticket ID copied to clipboard",
    });
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Check if customer exists
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('email', data.email)
        .single();

      const isNewCustomer = !existingCustomer;

      // Get or create customer
      const { data: customerData, error: customerError } = await supabase
        .rpc('get_or_create_customer', {
          p_email: data.email,
          p_name: data.name,
          p_phone: data.phone,
          p_company: data.company || null,
          p_location: data.location || null
        } as any);

      if (customerError) {
        console.error('Error creating customer:', customerError);
      }

      const customerId = customerData;

      // Check if customer has active AMC
      const { data: amcStatus } = await supabase
        .rpc('check_customer_amc_status', { customer_email: data.email } as any);

      const isAMCCustomer = amcStatus || false;

      // Generate ticket ID
      const ticketId = `VTS-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      // Save to database
      const { error } = await supabase
        .from('support_tickets')
        .insert({
          ticket_id: ticketId,
          customer_id: customerId,
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company || 'N/A',
          location: data.location || 'N/A',
          service_type: data.serviceType,
          category: data.category,
          priority: data.priority,
          subject: data.subject,
          description: data.description,
          status: 'open',
          is_amc_customer: isAMCCustomer
        } as any);

      if (error) {
        console.error('Error saving ticket:', error);
        toast({
          title: "Error",
          description: "Failed to submit ticket. Please try again or contact us directly.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Create email content for ticket
      const subject = `Support Ticket ${ticketId}: ${data.subject}`;
      const body = `
Support Ticket Details:

Ticket ID: ${ticketId}
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || 'N/A'}
Location: ${data.location || 'N/A'}
Service Type: ${data.serviceType}
Category: ${data.category}
Priority: ${data.priority}
Subject: ${data.subject}

Description:
${data.description}

---
This ticket has been saved to the VedTech Services support system.
      `;
      
      // Open default email client
      const mailtoLink = `mailto:vedtechservice@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      
      // Show success dialog
      setTicketDetails({ ticketId, email: data.email, isNewCustomer });
      setShowSuccessDialog(true);
      form.reset();
    } catch (err) {
      console.error('Error submitting ticket:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-primary text-white py-20">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
            <Headset className="h-5 w-5" />
            <span className="text-sm font-semibold">24/7 Support Available</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Customer Support Center</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Raise a ticket and get expert assistance. Our dedicated support team is here to resolve your IT issues quickly and efficiently.
          </p>
        </div>
      </section>
      {/* Support Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">&lt; 2 Hrs</div>
              <div className="text-sm text-slate-600">Average Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-slate-600">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-slate-600">Support Availability</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5000+</div>
              <div className="text-sm text-slate-600">Tickets Resolved</div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Ticket Form */}
            <div className="md:col-span-2">
              <Card className="border-2">
                <CardHeader className="bg-slate-900 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-6 w-6" />
                    Raise a Support Ticket
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          rules={{ required: "Name is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          rules={{ 
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address"
                            }
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          rules={{ required: "Phone number is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 7370057723" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company / Organization</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Company Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="City, State" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="serviceType"
                          rules={{ required: "Service type is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Type *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select service type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="hardware">Hardware Support</SelectItem>
                                  <SelectItem value="software">Software Support</SelectItem>
                                  <SelectItem value="web">Web Development</SelectItem>
                                  <SelectItem value="app">App Development</SelectItem>
                                  <SelectItem value="networking">Networking</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="category"
                          rules={{ required: "Please select a category" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Issue Category *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="hardware">Hardware Issue</SelectItem>
                                  <SelectItem value="software">Software Issue</SelectItem>
                                  <SelectItem value="network">Network Problem</SelectItem>
                                  <SelectItem value="website">Website/App Issue</SelectItem>
                                  <SelectItem value="amc">AMC Support</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="priority"
                          rules={{ required: "Please select priority" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Priority Level *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="low">Low - General Query</SelectItem>
                                  <SelectItem value="medium">Medium - Issue but not urgent</SelectItem>
                                  <SelectItem value="high">High - Urgent Issue</SelectItem>
                                  <SelectItem value="critical">Critical - System Down</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        rules={{ required: "Subject is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject *</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief description of the issue" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        rules={{ required: "Please describe your issue" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Detailed Description *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide detailed information about your issue..." 
                                className="min-h-[150px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full md:w-auto px-8 py-6 text-lg">
                        <Ticket className="mr-2 h-5 w-5" /> Submit Ticket
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Support Info Sidebar */}
            <div className="space-y-6">
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 p-3 rounded-lg text-white">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Quick Response</h3>
                      <p className="text-sm text-slate-700">We respond to all tickets within 2 hours during business hours.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Support Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { step: "1", title: "Submit Ticket", desc: "Fill the form with issue details" },
                    { step: "2", title: "Get Ticket ID", desc: "Receive confirmation via email" },
                    { step: "3", title: "Expert Review", desc: "Our team analyzes your issue" },
                    { step: "4", title: "Resolution", desc: "We fix it remotely or on-site" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{item.title}</div>
                        <div className="text-xs text-slate-600">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-900 text-white">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-lg">Need Immediate Help?</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-slate-400 mb-1">Call Us</div>
                      <div className="font-semibold text-lg">{"+91 7858971869 , +91 7370057723"}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 mb-1">Email</div>
                      <div className="font-semibold">{"vedtechservice@gmail.com"}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 mb-1">WhatsApp</div>
                      <div className="font-semibold">+91 7858971869, 7370057723</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle className="text-center text-2xl">Ticket Created Successfully!</DialogTitle>
            <DialogDescription className="text-center space-y-4 pt-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600 mb-2">Your Ticket ID</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-2xl font-bold text-primary">{ticketDetails.ticketId}</p>
                  <Button size="sm" variant="ghost" onClick={copyTicketId}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {ticketDetails.isNewCustomer && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-left">
                  <p className="text-sm font-semibold text-blue-900 mb-2">✅ Account Created</p>
                  <p className="text-sm text-blue-800">
                    Your customer account has been created with email: <strong>{ticketDetails.email}</strong>
                  </p>
                  <p className="text-xs text-blue-700 mt-2">
                    You can now track all your tickets using this email on the Customer Dashboard.
                  </p>
                </div>
              )}

              <div className="space-y-2 text-sm text-slate-700">
                <p className="font-semibold">✅ Ticket saved to our system</p>
                <p className="font-semibold">✅ Email notification sent</p>
                <p className="font-semibold">✅ Our team will contact you within 2 hours</p>
              </div>

              <div className="pt-4 space-y-2">
                <Button 
                  className="w-full" 
                  onClick={() => {
                    setShowSuccessDialog(false);
                    navigate('/dashboard');
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Go to Customer Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowSuccessDialog(false)}
                >
                  Close
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Support;
