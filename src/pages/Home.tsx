import React from 'react';
import { ArrowRight, Laptop, Globe, Shield, Zap, CheckCircle2, Award, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="container relative z-10">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              <Award className="mr-2 h-4 w-4" />
              India's Leading IT Services Provider
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              One Call – <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Complete IT Solutions</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
              VedTech Services is your trusted enterprise IT partner delivering comprehensive technology solutions. 
              From hardware infrastructure to custom software development, we provide fast, reliable, and professional services under one roof.
            </p>
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                <Link to="/support">Raise a Ticket</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 pt-8 text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span>500+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span>Pan-India Service</span>
              </div>
            </div>
          </div>
        </div>
        {/* Background visual element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full hidden md:block opacity-10">
           <Laptop className="w-full h-full text-blue-400" />
        </div>
      </section>
      {/* Trust Indicators */}
      <section className="py-12 bg-white border-y">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">{"100+"}</div>
              <div className="text-sm text-slate-600 font-medium">Satisfied Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">{"100+"}</div>
              <div className="text-sm text-slate-600 font-medium">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-slate-600 font-medium">Support Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-slate-600 font-medium">Client Retention</div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Overview */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">Complete IT Solutions Under One Roof</h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              From enterprise software development to hardware maintenance, VedTech Services provides end-to-end IT solutions for businesses across India.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/services/software" className="block">
              <Card className="border-2 border-transparent hover:border-primary transition-all shadow-lg hover:shadow-xl cursor-pointer h-full">
                <CardContent className="pt-8">
                  <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Software & Digital Services</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">Custom software development, web applications, mobile apps, and cloud solutions tailored to your business needs.</p>
                  <ul className="space-y-2 mb-6">
                    {["Website Development", "Mobile Apps", "Custom Software", "Cloud Solutions"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="text-primary font-semibold flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/services/hardware" className="block">
              <Card className="border-2 border-transparent hover:border-primary transition-all shadow-lg hover:shadow-xl cursor-pointer h-full">
                <CardContent className="pt-8">
                  <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Laptop className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Hardware & Infrastructure</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">Complete hardware solutions including repairs, upgrades, networking, and IT infrastructure setup for offices.</p>
                  <ul className="space-y-2 mb-6">
                    {["Computer Repair", "Network Setup", "Hardware Upgrades", "CCTV Installation"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="text-primary font-semibold flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/services/it-support" className="block">
              <Card className="border-2 border-transparent hover:border-primary transition-all shadow-lg hover:shadow-xl cursor-pointer h-full">
                <CardContent className="pt-8">
                  <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">IT Support & AMC</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">Dedicated IT helpdesk, annual maintenance contracts, and comprehensive support for businesses of all sizes.</p>
                  <ul className="space-y-2 mb-6">
                    {["24/7 Helpdesk", "AMC Plans", "Remote Support", "On-site Service"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="text-primary font-semibold flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      {/* Why Choose Us Preview */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">Why Businesses Trust VedTech Services</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                We're not just another IT service provider. VedTech Services is built on the foundation of reliability, expertise, and customer-first approach.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Zap className="h-6 w-6" />, title: "Fast Response Time", desc: "Same-day service for urgent issues" },
                  { icon: <Users className="h-6 w-6" />, title: "Expert Team", desc: "Certified professionals with 10+ years experience" },
                  { icon: <TrendingUp className="h-6 w-6" />, title: "Scalable Solutions", desc: "Grow your IT infrastructure as you grow" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">{item.title}</div>
                      <div className="text-slate-600 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="mt-6">
                <Link to="/why-us">Discover More Benefits</Link>
              </Button>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
               <img src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d19bfcb7-b08f-4153-8d6b-3a56b1c14bac.jpg" alt="IT Specialist at Work" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>
      {/* Industries Section */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Specialized IT solutions for diverse sectors across India
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Educational Institutions",
              "Corporate Offices",
              "Retail & Shops",
              "Healthcare",
              "Manufacturing",
              "Startups & SMEs"
            ].map((industry, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="font-semibold text-slate-800">{industry}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/industries">View All Industries</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-blue-600 to-primary text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Transform Your IT Infrastructure?</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Get a free consultation from our experts. Let's discuss how we can help your business grow with the right technology solutions.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link to="/support">Raise a Ticket</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
