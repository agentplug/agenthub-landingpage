import { PrismaAdapter } from '@auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { prisma } from '@/lib/db/prisma'

const githubClientId = process.env.GITHUB_CLIENT_ID
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: githubClientId ?? '',
      clientSecret: githubClientSecret ?? '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: 'database',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.githubUsername = user.githubUsername ?? undefined
        session.user.githubAvatar = user.githubAvatar ?? user.image ?? undefined
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github') {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            githubId: account.providerAccountId,
            githubUsername:
              (profile as { login?: string } | null)?.login ?? user.email ?? undefined,
            githubAvatar: (profile as { avatar_url?: string } | null)?.avatar_url,
          },
        })
      }
      return true
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}

