import React from 'react';
import { ExternalLink, Code, Smartphone, Globe, ShoppingCart, GraduationCap, Dumbbell, Building2, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageMeta from '@/components/common/PageMeta';

const Demo: React.FC = () => {
  const demos = [
    {
      id: 1,
      name: "VedTech Services",
      category: "Company Website",
      description: "Professional IT services company website with modern design, service showcase, and client testimonials. Built with React, TypeScript, and Tailwind CSS.",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d19bfcb7-b08f-4153-8d6b-3a56b1c14bac.jpg",
      link: "https://vedtechservices.in/",
      tech: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI"],
      icon: Globe,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "VedArambh Sanatan Initiative",
      category: "Online Gurukul Platform",
      description: "Comprehensive online learning platform for Vedic education with course management, student enrollment, and interactive learning modules.",
      image: "https://miaoda-conversation-file.s3cdn.medo.dev/user-8t7j0johoxds/conv-99gjdx4fbuv4/20260402/file-aojgukmrw0zk.png",
      link: "https://vedarambhin.vercel.app/",
      tech: ["Next.js", "React", "MongoDB", "Node.js"],
      features: ["Course Management", "Student Portal", "Payment Integration", "Admin Dashboard"],
      icon: GraduationCap,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "VedArambh Mart",
      category: "E-commerce Platform",
      description: "Full-featured e-commerce platform with product catalog, shopping cart, payment gateway integration, and order management system.",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d19bfcb7-b08f-4153-8d6b-3a56b1c14bac.jpg",
      link: "https://app-9gbc95t8hhq9.appmedo.com",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      features: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Order Tracking"],
      icon: ShoppingCart,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "Guru Shishya Public School",
      category: "School Management System",
      description: "Complete school management solution with student information system, attendance tracking, grade management, and parent portal.",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_81c94b3f-98d2-474e-93f2-ac5ecb11b096.jpg",
      link: "https://app-9d204bkggf0h.appmedo.com",
      tech: ["React", "Supabase", "TypeScript", "Tailwind"],
      features: ["Student Management", "Attendance System", "Grade Tracking", "Parent Portal"],
      icon: GraduationCap,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      name: "VED FITNESS",
      category: "Gym Management System",
      description: "Modern gym management platform with membership management, workout tracking, payment processing, and trainer scheduling.",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_d19bfcb7-b08f-4153-8d6b-3a56b1c14bac.jpg",
      link: "https://app-9j7xgqljr6dd.appmedo.com",
      tech: ["React", "Firebase", "Tailwind", "Chart.js"],
      features: ["Membership Management", "Workout Tracking", "Payment System", "Trainer Portal"],
      icon: Dumbbell,
      color: "from-red-500 to-pink-500"
    },
    {
      id: 6,
      name: "VedArambh Group",
      category: "Corporate Website",
      description: "Professional corporate website showcasing company services, portfolio, team members, and client testimonials with modern design.",
      image: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_81c94b3f-98d2-474e-93f2-ac5ecb11b096.jpg",
      link: "https://app-82srpbr0v9xd.appmedo.com/",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
      features: ["Portfolio Showcase", "Team Section", "Service Pages", "Contact Forms"],
      icon: Building2,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <>
      <PageMeta 
        title="Live Project Demos - VedTech Services Portfolio | Website & App Examples"
        description="Explore live demos of websites and applications built by VedTech Services. See our work in action - from e-commerce platforms to school management systems."
      />
      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float-delayed" />
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border-blue-400/30">
                <Code className="h-3 w-3 mr-1" />
                Live Projects
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Project Demos</h1>
              <p className="text-slate-300 text-lg">
                Explore live examples of websites and applications we've built for our clients. Click on any project to see it in action.
              </p>
              <div className="flex items-center justify-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">100+</div>
                  <div className="text-sm text-slate-400">Projects Delivered</div>
                </div>
                <div className="h-12 w-px bg-slate-700" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">50+</div>
                  <div className="text-sm text-slate-400">Happy Clients</div>
                </div>
                <div className="h-12 w-px bg-slate-700" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">98%</div>
                  <div className="text-sm text-slate-400">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Projects Grid */}
        <section className="py-20 md:py-32 bg-slate-50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {demos.map((demo) => (
                <Card key={demo.id} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-primary/30">
                  <div className="relative aspect-video overflow-hidden bg-slate-200">
                    <img 
                      src={demo.image} 
                      alt={demo.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4">
                      <Badge className={`bg-gradient-to-r ${demo.color} text-white border-0`}>
                        <demo.icon className="h-3 w-3 mr-1" />
                        {demo.category}
                      </Badge>
                    </div>
                    <a 
                      href={demo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <Button size="lg" variant="secondary" className="gap-2 shadow-xl">
                        <ExternalLink className="h-5 w-5" />
                        View Live Demo
                      </Button>
                    </a>
                  </div>
                  
                  <CardContent className="p-6 md:p-8 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3
                        className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                        {demo.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed">{demo.description}</p>
                    
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-3">Key Features:</div>
                      <div className="grid grid-cols-2 gap-2">
                        {demo.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-slate-700 mb-3">Technologies Used:</div>
                      <div className="flex flex-wrap gap-2">
                        {demo.tech.map((tech, i) => (
                          <Badge key={i} variant="outline" className="bg-slate-50">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      asChild 
                      className="w-full mt-4 group-hover:scale-105 transition-transform duration-300"
                    >
                      <a href={demo.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open Live Demo
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-blue-600 to-primary text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Project?</h2>
              <p className="text-blue-100 text-lg">
                Let's build something amazing together. Get a free consultation and see how we can help transform your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                  <a href="/contact">
                    Get Free Consultation
                  </a>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-green-600 hover:bg-green-700 text-white"
                >
                  <a href="https://wa.me/917858971869?text=Hi%2C%20I%20want%20to%20discuss%20a%20project" target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Demo;
