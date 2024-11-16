export const urls = {
  AUTH: "/auth",
  LANDING_PAGE: "/",
  MARKET_PLACE: "/market-place",
  GOOGLE_REDIRECT_URI: "/api/auth/google/callback",
  GOOGLE_USER_INFO: "https://www.googleapis.com/oauth2/v1/userinfo",
  API_POSTS: "/api/data/posts",
};

export const publicPaths = new Set<string>([
  urls.AUTH,
  urls.GOOGLE_REDIRECT_URI,
  urls.LANDING_PAGE,
]);

export const publicApiPaths = new Set<string>([urls.API_POSTS]);

export function isPublicPath(path: string): boolean {
  if (publicPaths.has(path) || publicApiPaths.has(path)) return true;

  return Array.from(publicPaths).some((publicPath) =>
    path.startsWith(publicPath)
  );
}
