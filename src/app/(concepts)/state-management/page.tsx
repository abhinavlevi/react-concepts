"use client"
import { useState, ChangeEvent } from "react"

// 1. Define explicit types for your state structure
interface UserState {
  name: string
  email: string
}

interface MutationTracker {
  key: string
  value: string
}

export default function MyForm() {
  // 2. Type the useState hooks
  const [user, setUser] = useState<UserState>({
    name: "John Doe",
    email: "john@example.com"
  })
  
  const [lastMutation, setLastMutation] = useState<MutationTracker>({ 
    key: "none", 
    value: "" 
  })

  // 3. Type the React change event explicitly
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    
    // Core Pattern: Functional update + spreading object + dynamic computed keys
    setUser(prev => ({
      ...prev,
      [name]: value
    }))

    setLastMutation({ key: name, value: value || '""' })
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 flex flex-col antialiased font-sans">
      
      {/* Premium Navigation Header */}
      <header className="w-full bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-sm">
            O
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 tracking-tight">React State Engine</h1>
            <p className="text-xs text-gray-500 font-medium hidden sm:block">Dynamic Object Mutation Lab (TSX)</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center text-xs font-semibold tracking-wide text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Concept: Immutable State
          </span>
          <button
            onClick={() => {
              setUser({ name: "No Name", email: "No Email" })
              setLastMutation({ key: "none", value: "" })
            }}
            className="text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-1.5 transition-colors shadow-sm"
          >
            Reset Form
          </button>
        </div>
      </header>

      {/* Main Split-Screen Canvas */}
      <main className="flex-1 w-full grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 bg-white">
        
        {/* Left Column: The Premium Live Form */}
        <section className="flex flex-col justify-between p-8 xl:p-12 bg-white min-h-[45vh] lg:min-h-0">
          <div className="space-y-8 max-w-xl w-full mx-auto lg:mx-0">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <h2 className="text-lg font-bold text-gray-900">Account Settings Card</h2>
              </div>
              <p className="text-sm text-gray-500 mt-1">Updates state securely via a single unified change handler.</p>
            </div>

            {/* Input Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Profile Name</label>
                <input 
                  name="name" 
                  value={user.name === "No Name" ? "" : user.name}
                  onChange={handleInputChange} 
                  placeholder="Enter full name" 
                  className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 font-medium text-sm rounded-xl border border-gray-200 px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all shadow-sm" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  name="email" 
                  value={user.email === "No Email" ? "" : user.email}
                  onChange={handleInputChange} 
                  placeholder="Enter email address" 
                  className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 font-medium text-sm rounded-xl border border-gray-200 px-4 py-3.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all shadow-sm" 
                />
              </div>
            </div>

            {/* Live Card Preview Box */}
            <div className="bg-gradient-to-br from-gray-900 to-slate-950 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute right-6 top-6 h-10 w-10 bg-white/5 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold tracking-tight text-indigo-400">
                User
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Rendered Output</p>
                  <h3 className="text-xl font-bold tracking-tight mt-1 truncate">{user.name || <span className="text-gray-600 italic font-normal">Empty</span>}</h3>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-sm font-mono text-gray-300 truncate">{user.email || <span className="text-gray-600 italic">empty@domain.com</span>}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Callout Tag */}
          <div className="mt-8 max-w-xl w-full mx-auto lg:mx-0 bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 text-xs text-indigo-800 leading-relaxed">
            💡 <strong>Architecture Tip:</strong> Both form inputs above route directly into a single function. No separate handlers needed per field.
          </div>
        </section>

        {/* Right Column: Code Breakdown Inspector */}
        <section className="flex flex-col justify-between p-8 xl:p-12 bg-gray-50/30 min-h-[45vh] lg:min-h-0">
          <div className="space-y-6 max-w-xl w-full mx-auto lg:mx-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h2 className="text-lg font-bold text-gray-900">State Compiler & Syntax Engine</h2>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100">
                Active Key: {lastMutation.key}
              </span>
            </div>

            {/* Live JSON Inspector State representation */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-inner">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Current State Tree (JSON)</p>
              <pre className="text-xs font-mono bg-white border border-gray-200 rounded-lg p-4 text-emerald-700 font-semibold shadow-sm overflow-x-auto">
{`{
  name: "${user.name}",
  email: "${user.email}"
}`}
              </pre>
            </div>

            {/* Code Highlight Box */}
            <div className="bg-gray-900 rounded-xl p-5 font-mono text-xs text-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute right-4 top-4 text-[10px] font-sans text-gray-500">// Dynamic Hook evaluation</div>
              <p className="text-indigo-400 font-semibold">setUser(<span className="text-gray-300">prev =&gt;</span> &#123;</p>
              <p className="text-gray-400 pl-4">return &#123;</p>
              <p className="text-amber-400 pl-8 font-medium">...prev, <span className="text-gray-500">// 1. Copies untouched keys safely</span></p>
              <p className="text-emerald-400 pl-8 font-bold">[{lastMutation.key}]: "{lastMutation.value}" <span className="text-gray-500">// 2. Dynamic Override</span></p>
              <p className="text-gray-400 pl-4">&#125;</p>
              <p className="text-indigo-400 font-semibold">&#125;)</p>
            </div>

            {/* Explanation Breakdown Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                <h4 className="text-xs font-bold text-gray-900 mb-1">1. Object Spreading (`...prev`)</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  React state updates replace variables entirely rather than merging them. Spreading copies over the unchanged keys so you don't lose them.
                </p>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                <h4 className="text-xs font-bold text-gray-900 mb-1">2. Computed Keys (`[name]`)</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  ES6 square bracket syntax dynamically swaps out the object's property identifier at runtime using whatever string is passed by <code className="bg-gray-100 p-0.5 rounded text-gray-950 font-mono">e.target.name</code>.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-xs font-medium text-gray-400 border-t border-gray-200/60 pt-4">
            Type anything into the form inputs to watch the compiler compute state assignments in real-time.
          </div>
        </section>

      </main>
    </div>
  )
}