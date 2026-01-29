import React from 'react';
import { Target, Eye, Heart, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About VedTech Services</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Empowering businesses and individuals with reliable, fast, and professional IT solutions since 2020.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 text-primary font-bold mb-4">
                  <Target className="h-6 w-6" />
                  <span>OUR MISSION</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Simplifying Technology for Everyone</h2>
                <p className="text-slate-600 leading-relaxed">
                  Our mission is to provide seamless, high-quality IT support and development services that allow our clients to focus on what they do best. We believe technology should be an enabler, not a hurdle.
                </p>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-primary font-bold mb-4">
                  <Eye className="h-6 w-6" />
                  <span>OUR VISION</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">To be the Most Trusted IT Partner</h2>
                <p className="text-slate-600 leading-relaxed">
                  We envision a world where every small business and household has access to elite-level technical support. We aim to be the first name people think of when they face an IT challenge.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src="https://miaoda-site-img.s3cdn.medo.dev/images/KLing_81c94b3f-98d2-474e-93f2-ac5ecb11b096.jpg" alt="Our Team Consultation" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-slate-600">The principles that guide our every action.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="h-10 w-10 text-primary" />,
                title: "Customer First",
                description: "We listen to your needs and tailor our solutions to provide the best possible outcome for you."
              },
              {
                icon: <ShieldCheck className="h-10 w-10 text-primary" />,
                title: "Integrity & Trust",
                description: "We provide honest advice and transparent pricing. No unnecessary repairs or hidden fees."
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Excellence in Service",
                description: "We take pride in our work and strive for perfection in every repair and every line of code."
              }
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Zap = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 14.71 10.5 3h1.5l-2.5 8h7l-6.5 10h-1.5l2.5-8z" />
  </svg>
);

export default About;
