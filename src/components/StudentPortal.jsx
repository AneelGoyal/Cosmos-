import React, { useState } from 'react'
import {
  ArrowLeft,
  Calendar,
  Target,
  Clock,
  Eye,
  Download,
  X,
  CheckCircle2,
  XCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const SubjectBar = ({ subject, score, total, color }) => {
  const percentage = (score / total) * 100
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-navy">{subject}</span>
        <span className="text-sm font-medium text-slate-500">{score}/{total} ({Math.round(percentage)}%)</span>
      </div>
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  )
}

const StudentPortal = () => {
  const [showSheet, setShowSheet] = useState(false)

  const stats = [
    { label: "Accuracy", value: "84%", icon: Target, color: "text-emerald-500" },
    { label: "Time Taken", value: "42m", icon: Clock, color: "text-blue-500" },
    { label: "Rank", value: "12/124", icon: Target, color: "text-purple-500" },
  ]

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-navy">Mid-Term Mathematics</h2>
          <div className="flex items-center gap-4 mt-1 text-slate-500 text-sm font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Oct 24, 2023
            </span>
            <span>•</span>
            <span>Test ID: #MTH-2023-01</span>
          </div>
        </div>
      </div>

      {/* Hero Result Card */}
      <div className="bg-gradient-to-br from-navy to-slate-800 rounded-[32px] p-8 mb-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-electric/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Radial Progress */}
          <div className="relative w-48 h-48 flex items-center justify-center">
             <svg className="w-full h-full -rotate-90">
                <circle
                  cx="96" cy="96" r="88"
                  fill="transparent"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="12"
                />
                <motion.circle
                  cx="96" cy="96" r="88"
                  fill="transparent"
                  stroke="#2563EB"
                  strokeWidth="12"
                  strokeDasharray={2 * Math.PI * 88}
                  initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - 0.84) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black italic">84%</span>
                <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Score</span>
             </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4">Excellent Work, Rahul!</h3>
            <p className="text-slate-300 mb-8 max-w-md">You've performed significantly better than the class average (72%). Keep up the great momentum in Algebra!</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <button
                onClick={() => setShowSheet(true)}
                className="bg-white text-navy px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors"
               >
                 <Eye className="w-5 h-5" />
                 View Scanned Sheet
               </button>
               <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/20 transition-colors">
                 <Download className="w-5 h-5" />
                 Report PDF
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-slate-50 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h4 className="text-xl font-bold text-navy">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <h3 className="text-xl font-bold text-navy mb-8">Topic-wise Performance</h3>
        <SubjectBar subject="Algebra & Functions" score={18} total={20} color="bg-emerald-500" />
        <SubjectBar subject="Geometry & Trigonometry" score={12} total={15} color="bg-blue-500" />
        <SubjectBar subject="Calculus Foundations" score={8} total={10} color="bg-amber-500" />
        <SubjectBar subject="Probability & Statistics" score={4} total={5} color="bg-purple-500" />
      </div>

      {/* Scanned Sheet Modal */}
      <AnimatePresence>
        {showSheet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSheet(false)}
              className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[32px] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                <h3 className="text-xl font-bold text-navy">Digital OMR Overlay</h3>
                <button
                  onClick={() => setShowSheet(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 bg-slate-50 flex justify-center">
                <div className="bg-white w-full max-w-2xl aspect-[1/1.414] shadow-lg rounded-sm border border-slate-200 relative p-8">
                  {/* Simulated OMR Overlay */}
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-16 h-16 bg-navy flex items-center justify-center text-white font-black text-2xl">C</div>
                    <div className="text-right">
                      <p className="font-bold text-sm">Rahul Sharma</p>
                      <p className="text-xs text-slate-500">ID: #COS-2023-042</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(q => (
                      <div key={q} className="flex items-center gap-6">
                        <span className="w-6 text-sm font-bold text-slate-400">{q}.</span>
                        <div className="flex gap-4">
                          {['A', 'B', 'C', 'D'].map(opt => {
                            const isSelected = (q === 1 && opt === 'A') || (q === 2 && opt === 'C') || (q === 3 && opt === 'B') || (q === 4 && opt === 'D') || (q === 5 && opt === 'A') || (q === 6 && opt === 'B') || (q === 7 && opt === 'C') || (q === 8 && opt === 'D')
                            const isCorrect = q !== 3 && q !== 7 // Q3 and Q7 are wrong
                            return (
                              <div key={opt} className="relative">
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs ${isSelected ? 'bg-slate-800 border-slate-800 text-white' : 'border-slate-200 text-slate-300'}`}>
                                  {opt}
                                </div>
                                {isSelected && (
                                  <div className="absolute -top-1 -right-1">
                                    {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-white" /> : <XCircle className="w-4 h-4 text-red-500 fill-white" />}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                        {q === 3 && <span className="text-xs font-bold text-emerald-600 ml-auto">Correct: C</span>}
                        {q === 7 && <span className="text-xs font-bold text-emerald-600 ml-auto">Correct: A</span>}
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-dashed border-slate-200 flex justify-center opacity-20">
                    <p className="text-[8px] uppercase tracking-[1em] font-bold">End of Sheet Page 1</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StudentPortal
