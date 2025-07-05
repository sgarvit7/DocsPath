// publi routes that don't require authentication

export const publicRoutes = [
  '/sign-in',
  '/sign-up',
  '/',
  '/about',
  '/careers',
  '/product',
  // ↓ dynamic segment
  '/careers/[id]',
  '/contact',
  '/pricing',
] as const;
