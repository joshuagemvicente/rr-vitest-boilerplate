import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { redirect } from "react-router";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
    debugLogs: process.env.NODE_ENV === "development" ? true : false,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID || "",
      clientSecret: process.env.APPLE_CLIENT_SECRET || "",
    },
  },
});

export const getUserSession = async (request: Request) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    return session;
  }

  throw redirect("/login");
};

export const requireUserSession = async (request: Request) => {
  const user = await getUserSession(request);
  if (!user) {
    throw redirect("/login");
  }
  return user;
};

export const signOut = async (request: Request) => {
  await auth.api.signOut({
    headers: request.headers,
  });

  return redirect("/login");
};
