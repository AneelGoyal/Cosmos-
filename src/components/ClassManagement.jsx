import React, { useState, useEffect } from 'react'
import {
  Users,
  ChevronRight,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  GraduationCap
} from 'lucide-react'
import { cosmosApi } from '../lib/cosmosService'

const ClassManagement = () => {
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState(null)
  const [sections, setSections] = useState([])
  const [selectedSection, setSelectedSection] = useState(null)
  const [students, setStudents] = useState([])

  useEffect(() => {
    setClasses(cosmosApi.getClasses())
  }, [])

  useEffect(() => {
    if (selectedClass) {
      setSections(cosmosApi.getSections(selectedClass.id))
      setSelectedSection(null)
      setStudents([])
    }
  }, [selectedClass])

  useEffect(() => {
    if (selectedSection) {
      setStudents(cosmosApi.getStudents(selectedSection.id))
    }
  }, [selectedSection])

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-navy">Class & Section Management</h2>
          <p className="text-slate-500 font-medium mt-1">Organize your academy hierarchy and manage student enrollment.</p>
        </div>
        <button className="bg-electric text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-electric/20 hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add New Class
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              Hierarchy Filter
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Select Class</label>
                <div className="space-y-2">
                  {classes.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedClass(c)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                        selectedClass?.id === c.id
                        ? 'border-electric bg-electric/5 text-electric font-bold'
                        : 'border-slate-100 hover:border-slate-200 text-slate-600'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {selectedClass && (
                <div className="pt-4 border-t border-slate-50">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Select Section</label>
                  <div className="space-y-2">
                    {sections.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSection(s)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                          selectedSection?.id === s.id
                          ? 'border-electric bg-electric/5 text-electric font-bold'
                          : 'border-slate-100 hover:border-slate-200 text-slate-600'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-bold text-navy">
                    {selectedSection ? `${selectedClass?.name} - ${selectedSection.name}` : 'Student List'}
                  </h3>
                  <p className="text-xs font-medium text-slate-400">
                    {students.length} Students Enrolled
                  </p>
                </div>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-electric/20 w-64"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Roll No</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {students.length > 0 ? students.map(student => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-navy">{student.roll}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-600">
                            {student.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-navy">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <div className="flex-1 h-1.5 bg-slate-100 rounded-full w-24">
                              <div className="h-full bg-emerald-500 rounded-full" style={{width: '75%'}}></div>
                           </div>
                           <span className="text-xs font-bold text-emerald-600">75%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">92%</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-navy transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">
                        Select a class and section to view students
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassManagement
