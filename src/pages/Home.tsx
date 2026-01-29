import React from 'react';
import { ArrowRight, Laptop, Globe, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-slate-50">
        <div className="container relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-white text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
              Trusted IT Partner
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              One Call – <span className="text-primary">All IT Problems Solved</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              Your complete IT service partner for your home and business. From hardware repairs to software development, 
              we provide fast and reliable technical support whenever you need it.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/contact">Get Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Background visual element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full hidden md:block opacity-10">
           <Laptop className="w-full h-full text-primary" />
        </div>
      </section>

      {/* Quick Services Overview */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Comprehensive IT Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer a wide range of services to keep your technology running smoothly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-slate-50 hover:bg-slate-100 transition-colors">
              <CardContent className="pt-8">
                <Globe className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">Software Services</h3>
                <p className="text-slate-600 mb-6">Website design, mobile apps, and custom software development tailored to your needs.</p>
                <Link to="/services" className="text-primary font-semibold flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg bg-slate-50 hover:bg-slate-100 transition-colors">
              <CardContent className="pt-8">
                <Laptop className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">Hardware Services</h3>
                <p className="text-slate-600 mb-6">Computer repair, upgrades, and networking solutions for home and office environments.</p>
                <Link to="/services" className="text-primary font-semibold flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg bg-slate-50 hover:bg-slate-100 transition-colors">
              <CardContent className="pt-8">
                <Shield className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">IT Support</h3>
                <p className="text-slate-600 mb-6">Annual Maintenance Contracts (AMC) and on-call support for small businesses and offices.</p>
                <Link to="/services" className="text-primary font-semibold flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Fast & Reliable IT Support Partner</h2>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                At VedTech Services, we understand that technical issues can disrupt your business and daily life. That's why we prioritize speed and quality in everything we do.
              </p>
              <ul className="space-y-4">
                {[
                  "On-site & Remote Support options",
                  "Expert technicians for all platforms",
                  "Fast turnaround time for repairs",
                  "Transparent pricing with no hidden costs"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="secondary" size="lg">
                <Link to="/why-us">Why Choose Us</Link>
              </Button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
               <img src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d19bfcb7-b08f-4153-8d6b-3a56b1c14bac.jpg" alt="IT Specialist at Work" className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white max-w-3xl mx-auto">Ready to Solve Your IT Problems?</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Get in touch with us today for a free assessment of your IT needs.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/contact">Call Us Now</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
