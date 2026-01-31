import React, { useState } from 'react';
import { Headset, Ticket, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/db/supabase';

const Support: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      priority: "",
      category: "",
      subject: "",
      description: ""
    }
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Generate ticket ID
      const ticketId = `VTS-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      // Save to database
      const { error } = await supabase
        .from('support_tickets')
        .insert({
          ticket_id: ticketId,
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company || 'N/A',
          category: data.category,
          priority: data.priority,
          subject: data.subject,
          description: data.description,
          status: 'open'
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
      
      toast({
        title: "Ticket Raised Successfully!",
        description: `Ticket saved to database. Our support team will contact you within 2 hours. Ticket ID: ${ticketId}`,
      });
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
    </div>
  );
};

export default Support;
