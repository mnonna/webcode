import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type SectionSpacing =
  | 'section-y'
  | 'section-y-big'
  | 'section-bottom-story'
  | 'section-bottom-contact';

const paddingTopClasses: Record<SectionSpacing, string> = {
  'section-y': 'pt-section-y',
  'section-y-big': 'pt-section-y-big',
  'section-bottom-story': 'pt-section-bottom-story',
  'section-bottom-contact': 'pt-section-bottom-contact',
};

const paddingBottomClasses: Record<SectionSpacing, string> = {
  'section-y': 'pb-section-y',
  'section-y-big': 'pb-section-y-big',
  'section-bottom-story': 'pb-section-bottom-story',
  'section-bottom-contact': 'pb-section-bottom-contact',
};

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  paddingTop?: SectionSpacing | null;
  paddingBottom?: SectionSpacing | null;
};

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, paddingTop, paddingBottom, ...props }, ref) => (
    <section
      ref={ref}
      className={twMerge(
        'py-section-y',
        className,
        paddingTop ? paddingTopClasses[paddingTop] : undefined,
        paddingBottom ? paddingBottomClasses[paddingBottom] : undefined,
      )}
      {...props}
    />
  ),
);

Section.displayName = 'Section';

export default Section;
