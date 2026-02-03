import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import SoftwareServices from './pages/SoftwareServices';
import HardwareServices from './pages/HardwareServices';
import ITSupportServices from './pages/ITSupportServices';
import Industries from './pages/Industries';
import WhyUs from './pages/WhyUs';
import Support from './pages/Support';
import Contact from './pages/Contact';
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
    name: 'Industries',
    path: '/industries',
    element: <Industries />
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
