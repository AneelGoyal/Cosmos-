import React, { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  ChevronDown,
  Award,
  BookOpen,
  PieChart
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

const ReportingEngine = () => {
  const [selectedMonth, setSelectedMonth] = useState('October 2023')

  const subjectPerformance = [
    { name: 'Algebra', score: 85, color: '#2563EB' },
    { name: 'Geometry', score: 62, color: '#8B5CF6' },
    { name: 'Trigonometry', score: 78, color: '#10B981' },
    { name: 'Statistics', score: 45, color: '#F59E0B' },
    { name: 'Calculus', score: 92, color: '#EF4444' },
  ]

  const rankShifts = [
    { name: 'Rahul Sharma', shift: '+3', current: 12, trend: 'up' },
    { name: 'Ananya Iyer', shift: '-1', current: 15, trend: 'down' },
    { name: 'Vikram Singh', shift: '+8', current: 4, trend: 'up' },
    { name: 'Priya Das', shift: '0', current: 1, trend: 'stable' },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-navy">Monthly Performance Engine</h2>
          <p className="text-slate-500 font-medium mt-1">Aggregated analytics and rank tracking across classes.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-navy flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4" />
            {selectedMonth}
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="bg-electric text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-electric/20 hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Monthly Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Subject Weaknesses */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-bold text-navy flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-electric" />
                    Topic-wise performance
                 </h3>
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Across all sections</span>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={subjectPerformance}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                      />
                      <Tooltip
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                      />
                      <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={40}>
                         {subjectPerformance.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-50 p-8 rounded-[32px] border border-emerald-100 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16"></div>
                 <Award className="w-8 h-8 text-emerald-600 mb-4" />
                 <h4 className="text-lg font-bold text-navy mb-2">Top Performing Student</h4>
                 <p className="text-3xl font-black text-emerald-600 mb-1">Priya Das</p>
                 <p className="text-sm font-bold text-emerald-800/60">Consistently ranking #1 this month</p>
              </div>
              <div className="bg-blue-50 p-8 rounded-[32px] border border-blue-100 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16"></div>
                 <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
                 <h4 className="text-lg font-bold text-navy mb-2">Class Average Score</h4>
                 <p className="text-3xl font-black text-blue-600 mb-1">74.2%</p>
                 <p className="text-sm font-bold text-blue-800/60">Up 4.5% compared to September</p>
              </div>
           </div>
        </div>

        {/* Right Column: Rank Shifts */}
        <div className="lg:col-span-1">
           <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col">
              <div className="p-8 border-b border-slate-100">
                 <h3 className="text-xl font-bold text-navy">Student Rank Shifts</h3>
                 <p className="text-sm font-medium text-slate-400 mt-1">Monthly performance volatility</p>
              </div>
              <div className="flex-1 p-6 space-y-4">
                 {rankShifts.map((student, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-50 hover:border-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-bold text-navy">
                            {student.current}
                         </div>
                         <div>
                            <p className="font-bold text-navy text-sm">{student.name}</p>
                            <p className="text-xs font-medium text-slate-400">Current Rank</p>
                         </div>
                      </div>
                      <div className={`flex items-center gap-1 font-black text-sm ${
                        student.trend === 'up' ? 'text-emerald-500' :
                        student.trend === 'down' ? 'text-red-500' : 'text-slate-400'
                      }`}>
                         {student.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                         {student.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                         {student.shift}
                      </div>
                   </div>
                 ))}
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                 <button className="w-full py-3 bg-navy text-white rounded-xl font-bold shadow-lg shadow-navy/10">
                    View Complete Leaderboard
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default ReportingEngine
