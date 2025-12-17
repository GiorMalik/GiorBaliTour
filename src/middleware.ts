import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'id', 'zh', 'ko', 'ar', 'tr', 'ru', 'pt'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Always show locale in URL
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(id|zh|ko|ar|tr|ru|pt|en)/:path*']
};