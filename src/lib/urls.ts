export const urls = {
  AUTH: "/auth",
  LANDING_PAGE: "/",
  MARKET_PLACE: "/market-place",
  GOOGLE_REDIRECT_URI: "/api/auth/google/callback",
  GOOGLE_USER_INFO: "https://www.googleapis.com/oauth2/v1/userinfo",
  API_TASKS: "/api/data/tasks",
  API_TASK: (taskId: string) => `/api/data/tasks/${taskId}`,
  USER: (userId: string, profileId: string) =>
    `/api/data/users/${userId}/profiles/${profileId}`,
};

export const publicPaths = new Set<string>([
  urls.AUTH,
  urls.GOOGLE_REDIRECT_URI,
  urls.LANDING_PAGE,
]);

export const publicApiPaths = new Set<string>([urls.API_TASKS]);

export function isPublicPath(path: string): boolean {
  if (publicPaths.has(path) || publicApiPaths.has(path)) return true;

  return Array.from(publicPaths).some((publicPath) =>
    path.startsWith(publicPath)
  );
}
