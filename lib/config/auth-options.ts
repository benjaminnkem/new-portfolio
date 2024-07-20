import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { publicApi } from "./axios-instance";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Name" },
        password: { label: "Password" },
      },
      authorize: async (credentials, _req) => {
        if (!credentials || !credentials.email || !credentials.password) return null;
        const { email, password } = credentials;

        return { id: crypto.randomUUID() };
      },
    }),
  ],
  callbacks: {},
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/dashboard",
    signOut: "/account/login",
    error: "/account/login",
  },
};

export default authOptions;
