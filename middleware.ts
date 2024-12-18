import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["tr", "en"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(tr|en)/:path*"],
};
