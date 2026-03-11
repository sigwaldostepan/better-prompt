import { Container } from './Container';

export const Footer = () => {
  return (
    <div className='border-t bg-background/50 backdrop-blur'>
      <Container className='py-4 space-y-1 text-center'>
        <p className='text-muted-foreground text-sm'>
          &copy; {new Date().getFullYear()} Better-Prompt. All rights reserved.
        </p>
        <p className='text-muted-foreground text-sm'>
          Made by{' '}
          <a
            href='https://github.com/sigwaldostepan'
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-foreground transition-colors'
          >
            sigwaldostepan
          </a>
        </p>
      </Container>
    </div>
  );
};
