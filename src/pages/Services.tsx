import React from 'react';
import { 
  Globe, Laptop, Shield, Code, Smartphone, Settings, 
  Wrench, Printer, Network, Headset, FileCheck, Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const serviceCategories = [
  {
    title: "Software Services",
    icon: <Code className="h-8 w-8 text-blue-600" />,
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_c95ab538-0bed-4ce9-89ab-927f348c0c01.jpg",
    items: [
      { name: "Website Design & Development", desc: "Modern, responsive websites that grow your business." },
      { name: "Web Applications", desc: "Custom web-based tools and dashboards for your operations." },
      { name: "Mobile App Development", desc: "iOS and Android apps tailored to your requirements." },
      { name: "Software Installation & Support", desc: "Setting up and troubleshooting professional software." },
      { name: "Bug Fixing & Updates", desc: "Regular maintenance to keep your software running smooth." },
      { name: "Remote Technical Support", desc: "Instant help for software issues over the internet." }
    ]
  },
  {
    title: "Hardware Services",
    icon: <Laptop className="h-8 w-8 text-blue-600" />,
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d19bfcb7-b08f-4153-8d6b-3a56b1c14bac.jpg",
    items: [
      { name: "Computer & Laptop Repair", desc: "Expert diagnosis and repair for all brands and models." },
      { name: "Printer / Scanner Setup & Repair", desc: "Setup, configuration, and fixing of peripherals." },
      { name: "Hardware Upgrade (RAM, SSD)", desc: "Boost your computer's speed and storage capacity." },
      { name: "Networking (LAN / Wi-Fi Setup)", desc: "Secure and fast network connectivity for home and office." },
      { name: "On-site IT Support", desc: "We come to you to solve complex hardware problems." }
    ]
  },
  {
    title: "IT Support Services",
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_ce948713-fa41-4162-85c8-050fd5732e4d.jpg",
    items: [
      { name: "IT Helpdesk", desc: "Reliable support for your employees' daily technical issues." },
      { name: "AMC (Annual Maintenance Contract)", desc: "Peace of mind with regular checkups and priority support." },
      { name: "Small Office & Business IT Support", desc: "Scalable IT management for growing organizations." },
      { name: "Fast On-Call Support", desc: "One call and we are there to solve your urgent problems." }
    ]
  }
];

const Services: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-slate-50 py-20 border-b">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our IT Services</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Comprehensive technology solutions designed to keep you connected and productive.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="space-y-24">
            {serviceCategories.map((category, idx) => (
              <div key={idx} className="space-y-12">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                  <div className="flex-1 space-y-8">
                    <div className="flex items-center gap-4 border-l-4 border-primary pl-6">
                      {category.icon}
                      <h2 className="text-3xl font-bold">{category.title}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.items.map((item, i) => (
                        <Card key={i} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-lg hidden md:block">
                    <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest">Happy Clients</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest">Projects Done</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest">Support Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
