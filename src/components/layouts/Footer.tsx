import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, MessageSquare } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <img
                src="https://miaoda-edit-image.s3cdn.medo.dev/99gjdx4fbuv5/IMG-9bb2mddb1ukg.png"
                alt="VedTech Services Logo"
                className="h-12 w-auto"
                data-editor-config="%7B%22defaultSrc%22%3A%22https%3A%2F%2Fmiaoda-edit-image.s3cdn.medo.dev%2F99gjdx4fbuv5%2FIMG-9bb2mddb1ukg.png%22%7D" />
            </div>
            <h3 className="text-xl font-bold text-white">VedTech Services</h3>
            <p className="text-sm leading-relaxed">{"Your one-stop solution for all IT hardware, software, and technical support needs. \"One Call – All IT Problems Solved\" Founder- Chandan Kumar Yajee"}</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="https://www.linkedin.com/in/chandan-yajee" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/why-us" className="hover:text-white transition-colors">Why Choose Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Web Development</li>
              <li>Mobile App Development</li>
              <li>Hardware Repair</li>
              <li>Networking Solutions</li>
              <li>IT Support & AMC</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>{"Visit us: Samastipur, Tech Hub, Bihar, India"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>{"Call: +91 7858971869 , +91 7370057723"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>{"Email: vedtechservicess@gmail.com."}</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-green-500 shrink-0" />
                <span>{"WhatsApp: +91 7858971869 ,7370057723"}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          <p>© 2026 VedTech Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
