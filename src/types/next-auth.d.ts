import NextAuth, { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      githubUsername?: string
      githubAvatar?: string
    } & DefaultSession['user']
  }

  interface User {
    githubUsername?: string | null
    githubAvatar?: string | null
  }
}

