import { Footer } from '@/components/layouts';
import { Navbar } from '@/components/layouts/Navbar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_landing')({
  component: LandingLayout,
});

function LandingLayout() {
  return (
    <div className='relative'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
