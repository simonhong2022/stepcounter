import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "833330946829-6vg7tee1kgqak6gagqeacvbkesno35e3.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});
