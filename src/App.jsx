import { useState } from 'react'
import AdminDashboard from './components/AdminDashboard'
import OMRScanner from './components/OMRScanner'
import StudentPortal from './components/StudentPortal'
import ClassManagement from './components/ClassManagement'
import TestGenerator from './components/TestGenerator'
import BulkProcessor from './components/BulkProcessor'
import ReportingEngine from './components/ReportingEngine'
import {
  LayoutDashboard,
  ClipboardList,
  Scan,
  BarChart3,
  Settings,
  LogOut,
  UserCircle,
  Users,
  Printer,
  Layers,
  FileSpreadsheet
} from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'classes', label: 'Class Management', icon: Users },
    { id: 'generator', label: 'Test Generator', icon: Printer },
    { id: 'scanner', label: 'Smart Scanner', icon: Scan },
    { id: 'bulk', label: 'Bulk Processor', icon: Layers },
    { id: 'reports', label: 'Performance Reports', icon: FileSpreadsheet },
    { id: 'student', label: 'Student Portal', icon: UserCircle },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onLaunchScanner={() => setActiveTab('scanner')} />
      case 'classes':
        return <ClassManagement />
      case 'generator':
        return <TestGenerator />
      case 'scanner':
        return <OMRScanner />
      case 'bulk':
        return <BulkProcessor />
      case 'reports':
        return <ReportingEngine />
      case 'student':
        return <StudentPortal />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-off-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-electric rounded-lg flex items-center justify-center">
              <span className="font-bold text-xl">C</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">Cosmos Portal</h1>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-left",
                activeTab === item.id
                  ? "bg-electric text-white shadow-lg shadow-electric/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-white"
              )} />
              <span className="font-medium whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
