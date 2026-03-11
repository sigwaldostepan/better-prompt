import { paths } from '@/config/paths';
import { Link } from '@tanstack/react-router';
import { Container } from './Container';
import { buttonVariants } from '../ui/button';

export const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 w-full h-16 z-50 bg-background/50 backdrop-blur border-b'>
      <Container className='flex items-center justify-between h-full space-x-2'>
        <Link to={paths.home} className='font-mono font-medium'>
          Better-Prompt
        </Link>
        <div className='flex items-center space-x-2'>
          <Link to={paths.auth.login} className={buttonVariants({ variant: 'secondary' })}>
            Log in
          </Link>
          <Link to={paths.app.index} className={buttonVariants({ variant: 'default' })}>
            Try Now
          </Link>
        </div>
      </Container>
    </nav>
  );
};
