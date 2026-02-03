import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Code, ShoppingCart, Palette, Rocket, CheckCircle2, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const WebDevelopment: React.FC = () => {
  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Corporate Websites",
      description: "Professional business websites that establish your online presence",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile Friendly", "Content Management", "Analytics Integration"]
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "E-commerce Development",
      description: "Complete online store solutions with payment gateway integration",
      features: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Order Management", "Inventory System", "Customer Accounts"]
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Custom Web Applications",
      description: "Tailored web applications for your specific business needs",
      features: ["Custom Features", "Database Integration", "User Management", "API Development", "Third-party Integration", "Scalable Architecture"]
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Website Redesign",
      description: "Modernize your existing website with fresh design and features",
      features: ["Modern UI/UX", "Performance Boost", "Mobile Optimization", "SEO Enhancement", "Content Migration", "Brand Refresh"]
    }
  ];

  const technologies = [
    "React", "Next.js", "Node.js", "WordPress", "PHP", "Laravel",
    "HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind CSS", "Bootstrap"
  ];

  const projects = [
    {
      title: "E-commerce Platform for Retail Store",
      category: "E-commerce",
      location: "Patna, Bihar",
      results: ["300+ Products", "50+ Daily Orders", "₹5L+ Monthly Revenue"]
    },
    {
      title: "Educational Institute Website",
      category: "Corporate",
      location: "Gaya, Bihar",
      results: ["10,000+ Visitors/Month", "Online Admissions", "Student Portal"]
    },
    {
      title: "Restaurant Booking System",
      category: "Web Application",
      location: "Muzaffarpur, Bihar",
      results: ["200+ Bookings/Month", "Online Menu", "Payment Integration"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Web Development Services in Bihar | Website Design Patna | VedTech Services</title>
        <meta name="description" content="Professional web development services in Bihar. Custom website design, e-commerce development, and web applications in Patna, Gaya, Muzaffarpur. Expert web developers in Bihar." />
        <meta name="keywords" content="web development Bihar, website design Patna, web development company Bihar, e-commerce development Bihar, website design Gaya, web developer Muzaffarpur, IT company Bihar, website development Patna" />
        <link rel="canonical" href="https://vedtechservices.com/services/web-development" />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "VedTech Services - Web Development",
            "description": "Professional web development services in Bihar",
            "areaServed": {
              "@type": "State",
              "name": "Bihar",
              "containsPlace": [
                {"@type": "City", "name": "Patna"},
                {"@type": "City", "name": "Gaya"},
                {"@type": "City", "name": "Muzaffarpur"},
                {"@type": "City", "name": "Bhagalpur"},
                {"@type": "City", "name": "Darbhanga"}
              ]
            },
            "serviceType": "Web Development",
            "provider": {
              "@type": "Organization",
              "name": "VedTech Services"
            }
          })}
        </script>
      </Helmet>

      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
          <div className="container relative z-10">
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-400/30">
                <Globe className="h-3 w-3 mr-2" />
                Web Development Services in Bihar
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
                Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Website Development</span> in Bihar
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Leading web development company in Bihar. We create stunning, responsive websites and powerful web applications for businesses in Patna, Gaya, Muzaffarpur, and across Bihar.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/contact">Start Your Project</Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
                  <Link to="/support">Get Free Quote</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 mt-8 text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span>Serving Bihar Since 2020</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span>100+ Websites Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span>Expert Bihar-based Team</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Web Development Services</h2>
              <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                Comprehensive website development solutions for businesses across Bihar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-primary">
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600">{service.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Features:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Work in Bihar</h2>
              <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                Successful web development projects delivered across Bihar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <Badge className="w-fit mb-2">{project.category}</Badge>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {project.location}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Results:</h4>
                      <ul className="space-y-1">
                        {project.results.map((result, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                            <Rocket className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Technologies We Use</h2>
              <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                Modern web technologies for powerful websites
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {technologies.map((tech, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <p className="font-semibold">{tech}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose VedTech for Web Development in Bihar?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <TrendingUp className="h-6 w-6" />,
                  title: "Local Expertise",
                  description: "Deep understanding of Bihar market and business needs"
                },
                {
                  icon: <Rocket className="h-6 w-6" />,
                  title: "Fast Delivery",
                  description: "Quick turnaround time with quality assurance"
                },
                {
                  icon: <Star className="h-6 w-6" />,
                  title: "Affordable Pricing",
                  description: "Competitive rates for Bihar businesses"
                }
              ].map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Serving All of Bihar</h2>
              <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                Professional web development services across Bihar
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                "Patna", "Gaya", "Muzaffarpur", "Bhagalpur",
                "Darbhanga", "Purnia", "Arrah", "Begusarai",
                "Katihar", "Munger", "Chapra", "Saharsa"
              ].map((city, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4 text-center">
                    <p className="font-semibold text-slate-700">{city}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-blue-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Build Your Website?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Get a professional website for your Bihar business. Contact us today for a free consultation!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link to="/contact">Get Started Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link to="/support">Request Free Quote</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WebDevelopment;
