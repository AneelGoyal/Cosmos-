import React, { useState, useEffect } from 'react'
import {
  Zap,
  Image as ImageIcon,
  X,
  CheckCircle2,
  ChevronRight,
  Maximize2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const OMRScanner = () => {
  const [isScanning, setIsScanning] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [status, setStatus] = useState("Align OMR Sheet within the frame...")

  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setStatus("Processing Sheet...")
        const scanTimer = setTimeout(() => {
          setIsScanning(false)
          setShowResult(true)
        }, 1500)
        return () => clearTimeout(scanTimer)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isScanning])

  const handleReset = () => {
    setShowResult(false)
    setIsScanning(true)
    setStatus("Align OMR Sheet within the frame...")
  }

  return (
    <div className="relative h-full bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Top Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex justify-between items-center">
          <button className="text-white p-2 rounded-full hover:bg-white/10 transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
            <p className="text-white text-sm font-medium animate-pulse">
              {status}
            </p>
          </div>
          <button className="text-white p-2 rounded-full hover:bg-white/10 transition-colors">
            <Maximize2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Camera Viewport (Simulated) */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Animated Scanning Line */}
        {isScanning && (
          <motion.div
            initial={{ top: '20%' }}
            animate={{ top: '80%' }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute left-0 right-0 h-0.5 bg-electric shadow-[0_0_15px_rgba(37,99,235,0.8)] z-10"
          />
        )}

        {/* Bounding Box Container */}
        <div className="relative w-4/5 max-w-md aspect-[3/4] border-2 border-white/30 rounded-2xl">
          {/* Corner Markers */}
          <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-electric rounded-tl-lg"></div>
          <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-electric rounded-tr-lg"></div>
          <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-electric rounded-bl-lg"></div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-electric rounded-br-lg"></div>

          {/* QR Code Placeholder Frame */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 border border-white/40 rounded-lg flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-dashed border-white/20 rounded"></div>
          </div>

          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] rounded-2xl flex items-center justify-center">
             <div className="text-white/20 text-center px-8">
                <p className="text-xs uppercase tracking-widest font-bold">OMR Content Area</p>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-8 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <ImageIcon className="w-6 h-6" />
          </button>

          <button
            onClick={isScanning ? () => {} : handleReset}
            className="w-20 h-20 bg-white rounded-full p-1 border-4 border-white/30"
          >
            <div className={`w-full h-full rounded-full border-2 border-black/10 transition-all ${isScanning ? 'bg-white' : 'bg-electric'}`}></div>
          </button>

          <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <Zap className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Scan Result Modal (Slide up) */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-[32px] p-8 shadow-2xl"
          >
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-navy">Scan Successful!</h4>
                <p className="text-slate-500 font-medium">Sheet processed in 1.2s</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Student Name</p>
                  <p className="text-lg font-bold text-navy">Rahul Sharma</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Student ID</p>
                  <p className="text-lg font-bold text-navy">#COS-2023-042</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Raw Score</p>
                  <p className="text-2xl font-black text-electric">42/50</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accuracy</p>
                  <p className="text-2xl font-black text-emerald-600">84%</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 py-4 px-6 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-colors"
              >
                Retake
              </button>
              <button className="flex-[2] py-4 px-6 rounded-2xl bg-electric text-white font-bold shadow-lg shadow-electric/25 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                Approve & Save
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OMRScanner
