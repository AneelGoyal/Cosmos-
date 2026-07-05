import React, { useState } from 'react'
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Layers,
  ChevronRight,
  Maximize2,
  RefreshCw,
  RotateCcw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const BulkProcessor = () => {
  const [status, setStatus] = useState('idle') // idle, uploading, processing, completed
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState([])

  const startProcessing = () => {
    setStatus('uploading')
    setProgress(0)

    // Simulate upload
    const uploadInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          setStatus('processing')
          simulateCV()
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const simulateCV = () => {
    // Simulate Computer Vision pipeline
    setTimeout(() => {
      setResults([
        { id: 1, student: 'Rahul Sharma', status: 'Success', score: 42, confidence: 98 },
        { id: 2, student: 'Ananya Iyer', status: 'Success', score: 38, confidence: 95 },
        { id: 3, student: 'Vikram Singh', status: 'Success', score: 45, confidence: 99 },
        { id: 4, student: 'Unknown ID', status: 'Warning', score: 0, confidence: 42, issue: 'QR Code Blur' },
        { id: 5, student: 'Priya Das', status: 'Success', score: 48, confidence: 97 },
      ])
      setStatus('completed')
    }, 3000)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy">Bulk OMR Processing</h2>
        <p className="text-slate-500 font-medium mt-1">High-volume automated scanning for standard office printers & flatbeds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Zone */}
        <div className="lg:col-span-1">
          <div className={`bg-white p-8 rounded-[32px] border-2 border-dashed transition-all flex flex-col items-center justify-center text-center ${
            status === 'idle' ? 'border-slate-200 hover:border-electric cursor-pointer' : 'border-electric'
          }`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
              status === 'idle' ? 'bg-slate-50 text-slate-400' : 'bg-electric/10 text-electric'
            }`}>
              {status === 'idle' ? <Upload className="w-8 h-8" /> : <Loader2 className="w-8 h-8 animate-spin" />}
            </div>
            <h3 className="font-bold text-navy text-lg mb-2">
              {status === 'idle' ? 'Upload Scan Batch' : 'Processing Batch...'}
            </h3>
            <p className="text-sm text-slate-500 mb-8 px-4">
              Select a multi-page PDF or a ZIP file containing OMR sheets.
            </p>

            {status !== 'idle' && (
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-8">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-electric"
                />
              </div>
            )}

            {status === 'idle' ? (
              <button
                onClick={startProcessing}
                className="w-full py-4 bg-navy text-white rounded-2xl font-bold shadow-xl shadow-navy/20 hover:bg-slate-800 transition-all"
              >
                Choose Files
              </button>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                <p className="text-xs font-bold text-electric uppercase tracking-widest italic animate-pulse">
                   {status === 'uploading' ? 'Transmitting Data...' : 'Running CV Engine...'}
                </p>
              </div>
            )}
          </div>

          {/* CV Pipeline Visualization */}
          <div className="mt-8 bg-navy p-6 rounded-[32px] text-white">
             <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <RefreshCw className="w-3 h-3" />
                Backend CV Pipeline
             </h4>
             <div className="space-y-4">
                {[
                  { label: 'Page Splitting', done: status !== 'idle' },
                  { label: 'Anchor Alignment', done: status === 'processing' || status === 'completed' },
                  { label: 'Metadata Extraction', done: status === 'processing' || status === 'completed' },
                  { label: 'Bubble Evaluation', done: status === 'completed' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                     <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                       step.done ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
                     }`}>
                        {step.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                     </div>
                     <span className={`text-sm font-medium ${step.done ? 'text-white' : 'text-white/40'}`}>
                       {step.label}
                     </span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Results List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h3 className="text-xl font-bold text-navy">Processing Results</h3>
                <p className="text-sm font-medium text-slate-400">Items in current batch</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                  {results.filter(r => r.status === 'Success').length} Success
                </span>
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
                  {results.filter(r => r.status === 'Warning').length} Warnings
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
              <AnimatePresence>
                {results.length > 0 ? results.map((res, i) => (
                  <motion.div
                    key={res.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-electric/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        res.status === 'Success' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'
                      }`}>
                         {res.status === 'Success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-navy">{res.student}</h4>
                        <p className="text-xs font-medium text-slate-400">
                          {res.status === 'Success' ? `Confidence: ${res.confidence}%` : `Issue: ${res.issue}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      {res.status === 'Success' && (
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Score</p>
                          <p className="text-lg font-black text-electric">{res.score}/50</p>
                        </div>
                      )}
                      <button className="p-2 text-slate-400 hover:text-navy transition-colors opacity-0 group-hover:opacity-100">
                         <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 py-20">
                     <Layers className="w-16 h-16 mb-4 opacity-10" />
                     <p className="font-medium">No results to display</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {status === 'completed' && (
              <div className="p-6 bg-white border-t border-slate-100 text-center">
                 <button className="text-electric font-bold hover:underline flex items-center gap-2 mx-auto">
                    Commit Batch to Database
                    <ChevronRight className="w-4 h-4" />
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BulkProcessor
