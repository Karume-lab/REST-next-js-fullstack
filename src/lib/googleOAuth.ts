import { Google } from "arctic";
import { urls } from "./urls";

export const googleOAuthClient = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  urls.GOOGLE_REDIRECT_URI
);
