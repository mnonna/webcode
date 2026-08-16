export type CmsButton = {
  id?: number;
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'text';
  external: boolean;
};

export type CmsMedia = {
  id: number;
  documentId?: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  url: string;
};

export type CmsIconText = {
  id?: number;
  key?: string | null;
  iconKey: string;
  title: string;
  description: string;
};

export type CmsFaqItem = {
  id?: number;
  question: string;
  answer: string;
};

type CmsBlockBase<TComponent extends string> = {
  id: number;
  __component: TComponent;
  anchor?: string | null;
  paddingTop?: import('@/src/components/common/Section').SectionSpacing | null;
  paddingBottom?: import('@/src/components/common/Section').SectionSpacing | null;
};

export type CmsHeroBlock = CmsBlockBase<'sections.hero'> & {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryButton: CmsButton;
  secondaryButton?: CmsButton | null;
  image: CmsMedia;
  imageAlternativeText: string;
  chips: Array<{
    id?: number;
    label: string;
    iconKey?: string | null;
    logo?: CmsMedia | null;
  }>;
  floatingCards: Array<{
    id?: number;
    title: string;
    subtitle: string;
    iconKey: string;
    tone: 'icon' | 'accent' | 'code';
  }>;
  highlights: CmsIconText[];
};

export type CmsAboutBlock = CmsBlockBase<'sections.about'> & {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  body: string;
  button: CmsButton;
  image: CmsMedia;
  imageAlternativeText: string;
};

export type CmsStoryBlock = CmsBlockBase<'sections.story'> & {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  previewImage: CmsMedia;
  previewAlternativeText: string;
  steps: CmsIconText[];
};

export type CmsCaseStudiesBlock = CmsBlockBase<'sections.case-studies'> & {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  featuredButton: CmsButton;
  itemLinkLabel: string;
  items: Array<{
    id?: number;
    category: string;
    title: string;
    description: string;
    desktopImage: CmsMedia;
    mobileImage: CmsMedia;
    alternativeText: string;
    tags: Array<{ id?: number; label: string }>;
    targetUrl?: string | null;
  }>;
};

export type CmsServicesBlock = CmsBlockBase<'sections.services'> & {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  linkLabel: string;
  items: Array<{
    id?: number;
    title: string;
    description: string;
    iconKey: string;
    href: string;
  }>;
};

export type CmsApproachBlock = CmsBlockBase<'sections.approach'> & {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  backgroundImage?: CmsMedia | null;
  primaryButton: CmsButton;
  secondaryButton: CmsButton;
  items: Array<{
    id?: number;
    iconKey: string;
    problemTitle: string;
    problemDescription: string;
    actions: Array<{ id?: number; text: string }>;
    result: string;
  }>;
};

export type CmsB2bBlock = CmsBlockBase<'sections.b2b'> & {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  comparison: {
    title: string;
    agencyLabel: string;
    agencySteps: Array<{ id?: number; text: string }>;
    directLabel: string;
    directSteps: Array<{ id?: number; text: string }>;
    stats: Array<{ id?: number; value: string; label: string }>;
  };
  benefits: CmsIconText[];
};

export type CmsProcessBlock = CmsBlockBase<'sections.process'> & {
  eyebrow: string;
  title: string;
  titleHighlight?: string | null;
  description: string;
  steps: CmsIconText[];
  footerNote?: string | null;
};

export type CmsFaqBlock = CmsBlockBase<'sections.faq'> & {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  items: CmsFaqItem[];
};

export type CmsTechnologiesBlock = CmsBlockBase<'sections.technologies'> & {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  titleAfter?: string | null;
  description: string;
  note?: string | null;
  items: Array<{
    id?: number;
    name: string;
    logo: CmsMedia;
    featured: boolean;
  }>;
};

export type CmsPartnersBlock = CmsBlockBase<'sections.partners'> & {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  items: Array<{
    id?: number;
    name: string;
    logo: CmsMedia;
    url: string;
  }>;
};

export type CmsContactBlock = CmsBlockBase<'sections.contact'> & {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  formTitle: string;
  formDescription: string;
  contactDetails: Array<{
    id?: number;
    iconKey: string;
    label: string;
    value: string;
    href?: string | null;
  }>;
};

export type CmsCtaBlock = CmsBlockBase<'sections.cta'> & {
  eyebrow?: string | null;
  title: string;
  titleHighlight?: string | null;
  description: string;
  button: CmsButton;
  image?: CmsMedia | null;
  imageAlternativeText?: string | null;
};

export type CmsPageBlock =
  | CmsHeroBlock
  | CmsAboutBlock
  | CmsStoryBlock
  | CmsCaseStudiesBlock
  | CmsServicesBlock
  | CmsApproachBlock
  | CmsB2bBlock
  | CmsProcessBlock
  | CmsFaqBlock
  | CmsTechnologiesBlock
  | CmsPartnersBlock
  | CmsContactBlock
  | CmsCtaBlock;

export type CmsPage = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  blocks: CmsPageBlock[];
  seo?: {
    metaTitle: string;
    metaDescription: string;
    canonicalPath?: string | null;
    noIndex: boolean;
    shareImage?: CmsMedia | null;
  } | null;
};
