import React from 'react';
import { Target, Eye, Heart, ShieldCheck, TrendingUp, Users, Award, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-4">
              <Award className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-semibold">Established 2020</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About VedTech Services</h1>
            <p className="text-slate-300 text-xl leading-relaxed">
              Building India's most trusted IT services company. We're on a mission to empower businesses 
              with world-class technology solutions and unparalleled customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Story</h2>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
              <p className="text-lg">
                VedTech Services was founded with a clear vision: to create a comprehensive IT services company 
                that businesses across India can rely on for all their technology needs. We recognized that most 
                businesses struggle with fragmented IT support – calling different vendors for hardware, software, 
                and networking issues.
              </p>
              <p className="text-lg">
                Our <strong>"One Call – Complete IT Solutions"</strong> model was born from this insight. Today, 
                we serve over 500 clients across multiple industries, providing everything from custom software 
                development to on-site hardware repairs, all backed by our 24/7 support team.
              </p>
              <p className="text-lg">
                What sets us apart is our commitment to building long-term relationships. We don't just fix problems; 
                we become your technology partner, helping you scale and grow with the right IT infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div>
                <div className="inline-flex items-center gap-3 text-primary font-bold mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Target className="h-6 w-6" />
                  </div>
                  <span className="text-xl">OUR MISSION</span>
                </div>
                <h2 className="text-3xl font-bold mb-6">Empowering Businesses Through Technology</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  To provide comprehensive, reliable, and affordable IT solutions that enable businesses to focus 
                  on their core operations while we handle their technology needs. We strive to be the single point 
                  of contact for all IT requirements, delivering fast service and expert solutions.
                </p>
              </div>
              <div>
                <div className="inline-flex items-center gap-3 text-primary font-bold mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Eye className="h-6 w-6" />
                  </div>
                  <span className="text-xl">OUR VISION</span>
                </div>
                <h2 className="text-3xl font-bold mb-6">India's Most Trusted IT Partner</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  To become the leading IT services company in India, known for excellence, reliability, and 
                  customer-first approach. We envision a future where every business, regardless of size, has 
                  access to enterprise-grade IT support and solutions.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_81c94b3f-98d2-474e-93f2-ac5ecb11b096.jpg" alt="Our Team Consultation" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              The principles that guide every decision we make and every service we deliver.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="h-10 w-10 text-primary" />,
                title: "Customer First",
                description: "Every decision we make starts with one question: How does this benefit our customers?"
              },
              {
                icon: <ShieldCheck className="h-10 w-10 text-primary" />,
                title: "Integrity & Trust",
                description: "Honest advice, transparent pricing, and ethical business practices in everything we do."
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Excellence",
                description: "We don't just meet expectations; we exceed them with quality service and expert solutions."
              },
              {
                icon: <TrendingUp className="h-10 w-10 text-primary" />,
                title: "Continuous Growth",
                description: "We invest in learning, technology, and innovation to serve you better every day."
              }
            ].map((value, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border-2 border-transparent hover:border-primary transition-all text-center">
                <div className="mb-6 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-24 bg-primary text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Makes Us Different</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Expert Team",
                  desc: "Certified professionals with 10+ years of industry experience"
                },
                {
                  icon: <ShieldCheck className="h-8 w-8" />,
                  title: "Comprehensive Services",
                  desc: "Hardware, software, and support – everything under one roof"
                },
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "Fast Response",
                  desc: "Same-day service for urgent issues, 24/7 support availability"
                }
              ].map((item, i) => (
                <div key={i} className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-blue-100">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Founder</h2>
              <p className="text-slate-600 text-lg">The visionary behind VedTech Services</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 space-y-6">
                <h3 className="text-3xl font-bold text-slate-900">Chandan Kumar Yajee</h3>
                <p className="text-lg text-primary font-semibold">Founder & CEO</p>
                <p className="text-slate-600 leading-relaxed">
                  With a passion for technology and a vision to make IT services accessible to businesses across India, 
                  Chandan Kumar Yajee founded VedTech Services in 2020. His commitment to excellence and customer satisfaction 
                  has been the driving force behind the company's rapid growth and success.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Under his leadership, VedTech Services has grown from a small startup to a trusted IT partner for over 500 
                  businesses, delivering comprehensive technology solutions with a focus on quality, reliability, and innovation.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <a 
                    href="https://www.linkedin.com/in/chandan-yajee" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://miaoda-conversation-file.s3cdn.medo.dev/user-8t7j0johoxds/conv-99gjdx4fbuv4/20260131/file-9b54bmiwix34.png" 
                    alt="Chandan Kumar Yajee - Founder of VedTech Services" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Journey */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Growth Journey</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { year: "2020", milestone: "Company Founded" },
                { year: "2021", milestone: "100+ Clients" },
                { year: "2023", milestone: "Pan-India Presence" },
                { year: "2026", milestone: "500+ Happy Clients" }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-3xl font-bold text-primary">{item.year}</div>
                  <div className="text-slate-700 font-medium">{item.milestone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
