export type CmsNavigationLink = {
  id?: number;
  label: string;
  href: string;
  external: boolean;
};

export type CmsGlobalSettings = {
  siteName?: string | null;
  logo?: {
    alternativeText?: string | null;
    width?: number | null;
    height?: number | null;
    url: string;
  } | null;
  logoAlternativeText?: string | null;
  headerLinks?: CmsNavigationLink[];
  headerCta?: CmsNavigationLink | null;
  footerText?: string | null;
  footerLinks?: CmsNavigationLink[];
  footerCopyright?: string | null;
  footerEmail?: string | null;
};
