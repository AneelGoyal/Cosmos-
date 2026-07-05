import React, { useState } from 'react'
import {
  Plus,
  Trash2,
  FileText,
  Printer,
  ChevronRight,
  Eye,
  Settings2,
  CheckCircle2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const TestGenerator = () => {
  const [step, setStep] = useState(1) // 1: Setup, 2: Questions, 3: Preview
  const [testTitle, setTestTitle] = useState('')
  const [questions, setQuestions] = useState([
    { id: 1, text: '', options: ['', '', '', ''], correct: 0 }
  ])

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), text: '', options: ['', '', '', ''], correct: 0 }])
  }

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q))
  }

  const updateOption = (qId, optIdx, value) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const newOpts = [...q.options]
        newOpts[optIdx] = value
        return { ...q, options: newOpts }
      }
      return q
    }))
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-12">
        {[1, 2, 3].map(i => (
          <React.Fragment key={i}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
              step >= i ? 'bg-electric text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {i}
            </div>
            {i < 3 && <div className={`w-20 h-1 transition-colors ${step > i ? 'bg-electric' : 'bg-slate-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
          >
            <h3 className="text-xl font-bold text-navy mb-6">Test Configuration</h3>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Test Title</label>
                <input
                  type="text"
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  placeholder="e.g. Mid-Term Physics 2023"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-electric/20 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-electric/20 font-medium">
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-4 bg-electric text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-electric/20"
            >
              Continue to Questions
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl font-bold text-navy">Compose MCQs</h3>
               <button
                onClick={addQuestion}
                className="bg-white border border-slate-200 text-navy px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors"
               >
                 <Plus className="w-4 h-4" />
                 Add Question
               </button>
            </div>

            {questions.map((q, idx) => (
              <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative">
                <div className="absolute -left-3 top-6 w-8 h-8 bg-navy text-white rounded-lg flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <div className="ml-4 space-y-4">
                  <textarea
                    placeholder="Enter question text..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-electric/20 font-medium text-navy resize-none h-20"
                    value={q.text}
                    onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuestion(q.id, 'correct', oIdx)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                            q.correct === oIdx ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 text-slate-300'
                          }`}
                        >
                          {String.fromCharCode(65 + oIdx)}
                        </button>
                        <input
                          type="text"
                          placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                          className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border-none text-sm font-medium"
                          value={opt}
                          onChange={(e) => updateOption(q.id, oIdx, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-4 pt-6">
              <button onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold">Back</button>
              <button
                onClick={() => setStep(3)}
                className="flex-[2] py-4 bg-electric text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-electric/20"
              >
                Generate Print Preview
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
             <div className="bg-white p-12 shadow-2xl rounded-sm border border-slate-200 max-w-3xl mx-auto min-h-[1000px] flex flex-col">
                <div className="border-b-4 border-navy pb-6 mb-8 flex justify-between items-end">
                   <div>
                      <h2 className="text-3xl font-black text-navy uppercase tracking-tighter">Cosmos Evaluation</h2>
                      <p className="text-sm font-bold text-slate-500">{testTitle || "MID-TERM EXAMINATION"}</p>
                   </div>
                   <div className="text-right text-xs font-bold text-slate-400">
                      <p>Time: 60 Minutes</p>
                      <p>Total Marks: 50</p>
                   </div>
                </div>

                <div className="flex-1 space-y-8">
                   {questions.map((q, i) => (
                      <div key={i} className="space-y-3">
                         <p className="font-bold text-navy flex gap-2">
                           <span className="shrink-0 text-slate-400 font-black">{i + 1}.</span>
                           {q.text || "Sample question text will appear here."}
                         </p>
                         <div className="grid grid-cols-2 gap-y-2 ml-6">
                            {q.options.map((opt, oi) => (
                               <p key={oi} className="text-sm text-slate-600 flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-400">{String.fromCharCode(65 + oi)}</span>
                                  {opt || "Empty Option"}
                               </p>
                            ))}
                         </div>
                      </div>
                   ))}
                </div>

                {/* OMR Bubble Sheet at bottom */}
                <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-300">
                   <div className="flex justify-between items-center mb-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Answer Sheet Section</h4>
                      <div className="w-12 h-12 border-2 border-navy"></div> {/* QR code placeholder */}
                   </div>
                   <div className="grid grid-cols-5 gap-4">
                      {Array.from({ length: 20 }).map((_, i) => (
                         <div key={i} className="flex items-center gap-2">
                            <span className="text-[10px] font-bold w-4 text-slate-400">{i + 1}</span>
                            <div className="flex gap-1">
                               {['A', 'B', 'C', 'D'].map(l => (
                                  <div key={l} className="w-3.5 h-3.5 rounded-full border border-slate-800 flex items-center justify-center text-[6px] font-bold">{l}</div>
                               ))}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="flex gap-4 justify-center">
                <button onClick={() => setStep(2)} className="px-8 py-3 bg-white border border-slate-200 rounded-xl font-bold text-navy">Edit Questions</button>
                <button className="px-8 py-3 bg-electric text-white rounded-xl font-bold shadow-lg shadow-electric/20 flex items-center gap-2">
                  <Printer className="w-5 h-5" />
                  Print Test Pack
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TestGenerator
