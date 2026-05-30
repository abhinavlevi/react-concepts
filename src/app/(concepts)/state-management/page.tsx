"use client"
import { useState } from "react"

export default function MyForm() {
  const [count, setCount] = useState(0)
  const [rawCallsResult, setRawCallsResult] = useState(0)
  const [functionalCallsResult, setFunctionalCallsResult] = useState(0)

  function handleInputChange() {
    // 1. Direct/Raw State Updates (Batched together)
    // Both read the 'old' count from the current render cycle. 
    // They essentially do: setCount(0 + 1) and setCount(0 + 1)
    setCount(count + 1)
    setCount(count + 1)

    // 2. Functional State Updates (Queue-based)
    // These receive the most up-to-date queued value.
    // prev represents the result of the previous updates in this batch.
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)

    // Visual breakdown trackers for the UI demo
    setRawCallsResult(1) // count + 1 and count + 1 both evaluate to 1
    setFunctionalCallsResult(prev => prev + 2) 
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6 antialiased">
      <div className="w-full max-w-xl bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase bg-emerald-400/10 px-3 py-1 rounded-full">
            React Concept Sandbox
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            State Batching & Updater Functions
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            See how React handles sequential state updates in a single event handler.
          </p>
        </div>

        {/* Main Display Counter */}
        <div className="relative overflow-hidden bg-slate-900/80 border border-slate-700/30 rounded-xl p-6 text-center shadow-inner mb-6">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Final State Value</p>
          <div className="mt-2 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
            {count}
          </div>
        </div>

        {/* Concept Breakdown Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <p className="text-xs font-semibold text-slate-400 uppercase">Direct Updates</p>
            </div>
            <code className="text-xs text-amber-300 font-mono block mb-2">setCount(count + 1)</code>
            <p className="text-sm font-medium text-slate-200">Result: +1 total</p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Uses stale closure value. Both calls evaluate to 0 + 1.</p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <p className="text-xs font-semibold text-slate-400 uppercase">Functional Updates</p>
            </div>
            <code className="text-xs text-emerald-300 font-mono block mb-2">setCount(prev =&gt; prev + 1)</code>
            <p className="text-sm font-medium text-slate-200">Result: +2 total</p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Reads the pending state queue sequentially.</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleInputChange}
          className="w-full group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-slate-900 rounded-xl group bg-gradient-to-br from-emerald-400 to-teal-300 group-hover:from-emerald-400 group-hover:to-teal-300 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-emerald-800 transition-all duration-200 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-[0.98]"
        >
          <span className="w-full text-center relative px-5 py-4 transition-all ease-in duration-75 bg-slate-900 rounded-xl group-hover:bg-opacity-0 font-semibold tracking-wide">
            Trigger <code className="font-mono text-emerald-400 group-hover:text-slate-900 transition-colors">handleInputChange()</code>
          </span>
        </button>

        {/* Explanation Note Footer */}
        <div className="mt-6 border-t border-slate-700/50 pt-4 text-center">
          <p className="text-xs text-slate-400">
            💡 Clicking increases the state by <span className="text-white font-bold">3</span> per click because <span className="font-mono text-slate-300">1 (batched direct) + 2 (functional) = 3</span>.
          </p>
        </div>

      </div>
    </div>
  )
}