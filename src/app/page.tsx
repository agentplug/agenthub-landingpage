import React from 'react'
import { Hero } from '@/components/Hero'
import { ProblemSolution } from '@/components/ProblemSolution'
import { KeyFeatures } from '@/components/KeyFeatures'
import { InteractiveDemo } from '@/components/InteractiveDemo'
import { AgentMarketplace } from '@/components/AgentMarketplace'
import { SocialProof } from '@/components/SocialProof'
import { CTA } from '@/components/CTA'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProblemSolution />
      <KeyFeatures />
      <InteractiveDemo />
      <AgentMarketplace />
      <SocialProof />
      <CTA />
    </div>
  )
}
