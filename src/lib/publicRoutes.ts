// publi routes that don't require authentication

export const publicRoutes = [
  '/sign-in',
  '/sign-up',
  '/',
  '/about',
  '/advertise',
  '/careers',
  '/product',
  '/jobDescription',
  // ↓ dynamic segment
  '/careers/[id]',
  '/contact',
  '/pricing',
  '/blog',
  '/blog/blog1',
  '/blog/blog2',
  '/blog/blog3',
  '/blog/blog4',
  '/terms',
  '/trustCompilance',
  '/privacyPolicy',
  '/legal',
  '/request-demo',
  '/documentation',
  '/help-center',
  '/KB',
  '/WP'
] as const;
