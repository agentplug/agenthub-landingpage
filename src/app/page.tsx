import React from 'react'
import { Hero } from '@/components/Hero'
import { ProblemSolution } from '@/components/ProblemSolution'
import { KeyFeatures } from '@/components/KeyFeatures'
import { AgentMarketplace } from '@/components/AgentMarketplace'
import { SocialProof } from '@/components/SocialProof'
import { CTA } from '@/components/CTA'

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Hero />
      <ProblemSolution />
      <KeyFeatures />
      <AgentMarketplace />
      <SocialProof />
      <CTA />
    </div>
  )
}
