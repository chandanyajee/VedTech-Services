import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import PageMeta from '@/components/common/PageMeta';

const Contact: React.FC = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    }
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    
    // Create email content
    const subject = `Contact Form: ${data.service || 'General Inquiry'}`;
    const body = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service}

Message:
${data.message}
    `;
    
    // Open default email client
    const mailtoLink = `mailto:vedtechservice@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    alert("Thank you for your inquiry. Your email client will open to send the message. We will get back to you shortly!");
    form.reset();
  };

  return (
    <>
      <PageMeta 
        title="Contact VedTech Services - Get Free IT Consultation | 24/7 Support"
        description="Contact VedTech Services for professional IT support. Get free consultation, 24/7 emergency support, and expert solutions. Call, email, or WhatsApp us now for immediate assistance."
      />
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-blue-300 mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Get Free Consultation</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Start Your Project Today</h1>
              <p className="text-slate-300 text-lg">
                Have an IT problem? We have the solution. Get free consultation from our experts and transform your business with the right technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6"
                  onClick={() => window.open('https://wa.me/917858971869?text=Hi%2C%20I%20need%20IT%20support', '_blank')}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  WhatsApp Us Now
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg px-8 py-6"
                  onClick={() => window.location.href = 'tel:+917858971869'}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call: +91 7858971869
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 pt-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Fast Response</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <Card>
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-bold">Call Us</div>
                      <div className="text-slate-600">+91 7858971869</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-bold">Email Us</div>
                      <div className="text-slate-600">{"vedtechservicess@gmail.com"}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-lg text-green-600">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold mb-2">WhatsApp (RECOMMENDED)</div>
                      <div className="text-slate-600 mb-3">+91 7858971869</div>
                      <Button 
                        size="sm" 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => window.open('https://wa.me/917858971869?text=Hi%2C%20I%20need%20IT%20support', '_blank')}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat on WhatsApp
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-bold">Our Office</div>
                      <div className="text-slate-600">{"Samastipur, Tech Hub, Bihar, India"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl space-y-4">
                <h3 className="text-xl font-bold">Business Hours</h3>
                <div className="space-y-2 text-slate-400">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-primary font-bold">On-Call Only</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
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
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
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
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 7858971869" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Interested In</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Website, Laptop Repair" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your IT problem..." 
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full md:w-auto px-8 py-6 text-lg">
                      <Send className="mr-2 h-5 w-5" /> Send Inquiry
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contact;
