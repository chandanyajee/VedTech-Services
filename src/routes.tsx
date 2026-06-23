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
import BlogDetail from './pages/BlogDetail';
import Demo from './pages/Demo';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminTickets from './pages/AdminTickets';
import AdminSettings from './pages/AdminSettings';
import EngineerManagement from './pages/EngineerManagement';
import AMCPlans from './pages/AMCPlans';
import CustomerDashboard from './pages/CustomerDashboard';
import EngineerDashboard from './pages/EngineerDashboard';
import AdminManagement from './pages/AdminManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeSignup from './pages/EmployeeSignup';
import ActivityLogs from './pages/ActivityLogs';
import AccountSettings from './pages/AccountSettings';
import AdminAuditLogs from './pages/AdminAuditLogs';
import AdminPerformance from './pages/AdminPerformance';
import AdminInventory from './pages/AdminInventory';
import AdminBilling from './pages/AdminBilling';
import AdminChatEscalations from './pages/AdminChatEscalations';
import AdminKnowledgeBase from './pages/AdminKnowledgeBase';
import AdminCronMonitor from './pages/AdminCronMonitor';
import AdminOffices from './pages/AdminOffices';
import AdminEmailTemplateSettings from './pages/AdminEmailTemplateSettings';
import EmployeePerformanceDashboard from './pages/EmployeePerformanceDashboard';
import EmailAnalyticsDashboard from './pages/EmailAnalyticsDashboard';
import CustomerFeedbackDashboard from './pages/CustomerFeedbackDashboard';
import NotificationCenter from './pages/NotificationCenter';
import CRMDashboard from './pages/CRMDashboard';
import LeadManagement from './pages/LeadManagement';
import LeadDetail from './pages/LeadDetail';
import SalesPipeline from './pages/SalesPipeline';
import CustomerDetail from './pages/CustomerDetail';
import EmailCampaigns from './pages/EmailCampaigns';
import CallLogs from './pages/CallLogs';
import MeetingScheduler from './pages/MeetingScheduler';
import TaskManagement from './pages/TaskManagement';
import CRMAdvancedReporting from './pages/CRMAdvancedReporting';
import CRMAnalyticsDashboard from './pages/CRMAnalyticsDashboard';
import CustomerSegmentation from './pages/CustomerSegmentation';
import CustomerFeedbackSurveys from './pages/CustomerFeedbackSurveys';
import CustomerReportsAnalytics from './pages/CustomerReportsAnalytics';
import CRMAuditLogs from './pages/CRMAuditLogs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
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
    name: 'Privacy Policy',
    path: '/privacy',
    element: <PrivacyPolicy />,
    visible: false
  },
  {
    name: 'Terms of Service',
    path: '/terms',
    element: <TermsOfService />,
    visible: false
  },
  {
    name: 'Blog',
    path: '/blog',
    element: <Blog />
  },
  {
    name: 'Blog Detail',
    path: '/blog/:id',
    element: <BlogDetail />,
    visible: false
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
    name: 'Manage Admins',
    path: '/admin/manage',
    element: <AdminManagement />,
    visible: false
  },
  {
    name: 'Manage Team',
    path: '/admin/team',
    element: <EmployeeManagement />,
    visible: false
  },
  {
    name: 'Employee Registration',
    path: '/employee/signup',
    element: <EmployeeSignup />,
    visible: false
  },
  {
    name: 'Engineer Management',
    path: '/admin/engineers',
    element: <EngineerManagement />,
    visible: false
  },
  {
    name: 'Employee Login',
    path: '/employee/login',
    element: <EmployeeLogin />,
    visible: false
  },
  {
    name: 'Engineer Dashboard',
    path: '/engineer/dashboard',
    element: <EngineerDashboard />,
    visible: false
  },
  {
    name: 'Account Settings',
    path: '/settings',
    element: <AccountSettings />,
    visible: false
  },
  {
    name: 'Activity Logs',
    path: '/admin/logs',
    element: <ActivityLogs />,
    visible: false
  },
  {
    name: 'Security Audit Logs',
    path: '/admin/audit-logs',
    element: <AdminAuditLogs />,
    visible: false
  },
  {
    name: 'Performance Analytics',
    path: '/admin/performance',
    element: <AdminPerformance />,
    visible: false
  },
  {
    name: 'Inventory Management',
    path: '/admin/inventory',
    element: <AdminInventory />,
    visible: false
  },
  {
    name: 'Billing Management',
    path: '/admin/billing',
    element: <AdminBilling />,
    visible: false
  },
  {
    name: 'Chatbot Escalations',
    path: '/admin/chatbot-escalations',
    element: <AdminChatEscalations />,
    visible: false
  },
  {
    name: 'Knowledge Base Management',
    path: '/admin/knowledge-base',
    element: <AdminKnowledgeBase />,
    visible: false
  },
  {
    name: 'Cron Job Monitor',
    path: '/admin/cron-monitor',
    element: <AdminCronMonitor />,
    visible: false
  },
  {
    name: 'Office & Branch Console',
    path: '/admin/offices',
    element: <AdminOffices />,
    visible: false
  },
  {
    name: 'Email Template Settings',
    path: '/admin/email-template-settings',
    element: <AdminEmailTemplateSettings />,
    visible: false
  },
  {
    name: 'Employee Performance',
    path: '/admin/employee-performance',
    element: <EmployeePerformanceDashboard />,
    visible: false
  },
  {
    name: 'Email Analytics',
    path: '/admin/email-analytics',
    element: <EmailAnalyticsDashboard />,
    visible: false
  },
  {
    name: 'Customer Feedback',
    path: '/admin/customer-feedback',
    element: <CustomerFeedbackDashboard />,
    visible: false
  },
  {
    name: 'Notifications',
    path: '/admin/notifications',
    element: <NotificationCenter />,
    visible: false
  },
  {
    name: 'CRM Dashboard',
    path: '/admin/crm',
    element: <CRMDashboard />,
    visible: false
  },
  {
    name: 'Lead Management',
    path: '/admin/crm/leads',
    element: <LeadManagement />,
    visible: false
  },
  {
    name: 'Lead Detail',
    path: '/admin/crm/leads/:id',
    element: <LeadDetail />,
    visible: false
  },
  {
    name: 'Sales Pipeline',
    path: '/admin/crm/pipeline',
    element: <SalesPipeline />,
    visible: false
  },
  {
    name: 'Customer Detail',
    path: '/admin/crm/customers/:id',
    element: <CustomerDetail />,
    visible: false
  },
  {
    name: 'Email Campaigns',
    path: '/admin/crm/campaigns',
    element: <EmailCampaigns />,
    visible: false
  },
  {
    name: 'Call Logs',
    path: '/admin/crm/calls',
    element: <CallLogs />,
    visible: false
  },
  {
    name: 'Meeting Scheduler',
    path: '/admin/crm/meetings',
    element: <MeetingScheduler />,
    visible: false
  },
  {
    name: 'Task Management',
    path: '/admin/crm/tasks',
    element: <TaskManagement />,
    visible: false
  },
  {
    name: 'CRM Advanced Reporting',
    path: '/admin/crm/reports',
    element: <CRMAdvancedReporting />,
    visible: false
  },
  {
    name: 'CRM Analytics Dashboard',
    path: '/admin/crm/analytics',
    element: <CRMAnalyticsDashboard />,
    visible: false
  },
  {
    name: 'Customer Segmentation',
    path: '/admin/crm/segments',
    element: <CustomerSegmentation />,
    visible: false
  },
  {
    name: 'Customer Feedback & Surveys',
    path: '/admin/crm/feedback',
    element: <CustomerFeedbackSurveys />,
    visible: false
  },
  {
    name: 'Customer Reports & Analytics',
    path: '/admin/crm/customer-reports',
    element: <CustomerReportsAnalytics />,
    visible: false
  },
  {
    name: 'CRM Audit Logs',
    path: '/admin/crm/audit-logs',
    element: <CRMAuditLogs />,
    visible: false
  }
];

export default routes;
