/**
 * Router Configuration
 * Defines all routes for the Inferno Roasts application
 */

import { createBrowserRouter } from 'react-router';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { RoastDetail } from './pages/RoastDetail';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { Premium } from './pages/Premium';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';
import { Navigation } from './components/Navigation';
import { Toaster } from 'sonner';

// Layout wrapper with navigation
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(17, 17, 17, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
          },
        }}
      />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Landing />
      </Layout>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: '/roast/:id',
    element: (
      <Layout>
        <RoastDetail />
      </Layout>
    ),
  },
  {
    path: '/leaderboard',
    element: (
      <Layout>
        <Leaderboard />
      </Layout>
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: '/premium',
    element: (
      <Layout>
        <Premium />
      </Layout>
    ),
  },
  {
    path: '/admin',
    element: (
      <Layout>
        <Admin />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
]);
