import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import WhyUs from './pages/WhyUs';
import Support from './pages/Support';
import Contact from './pages/Contact';
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
    name: 'Support',
    path: '/support',
    element: <Support />
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />
  }
];

export default routes;
