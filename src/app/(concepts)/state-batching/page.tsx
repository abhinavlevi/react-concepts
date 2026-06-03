"use client"
import { useState } from "react"

export default function MyForm() {
  const [directCount, setDirectCount] = useState(0)
  const [functionalCount, setFunctionalCount] = useState(0)

  // Demo 1: Direct updates overwrite each other due to the render snapshot
  function handleDirectUpdates() {
    setDirectCount(directCount + 1)
    setDirectCount(directCount + 1)
  }

  // Demo 2: Functional updates queue sequentially, processing the updated value each step
  function handleFunctionalUpdates() {
    setFunctionalCount(prev => prev + 1)
    setFunctionalCount(prev => prev + 1)
  }

  function handleReset() {
    setDirectCount(0)
    setFunctionalCount(0)
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 flex flex-col antialiased font-sans">
      
      {/* Premium Global Navigation Bar */}
      <header className="w-full bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-sm">
            R
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 tracking-tight">React State Engine</h1>
            <p className="text-xs text-gray-500 font-medium hidden sm:block">Interactive Architecture Lab</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center text-xs font-semibold tracking-wide text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            v19.0.0 Stable
          </span>
          <button
            onClick={handleReset}
            className="text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-1.5 transition-colors shadow-sm"
          >
            Reset All Counters
          </button>
        </div>
      </header>

      {/* Main Full-Screen Layout Grid */}
      <main className="flex-1 w-full grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 bg-white">
        
        {/* Left Column: Direct Updates Section */}
        <section className="flex flex-col justify-between p-8 xl:p-12 bg-white group min-h-[45vh] lg:min-h-0">
          <div className="space-y-6 max-w-2xl w-full mx-auto lg:mx-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h2 className="text-lg font-bold text-gray-900">Standard Direct Updating</h2>
              </div>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-100">
                Adds +1 per execution
              </span>
            </div>

            {/* Live Counter Display */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Current Snapshot Value</p>
                <p className="text-xs text-gray-500 mt-0.5">Reads frozen count state during render</p>
              </div>
              <span className="text-5xl font-mono font-bold text-gray-950">{directCount}</span>
            </div>

            {/* Code Box */}
            <div className="bg-gray-900 rounded-xl p-5 font-mono text-sm text-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute right-4 top-4 text-xs font-sans text-gray-500">// Snapshot: count = {directCount}</div>
              <p className="text-gray-500 italic text-xs mb-1">// Both lines use the exact same frozen value</p>
              <p className="text-gray-300">setCount(<span className="text-amber-400 font-medium">count + 1</span>)</p>
              <p className="text-gray-300">setCount(<span className="text-amber-400 font-medium">count + 1</span>)</p>
            </div>

            {/* Simple Explanation */}
            <div className="space-y-2 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide">What is happening?</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                React views state as a immutable snapshot. If <code className="font-mono bg-gray-100 px-1 rounded text-gray-900">count</code> is <code className="font-mono font-bold">{directCount}</code> when you click, it transforms into <code className="font-mono text-gray-900">setCount({directCount} + 1)</code> twice. The second code line simply overrides the first line with the exact same result.
              </p>
            </div>
          </div>

          <div className="mt-8 max-w-2xl w-full mx-auto lg:mx-0">
            <button
              onClick={handleDirectUpdates}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold text-sm px-5 py-3.5 rounded-xl border border-gray-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/20 active:scale-[0.995] flex justify-between items-center"
            >
              <span>Execute Direct Logic Block</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </section>

        {/* Right Column: Functional Updates Section */}
        <section className="flex flex-col justify-between p-8 xl:p-12 bg-gray-50/30 group min-h-[45vh] lg:min-h-0">
          <div className="space-y-6 max-w-2xl w-full mx-auto lg:mx-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h2 className="text-lg font-bold text-gray-900">Functional Queue Updating</h2>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100">
                Adds +2 per execution
              </span>
            </div>

            {/* Live Counter Display */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Current Pipeline Value</p>
                <p className="text-xs text-gray-500 mt-0.5">Reads live values straight out of the batch queue</p>
              </div>
              <span className="text-5xl font-mono font-bold text-gray-950">{functionalCount}</span>
            </div>

            {/* Code Box */}
            <div className="bg-gray-900 rounded-xl p-5 font-mono text-sm text-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute right-4 top-4 text-xs font-sans text-gray-500">// Pipeline Queue</div>
              <p className="text-gray-500 italic text-xs mb-1">// Chains changes together using current live updates</p>
              <p className="text-gray-300">setCount(<span className="text-emerald-400 font-medium">prev =&gt; prev + 1</span>)</p>
              <p className="text-gray-300">setCount(<span className="text-emerald-400 font-medium">prev =&gt; prev + 1</span>)</p>
            </div>

            {/* Simple Explanation */}
            <div className="space-y-2 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide">What is happening?</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Instead of giving React a raw value, you are handing it a recipe callback. React lines them up inside a temporary pending queue. When the second line executes, <code className="font-mono bg-gray-100 px-1 rounded text-gray-900">prev</code> holds onto the immediate output step generated just a millisecond prior.
              </p>
            </div>
          </div>

          <div className="mt-8 max-w-2xl w-full mx-auto lg:mx-0">
            <button
              onClick={handleFunctionalUpdates}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm px-5 py-3.5 rounded-xl shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 active:scale-[0.995] flex justify-between items-center"
            >
              <span>Execute Functional Pipeline</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </section>

      </main>
    </div>
  )
}