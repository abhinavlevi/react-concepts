"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Terminal, Sparkles, Code, Play, RefreshCw, Command, Cpu, Waves } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
}

export default function DevPage() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to ABHINAV.dev sandbox v2.0.0',
    'System integrated with Lenis smooth-scroll & Framer Motion physics.',
    'Type "help" to view executable scripts.',
    ''
  ]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activePreset, setActivePreset] = useState<'forest' | 'matrix'>('forest');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal logs smoothly
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Physics animation loop for smooth, drifting particles on the canvas
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            // Fade out sizes gradually to simulate friction/dissipation
            size: p.size * 0.98,
          }))
          // Remove dead or tiny particles
          .filter((p) => p.size > 0.5)
      );
    }, 16); // ~60fps smooth loop

    return () => clearInterval(interval);
  }, [particles]);

  // Interactive Command Processor
  const handleCommand = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = input.trim().toLowerCase();
    if (!trimmedInput) return;

    let response = '';
    switch (trimmedInput) {
      case 'help':
        response = 'Available modules:\n• "spark"    - Inject reactive physics particles\n• "matrix"   - Disrupt UI style frequency\n• "quantum"  - Run heavy CPU multi-threaded simulation\n• "clear"    - Wipe logging data buffers';
        break;
      case 'spark':
        triggerQuantumBurst();
        response = '✨ Physics particles deployed across canvas vectors.';
        break;
      case 'matrix':
        triggerThemeShift();
        return;
      case 'quantum':
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setHistory(prev => [...prev, '⚡ Quantum simulation stable. 0ms latency achieved.', '']);
        }, 1200);
        response = '🌀 Initializing hyper-threaded render pipeline...';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = `err: "${trimmedInput}" is an unmapped core instruction.`;
    }

    setHistory(prev => [...prev, `> ${input}`, response, '']);
    setInput('');
  };

  const triggerThemeShift = () => {
    setActivePreset(prev => prev === 'forest' ? 'matrix' : 'forest');
    setHistory(prev => [...prev, `> matrix`, '🎨 Subsystem UI architecture color profiles modified.', '']);
    setInput('');
  };

  // Click handler to deploy floating physics particles
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    const mintPalette = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];
    const newParticles = Array.from({ length: 6 }).map(() => ({
      id: Math.random() + Date.now(),
      x: startX,
      y: startY,
      color: mintPalette[Math.floor(Math.random() * mintPalette.length)],
      size: Math.random() * 6 + 4,
      // Random velocities for a natural, kinetic burst explosion
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
    }));

    setParticles(prev => [...prev, ...newParticles]);
  };

  // Full-canvas burst button handler
  const triggerQuantumBurst = () => {
    if (!canvasRef.current) return;
    const w = canvasRef.current.clientWidth;
    const h = canvasRef.current.clientHeight;

    const burst = Array.from({ length: 25 }).map(() => ({
      id: Math.random() + Date.now(),
      x: Math.random() * w,
      y: Math.random() * h,
      color: '#34d399',
      size: Math.random() * 8 + 4,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
    setParticles(prev => [...prev, ...burst]);
  };

  return (
    <div className="min-h-screen bg-[#0d1f18] text-slate-200 font-sans p-4 sm:p-6 flex flex-col justify-between selection:bg-[#10b981]/30 selection:text-emerald-300 antialiased overflow-x-hidden">
      
      {/* Header */}
      <header className="max-w-6xl w-full mx-auto flex justify-between items-center py-4 border-b border-emerald-950/40">
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="h-2.5 w-2.5 rounded-full bg-emerald-400" 
          />
          <span className="font-mono tracking-widest font-bold text-xs text-emerald-400">ABHINAV // LABS v2</span>
        </div>
        <div className="text-[10px] text-slate-500 font-mono hidden sm:block tracking-wider">
          SYSTEM_STATE: OPERATIONAL // STRUCT: ADAPTIVE
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-8 z-10">
        
        {/* Left Control Panel Column */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-900/30 text-emerald-400 text-xs font-mono mb-5"
            >
              <Command size={11} className="animate-spin-slow" /> /dev/playground
            </motion.div>
            
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
              Tactile Sandbox. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-teal-100">
                Interact & Experiment.
              </span>
            </h1>
            
            <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-sm">
              A premium, high-fidelity workbench testing environment. Play directly with client physics matrices, drag layout structures, or feed system tasks into the custom interactive micro-shell below.
            </p>
          </div>

          {/* Interactive Control Trigger Buttons */}
          <div className="space-y-3">
            <motion.button 
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={triggerQuantumBurst}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-transparent border border-emerald-900/20 hover:border-emerald-500/30 transition-colors text-left group"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black transition-colors">
                  <Sparkles size={15} />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-slate-200">Inject Quantum State</div>
                  <div className="text-[11px] text-slate-500">Deploy kinetic multi-drift vectors</div>
                </div>
              </div>
              <Play size={13} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={triggerThemeShift}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-transparent border border-emerald-900/20 hover:border-emerald-500/30 transition-colors text-left group"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black transition-colors">
                  <RefreshCw size={15} />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-slate-200">Mutate Engine Palette</div>
                  <div className="text-[11px] text-slate-500">Shift theme architecture configuration</div>
                </div>
              </div>
              <Play size={13} className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
            </motion.button>
          </div>
        </div>

        {/* Right Sandbox Engine Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Module 1: Physics Drag & Click Vector Canvas */}
          <motion.div 
            ref={canvasRef}
            onClick={handleCanvasClick}
            layout
            className={`relative h-[360px] md:h-auto rounded-2xl border overflow-hidden flex flex-col justify-between p-5 cursor-crosshair group select-none transition-colors duration-700 ${
              activePreset === 'forest' 
                ? 'bg-gradient-to-b from-[#112a20] to-[#0a1a14] border-emerald-900/40' 
                : 'bg-zinc-950 border-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.03)]'
            }`}
          >
            {/* Fine Grid Background Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98103_1px,transparent_1px),linear-gradient(to_bottom,#10b98103_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <div className="relative z-10 flex justify-between items-center pointer-events-none">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/70 tracking-tight">
                <Code size={13} /> VECTOR_CANVAS_ENGINE
              </div>
              <span className="text-[9px] font-mono tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                TAP TO SPAWN
              </span>
            </div>

            {/* Kinetic Particles Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="absolute rounded-full transition-transform duration-75 ease-out"
                  style={{
                    left: p.x,
                    top: p.y,
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                    boxShadow: `0 0 14px ${p.color}`,
                    opacity: p.size / 10,
                  }}
                />
              ))}
            </div>

            {/* Interactive Spring-Loaded Draggable Core Widget */}
            <div className="w-full flex justify-center items-center my-auto relative z-20">
              <motion.div
                drag
                dragConstraints={canvasRef}
                dragElastic={0.15}
                whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
                className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/30 backdrop-blur-md text-center max-w-[200px] shadow-xl relative cursor-grab group/widget"
              >
                <div className="absolute -top-1.5 -right-1.5 bg-emerald-400 text-[9px] text-black font-mono px-1 rounded font-bold uppercase animate-pulse">
                  Drag Me
                </div>
                <Waves className="mx-auto text-emerald-400 mb-2 group-hover/widget:rotate-12 transition-transform" size={18} />
                <h4 className="text-xs font-mono font-bold text-white mb-0.5">Kinetic Node</h4>
                <p className="text-[10px] text-slate-400 font-mono">Elastic feedback sandbox</p>
              </motion.div>
            </div>

            <div className="relative z-10 pointer-events-none flex justify-between items-center text-[10px] font-mono text-slate-500">
              <div>Drifting Node Matrix: <span className="text-emerald-400 font-bold">{particles.length}</span></div>
              <div className="text-right group-hover:text-slate-400 transition-colors">[ Spring Elasticity: 0.15 ]</div>
            </div>
          </motion.div>

          {/* Module 2: The Core Dev Terminal */}
          <div className="h-[390px] rounded-2xl bg-black border border-zinc-900 shadow-2xl flex flex-col justify-between overflow-hidden relative">
            
            {/* Terminal Top Window Strip */}
            <div className="bg-[#08090a] px-4 py-3 flex items-center justify-between border-b border-zinc-900/60">
              <div className="flex items-center gap-2">
                <Terminal size={13} className="text-emerald-400" />
                <span className="text-xs font-mono text-slate-400 tracking-tight">shell — interactive-terminal</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
              </div>
            </div>

            {/* Simulating Processing State Overlay */}
            {isProcessing && (
              <div className="absolute inset-x-0 top-[38px] bottom-12 bg-black/80 backdrop-blur-[1px] z-30 flex flex-col items-center justify-center font-mono text-xs text-emerald-400 gap-2">
                <Cpu size={18} className="animate-spin text-emerald-400" />
                <span>COMPUTING SYSTEM LOGS...</span>
              </div>
            )}

            {/* Render Output Stream */}
            <div className="p-4 flex-1 font-mono text-xs overflow-y-auto space-y-1.5 text-slate-300 custom-scrollbar select-text selection:bg-emerald-900/60">
              <AnimatePresence initial={false}>
                {history.map((line, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-pre-wrap leading-relaxed tracking-normal"
                  >
                    {line.startsWith('>') ? (
                      <span className="text-emerald-400 font-bold">{line}</span>
                    ) : line.startsWith('•') || line.startsWith('✨') || line.startsWith('🎨') || line.startsWith('⚡') || line.startsWith('🌀') ? (
                      <span className="text-emerald-300/90">{line}</span>
                    ) : (
                      <span className="text-slate-400">{line}</span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={terminalEndRef} />
            </div>

            {/* Shell Command Input Form */}
            <form onSubmit={handleCommand} className="p-3 bg-[#050607] border-t border-zinc-900/50 flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs font-bold pl-1 animate-pulse">~</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type 'help' to unlock sandboxes..."
                className="w-full bg-transparent text-xs font-mono text-white placeholder-zinc-700 focus:outline-none caret-emerald-400"
                maxLength={35}
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto py-4 border-t border-emerald-950/40 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] font-mono text-slate-600 tracking-tight">
        <div>Optimized physics loops running independently from Lenis root axis.</div>
        <div className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1">
          Back to frame ↗
        </div>
      </footer>
    </div>
  );
}