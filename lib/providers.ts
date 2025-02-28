import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const oauthProviders = [
  {
    id: "google",
    name: "Google",
    icon: FcGoogle,
    styles: "text-neutral-950 border hover:bg-neutral-50",
    authUrl: "/api/auth/google",
    callbackUrl: "/auth/callback/google",
  },
//   {
//     id: "github",
//     name: "GitHub",
//     icon: FaGithub,
//     styles: "text-neutral-950 hover:bg-neutral-50",
//     authUrl: "/api/auth/github",
//     callbackUrl: "/auth/callback/github",
//   },
] as const;

export type OAuthProvider = (typeof oauthProviders)[number]["id"];