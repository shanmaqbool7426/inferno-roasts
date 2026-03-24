/**
 * Inferno Roasts - Main App Component
 * A premium AI-powered roast generator with dark glassmorphic design
 */

import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <RouterProvider router={router} />
    </div>
  );
}
