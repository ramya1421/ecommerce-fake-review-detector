import type { NextAuthOptions } from "next-auth";
import type { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                try {
                    const user = await prisma.user.findFirst({
                        where: { email: credentials.email },
                    });
                    if (user && user.password) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                        if (isPasswordCorrect) {
                            return user;
                        }
                    }
                    return null;
                } catch (err: any) {
                    throw new Error(err?.message || "Authentication error");
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: AuthUser; account: Account | null }) {
            if (account?.provider === "credentials") {
                return true;
            }
            return false;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token?.sub && session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
