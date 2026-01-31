import React from 'react';
import { 
  Globe, Laptop, Shield, Code, Smartphone, Cloud, 
  Wrench, Printer, Network, Headset, Server, Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const serviceCategories = [
  {
    title: "Software & Digital Services",
    subtitle: "Custom development solutions for modern businesses",
    icon: <Code className="h-10 w-10 text-white" />,
    color: "from-blue-600 to-blue-700",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_c95ab538-0bed-4ce9-89ab-927f348c0c01.jpg",
    items: [
      { 
        icon: <Globe className="h-6 w-6 text-primary" />,
        name: "Website Design & Development", 
        desc: "Responsive, SEO-optimized websites built with modern technologies. E-commerce, corporate sites, and custom web portals." 
      },
      { 
        icon: <Code className="h-6 w-6 text-primary" />,
        name: "Web Applications", 
        desc: "Custom web-based business applications, dashboards, CRM systems, and management tools tailored to your workflow." 
      },
      { 
        icon: <Smartphone className="h-6 w-6 text-primary" />,
        name: "Mobile App Development", 
        desc: "Native iOS and Android apps, cross-platform solutions using React Native and Flutter for maximum reach." 
      },
      { 
        icon: <Server className="h-6 w-6 text-primary" />,
        name: "Custom Software Development", 
        desc: "Enterprise software solutions, automation tools, and bespoke applications designed for your specific business needs." 
      },
      { 
        icon: <Cloud className="h-6 w-6 text-primary" />,
        name: "Cloud Solutions & Migration", 
        desc: "Cloud infrastructure setup, migration services, AWS/Azure/Google Cloud deployment, and ongoing management." 
      },
      { 
        icon: <Wrench className="h-6 w-6 text-primary" />,
        name: "Software Maintenance & Support", 
        desc: "Bug fixes, updates, performance optimization, and ongoing technical support for your existing software." 
      }
    ]
  },
  {
    title: "Hardware & Infrastructure Services",
    subtitle: "Complete hardware solutions and IT infrastructure setup",
    icon: <Laptop className="h-10 w-10 text-white" />,
    color: "from-slate-700 to-slate-800",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d19bfcb7-b08f-4153-8d6b-3a56b1c14bac.jpg",
    items: [
      { 
        icon: <Laptop className="h-6 w-6 text-primary" />,
        name: "Computer & Laptop Repair", 
        desc: "Expert diagnosis and repair for all brands. Screen replacement, motherboard repair, data recovery, and component replacement." 
      },
      { 
        icon: <Printer className="h-6 w-6 text-primary" />,
        name: "Printer / Scanner / CCTV Setup", 
        desc: "Installation, configuration, and troubleshooting of office peripherals and surveillance systems." 
      },
      { 
        icon: <Network className="h-6 w-6 text-primary" />,
        name: "Networking Solutions", 
        desc: "LAN/WAN setup, Wi-Fi installation, router configuration, firewall setup, and network security implementation." 
      },
      { 
        icon: <Server className="h-6 w-6 text-primary" />,
        name: "Hardware Upgrades", 
        desc: "RAM upgrades, SSD installation, storage expansion, graphics card upgrades, and performance enhancement." 
      },
      { 
        icon: <Wrench className="h-6 w-6 text-primary" />,
        name: "Office IT Infrastructure Setup", 
        desc: "Complete office IT setup including workstations, servers, networking, and peripheral devices." 
      },
      { 
        icon: <Lock className="h-6 w-6 text-primary" />,
        name: "Data Backup & Recovery", 
        desc: "Automated backup solutions, disaster recovery planning, and data retrieval services." 
      }
    ]
  },
  {
    title: "IT Support & Customer Service",
    subtitle: "Dedicated support for uninterrupted business operations",
    icon: <Shield className="h-10 w-10 text-white" />,
    color: "from-green-600 to-green-700",
    image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_ce948713-fa41-4162-85c8-050fd5732e4d.jpg",
    items: [
      { 
        icon: <Headset className="h-6 w-6 text-primary" />,
        name: "24/7 IT Helpdesk", 
        desc: "Round-the-clock technical support via phone, email, and remote access. Dedicated support team for your business." 
      },
      { 
        icon: <Shield className="h-6 w-6 text-primary" />,
        name: "Annual Maintenance Contract (AMC)", 
        desc: "Comprehensive maintenance plans with regular checkups, priority support, and discounted rates on services." 
      },
      { 
        icon: <Server className="h-6 w-6 text-primary" />,
        name: "Remote Technical Support", 
        desc: "Instant remote assistance for software issues, configuration problems, and troubleshooting without site visits." 
      },
      { 
        icon: <Wrench className="h-6 w-6 text-primary" />,
        name: "On-site IT Support", 
        desc: "Technician visits for hardware repairs, installations, and complex issues requiring physical presence." 
      },
      { 
        icon: <Network className="h-6 w-6 text-primary" />,
        name: "Business IT Management", 
        desc: "Complete IT infrastructure management, vendor coordination, and technology consulting for growing businesses." 
      },
      { 
        icon: <Lock className="h-6 w-6 text-primary" />,
        name: "Cybersecurity Services", 
        desc: "Security audits, antivirus deployment, firewall configuration, and employee security training." 
      }
    ]
  }
];

const Services: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our IT Services</h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-xl leading-relaxed">
            Comprehensive technology solutions designed to power your business. From software development 
            to hardware maintenance, we provide everything you need under one roof.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="space-y-32">
            {serviceCategories.map((category, idx) => (
              <div key={idx} className="space-y-12">
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${category.color} text-white rounded-3xl p-12 md:p-16`}>
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="bg-white/20 p-6 rounded-2xl backdrop-blur-sm">
                      {category.icon}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-3xl md:text-4xl font-bold mb-3">{category.title}</h2>
                      <p className="text-lg text-white/90">{category.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Services List */}
                <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-6">
                  {category.items.map((item, i) => (
                    <Card key={i} className="border-2 border-transparent hover:border-primary hover:shadow-xl transition-all group">
                      <CardHeader>
                        <div className="mb-4 group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <CardTitle className="text-lg font-bold leading-tight">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
              <p className="text-slate-600 text-lg">Our streamlined process ensures fast, efficient service delivery</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Contact Us", desc: "Call, email, or raise a ticket" },
                { step: "02", title: "Assessment", desc: "We analyze your requirements" },
                { step: "03", title: "Solution", desc: "Expert team resolves the issue" },
                { step: "04", title: "Follow-up", desc: "Ensure complete satisfaction" }
              ].map((item, i) => (
                <div key={i} className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-white text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest">Happy Clients</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">5000+</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest">Projects Done</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest">Support Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Need a Custom Solution?</h2>
            <p className="text-slate-600 text-lg">
              Don't see exactly what you're looking for? We specialize in creating custom IT solutions 
              tailored to your unique business requirements.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/support">Raise a Ticket</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
