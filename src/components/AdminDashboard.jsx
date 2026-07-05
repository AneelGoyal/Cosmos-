import React from 'react'
import {
  Plus,
  Camera,
  Users,
  FileText,
  Clock,
  TrendingUp,
  MoreVertical,
  Search
} from 'lucide-react'

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      {trend && (
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          {trend}
        </span>
      )}
    </div>
    <div className="mt-4">
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-navy mt-1">{value}</h3>
    </div>
  </div>
)

const AdminDashboard = ({ onLaunchScanner }) => {
  const recentTests = [
    { id: 1, name: "Mid-Term Mathematics", date: "Oct 24, 2023", students: 124, status: "Completed", score: "78%" },
    { id: 2, name: "Physics Unit Test", date: "Oct 25, 2023", students: 86, status: "Scanning In Progress", score: "-" },
    { id: 3, name: "Chemistry Lab Quiz", date: "Oct 26, 2023", students: 92, status: "Draft", score: "-" },
    { id: 4, name: "English Proficiency", date: "Oct 22, 2023", students: 150, status: "Completed", score: "82%" },
  ]

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700'
      case 'Scanning In Progress': return 'bg-amber-100 text-amber-700'
      case 'Draft': return 'bg-slate-100 text-slate-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-slate-500 font-medium">October 27, 2023</p>
          <h2 className="text-2xl font-bold text-navy mt-1">Welcome back, Academy Admin!</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white text-navy border border-slate-200 px-4 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Create New Test
          </button>
          <button
            onClick={onLaunchScanner}
            className="flex items-center gap-2 bg-electric text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-electric/20"
          >
            <Camera className="w-4 h-4" />
            Launch Scanner
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          label="Total Active Students"
          value="1,284"
          trend="+12%"
          color="bg-electric"
        />
        <StatCard
          icon={FileText}
          label="Tests Conducted"
          value="48"
          color="bg-purple-500"
        />
        <StatCard
          icon={Clock}
          label="Pending Papers"
          value="156"
          color="bg-amber-500"
        />
        <StatCard
          icon={TrendingUp}
          label="Avg. Academy Score"
          value="74.2%"
          trend="+4.5%"
          color="bg-emerald-500"
        />
      </div>

      {/* Recent Tests Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-navy">Recent Tests</h3>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tests..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electric/20 focus:border-electric w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Test Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Students</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg. Score</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTests.map((test) => (
                <tr key={test.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-navy">{test.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{test.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{test.students}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusStyle(test.status)}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-navy">{test.score}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-navy transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
          <button className="text-sm font-semibold text-electric hover:underline">View All Tests</button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
