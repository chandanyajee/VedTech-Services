import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import { PageLoader } from '@/components/common/Loader';

import routes from './routes';

import { Toaster } from '@/components/ui/toaster';
import MainLayout from '@/components/layouts/MainLayout';

export default function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial application setup or data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Router>
      <IntersectObserver />
      <React.Suspense fallback={<PageLoader />}>
        <MainLayout>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </React.Suspense>
      <Toaster />
    </Router>
  );
}
