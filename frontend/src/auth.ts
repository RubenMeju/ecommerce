import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        console.log("callback jwt user: ", user);
        console.log("callback jwt token: ", token);
      }
      return token;
    },
    /*
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    */
  },
  pages: {
    signIn: "/auth/signin",
  },
});
