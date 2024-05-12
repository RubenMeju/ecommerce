import NextAuth, { type DefaultSession } from "next-auth";
import credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    refresh: string;
    access: string;
  }

  interface Session {
    expires: string;
    user: {
      access: string;
      refresh: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Ingrese su email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        //  console.log("credentials: ", credentials);
        // Obtenemos token access y refresh
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/jwt/create/`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await res.json();
        // Obtenemos el
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/users/me/`,
          {
            headers: { Authorization: `JWT ${user.access}` },
          }
        );

        if (!userRes.ok) {
          throw new Error(`Error on /auth/users/me/: ${userRes.statusText}`);
        }

        const userData = await userRes.json();
        // console.log("------USERDATA------: ", userData);
        // If no error and we have user data, return it
        if (res.ok && user) {
          user.id = userData.id;
          user.name = userData.username;
          user.email = credentials.email;
          user.image = userData.picture;

          return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    jwt({ user, token }) {
      //  console.log("JWT token1: ", token);
      // console.log("JWT user1: ", user);
      if (user) {
        // User is available during sign-in
        token.access = user.access;
        token.refresh = user.refresh;
      }
      return token;
    },
    session({ session, token }) {
      // console.log("SESSION session: ", session);
      //  console.log("SESSION token: ", token);
      if (typeof token.access === "string") {
        session.user.access = token.access;
      }
      if (typeof token.refresh === "string") {
        session.user.refresh = token.refresh;
      }

      return session;
    },
  },
});
