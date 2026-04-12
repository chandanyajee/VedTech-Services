import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import SoftwareServices from './pages/SoftwareServices';
import HardwareServices from './pages/HardwareServices';
import ITSupportServices from './pages/ITSupportServices';
import WebDevelopment from './pages/WebDevelopment';
import MobileAppDevelopment from './pages/MobileAppDevelopment';
import HardwareRepair from './pages/HardwareRepair';
import NetworkingSolutions from './pages/NetworkingSolutions';
import Industries from './pages/Industries';
import EducationalInstitutions from './pages/EducationalInstitutions';
import CorporateOffices from './pages/CorporateOffices';
import RetailShops from './pages/RetailShops';
import Healthcare from './pages/Healthcare';
import Manufacturing from './pages/Manufacturing';
import StartupsSMEs from './pages/StartupsSMEs';
import WhyUs from './pages/WhyUs';
import Support from './pages/Support';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Demo from './pages/Demo';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminTickets from './pages/AdminTickets';
import AdminSettings from './pages/AdminSettings';
import EngineerManagement from './pages/EngineerManagement';
import AMCPlans from './pages/AMCPlans';
import CustomerDashboard from './pages/CustomerDashboard';
import EngineerDashboard from './pages/EngineerDashboard';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'About',
    path: '/about',
    element: <About />
  },
  {
    name: 'Services',
    path: '/services',
    element: <Services />
  },
  {
    name: 'Software Services',
    path: '/services/software',
    element: <SoftwareServices />,
    visible: false
  },
  {
    name: 'Hardware Services',
    path: '/services/hardware',
    element: <HardwareServices />,
    visible: false
  },
  {
    name: 'IT Support Services',
    path: '/services/it-support',
    element: <ITSupportServices />,
    visible: false
  },
  {
    name: 'Web Development',
    path: '/services/web-development',
    element: <WebDevelopment />,
    visible: false
  },
  {
    name: 'Mobile App Development',
    path: '/services/mobile-app-development',
    element: <MobileAppDevelopment />,
    visible: false
  },
  {
    name: 'Hardware Repair',
    path: '/services/hardware-repair',
    element: <HardwareRepair />,
    visible: false
  },
  {
    name: 'Networking Solutions',
    path: '/services/networking-solutions',
    element: <NetworkingSolutions />,
    visible: false
  },
  {
    name: 'Industries',
    path: '/industries',
    element: <Industries />
  },
  {
    name: 'Educational Institutions',
    path: '/industries/educational-institutions',
    element: <EducationalInstitutions />,
    visible: false
  },
  {
    name: 'Corporate Offices',
    path: '/industries/corporate-offices',
    element: <CorporateOffices />,
    visible: false
  },
  {
    name: 'Retail & Shops',
    path: '/industries/retail-shops',
    element: <RetailShops />,
    visible: false
  },
  {
    name: 'Startups & SMEs',
    path: '/industries/startups-smes',
    element: <StartupsSMEs />,
    visible: false
  },
  {
    name: 'Healthcare',
    path: '/industries/healthcare',
    element: <Healthcare />,
    visible: false
  },
  {
    name: 'Manufacturing',
    path: '/industries/manufacturing',
    element: <Manufacturing />,
    visible: false
  },
  {
    name: 'Why Us',
    path: '/why-us',
    element: <WhyUs />
  },
  {
    name: 'AMC Plans',
    path: '/amc-plans',
    element: <AMCPlans />
  },
  {
    name: 'Support',
    path: '/support',
    element: <Support />
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />
  },
  {
    name: 'Blog',
    path: '/blog',
    element: <Blog />
  },
  {
    name: 'Demo',
    path: '/demo',
    element: <Demo />
  },
  {
    name: 'My Dashboard',
    path: '/dashboard',
    element: <CustomerDashboard />
  },
  {
    name: 'Admin Login',
    path: '/admin/login',
    element: <AdminLogin />,
    visible: false
  },
  {
    name: 'Admin Dashboard',
    path: '/admin/dashboard',
    element: <AdminDashboard />,
    visible: false
  },
  {
    name: 'Admin Tickets',
    path: '/admin/tickets',
    element: <AdminTickets />,
    visible: false
  },
  {
    name: 'Admin Settings',
    path: '/admin/settings',
    element: <AdminSettings />,
    visible: false
  },
  {
    name: 'Engineer Management',
    path: '/admin/engineers',
    element: <EngineerManagement />,
    visible: false
  },
  {
    name: 'Engineer Dashboard',
    path: '/engineer/dashboard',
    element: <EngineerDashboard />,
    visible: false
  }
];

export default routes;
