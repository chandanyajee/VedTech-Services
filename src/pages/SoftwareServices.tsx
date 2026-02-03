import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Code, Smartphone, Cloud, Database, Palette, ShoppingCart, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SoftwareServices: React.FC = () => {
  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Website Development",
      description: "Professional, responsive websites that drive business growth",
      features: [
        "Custom Website Design",
        "E-commerce Websites",
        "Corporate Websites",
        "Portfolio Websites",
        "Landing Pages",
        "CMS Integration"
      ],
      technologies: ["React", "WordPress", "PHP", "HTML5/CSS3"]
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications",
      features: [
        "Android App Development",
        "iOS App Development",
        "Cross-platform Apps",
        "App UI/UX Design",
        "App Store Deployment",
        "App Maintenance"
      ],
      technologies: ["React Native", "Flutter", "Android", "iOS"]
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Custom Software Development",
      description: "Tailored software solutions for your unique business needs",
      features: [
        "Business Management Software",
        "Inventory Management",
        "CRM Systems",
        "ERP Solutions",
        "Billing Software",
        "Custom Applications"
      ],
      technologies: ["Java", "Python", ".NET", "Node.js"]
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services",
      features: [
        "Cloud Migration",
        "Cloud Hosting",
        "Cloud Storage",
        "Cloud Backup",
        "SaaS Solutions",
        "Cloud Security"
      ],
      technologies: ["AWS", "Azure", "Google Cloud", "DigitalOcean"]
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Database Management",
      description: "Robust database design, optimization, and maintenance",
      features: [
        "Database Design",
        "Database Migration",
        "Performance Optimization",
        "Data Backup & Recovery",
        "Database Security",
        "Data Analytics"
      ],
      technologies: ["MySQL", "PostgreSQL", "MongoDB", "SQL Server"]
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "UI/UX Design",
      description: "Beautiful, user-friendly interfaces that enhance user experience",
      features: [
        "User Interface Design",
        "User Experience Design",
        "Wireframing & Prototyping",
        "Design Systems",
        "Responsive Design",
        "Usability Testing"
      ],
      technologies: ["Figma", "Adobe XD", "Sketch", "InVision"]
    }
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      category: "Web Development",
      description: "Full-featured online store with payment gateway integration",
      results: ["50% increase in sales", "10,000+ monthly visitors", "Mobile-responsive design"]
    },
    {
      title: "School Management System",
      category: "Custom Software",
      description: "Complete ERP solution for educational institutions",
      results: ["500+ students managed", "Automated fee collection", "Parent-teacher portal"]
    },
    {
      title: "Restaurant Mobile App",
      category: "Mobile Development",
      description: "Food ordering and delivery app with real-time tracking",
      results: ["5000+ downloads", "4.8★ rating", "30% faster orders"]
    }
  ];

  const process = [
    { step: "1", title: "Discovery", description: "Understanding your requirements and goals" },
    { step: "2", title: "Planning", description: "Creating detailed project roadmap and timeline" },
    { step: "3", title: "Design", description: "Crafting beautiful and functional designs" },
    { step: "4", title: "Development", description: "Building your solution with best practices" },
    { step: "5", title: "Testing", description: "Rigorous quality assurance and bug fixing" },
    { step: "6", title: "Deployment", description: "Launching your solution to production" },
    { step: "7", title: "Support", description: "Ongoing maintenance and updates" }
  ];

  return (
    <>
      <Helmet>
        <title>Software & Digital Services | Web Development, Mobile Apps | VedTech Services</title>
        <meta name="description" content="Professional software development services including website development, mobile apps, custom software, cloud solutions, and UI/UX design. Expert developers in India." />
        <meta name="keywords" content="software development, web development, mobile app development, custom software, cloud solutions, UI/UX design, website design, e-commerce development, VedTech Services" />
        <link rel="canonical" href="https://vedtechservices.com/services/software" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Software & Digital Services | VedTech Services" />
        <meta property="og:description" content="Professional software development services including website development, mobile apps, custom software, and cloud solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vedtechservices.com/services/software" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Software Development Services",
            "provider": {
              "@type": "Organization",
              "name": "VedTech Services"
            },
            "areaServed": "India",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Software Services",
              "itemListElement": services.map(service => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.title,
                  "description": service.description
                }
              }))
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
                Software & Digital Services
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
                Transform Your Business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Custom Software Solutions</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                From stunning websites to powerful mobile apps and enterprise software, we deliver digital solutions that drive growth and innovation.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/contact">Start Your Project</Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
                  <Link to="/support">Request a Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Software Services</h2>
              <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                Comprehensive software development services to meet all your digital needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <h4 className="font-semibold mb-2 text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
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
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Recent Projects</h2>
              <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                See how we've helped businesses succeed with our software solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <Badge className="w-fit mb-2">{project.category}</Badge>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600">{project.description}</p>
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

        {/* Development Process */}
        <section className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Development Process</h2>
              <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                A proven methodology that ensures quality and timely delivery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <div key={index} className="relative">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                        {item.step}
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                  {index < process.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-primary h-6 w-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Technologies We Use</h2>
              <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                Cutting-edge technologies for modern software solutions
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                "React", "Node.js", "Python", "Java", "PHP", "WordPress",
                "React Native", "Flutter", "Android", "iOS", "AWS", "Azure",
                "MySQL", "MongoDB", "PostgreSQL", "Firebase", "Docker", "Git"
              ].map((tech, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <p className="font-semibold">{tech}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-blue-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Build Your Software Solution?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss your project requirements and create something amazing together
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link to="/contact">Get Started Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link to="/support">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SoftwareServices;
