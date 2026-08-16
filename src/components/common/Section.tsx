import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Section = forwardRef<HTMLElement, ComponentPropsWithoutRef<'section'>>(
  ({ className, ...props }, ref) => (
    <section
      ref={ref}
      className={twMerge('py-section-y', className)}
      {...props}
    />
  ),
);

Section.displayName = 'Section';

export default Section;
