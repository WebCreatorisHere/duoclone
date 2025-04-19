import connectDB from "@/app/db/connectdb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/models/user";
import Credentials from "next-auth/providers/credentials";

export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();

        const { email, password, age, name } = credentials;

        // Sign Up Flow
        if (age && name) {
          // Basic check to prevent duplicate accounts
          const existingUser = await User.findOne({ email, isVerified: true });
          if (existingUser) {
            throw new Error("User already exists");
          }

          const newUser = await User.create({
            email,
            password,
            age,
            name,
            isVerified: true,
          });

          return {
            id: newUser._id.toString(),
            email,
            name,
            age,
          };
        }

        // Login Flow
        const user = await User.findOne({ email, password, isVerified: true });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          age: user.age,
        };
      },
    }),

    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();
      if (account.provider === "google" || account.provider === "facebook") {
        const existinguser = await User.findOne({
          email: user.email,
          isVerified: false,
        });
        if (existinguser) {
          return true;
        } else {
          await User.create({
            name: user.name,
            email: user.email,
            isVerified: false,
          });
          return true;
        }
      }

      if (account.provider === "credentials") {
        const { email, password } = user;
        const userea = await User.findOne({
          email,
          password,
          isVerified: true,
        });
        return true;
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { authOptions as GET, authOptions as POST };
