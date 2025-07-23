import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { Spinner } from '@/components';
import { Layout } from '@/layout';
import { routes } from '@/routes'
import PageNotFound from '@/pages/PageNotFound';

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get('redirect');
    if (redirectTo) {
      navigate(redirectTo, { replace: true });
    }
  }, []);

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    const matchedRoute = routes.find(r => r.path === `/${path}`);
    const title = matchedRoute?.title ? `${matchedRoute.title}` : 'ARIA Lab';
    document.title = `${title} | Align Robust Interactive Autonomy Lab`;
  }, [location]);

  return (
    <Suspense fallback={
      <div className="h-screen w-screen flex items-center justify-center">
        <Spinner />
      </div>
    }>
      <Routes>
        <Route element={<Layout />}>
          {routes.map(({ path, element: Element }, index) => (
            <Route
              key={`main-${index}`}
              path={path}
              element={<Element />} />
          ))}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
