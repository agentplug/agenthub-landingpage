'use client'

import { signIn } from 'next-auth/react'
import { Github } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6 py-16">
      <div className="card max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-4">Sign in to AgentHub</h1>
        <p className="text-[var(--text-secondary)] mb-8">
          Connect your GitHub account to publish agents and manage your submissions.
        </p>
        <button
          type="button"
          className="btn-primary w-full flex items-center justify-center gap-3"
          onClick={() => signIn('github', { callbackUrl: '/' })}
        >
          <Github className="w-5 h-5" />
          Continue with GitHub
        </button>
      </div>
    </div>
  )
}

