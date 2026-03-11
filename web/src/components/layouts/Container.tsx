import { cn } from '@/lib/utils';
import type React from 'react';

type ContainerProps = React.ComponentProps<'div'> & {
  as?: React.ElementType;
};

export const Container = ({ as, children, className, ...props }: ContainerProps) => {
  const Comp = as ?? 'div';

  return (
    <Comp className={cn('container mx-auto max-w-[1440px] px-8', className)} {...props}>
      {children}
    </Comp>
  );
};
