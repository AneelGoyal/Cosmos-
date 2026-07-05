/**
 * Cosmos Portal Service
 * Handles data management for Classes, Sections, Students, Tests, and OMR Processing.
 */

// Mock Database State
const db = {
  classes: [
    { id: 'c9', name: 'Class 9' },
    { id: 'c10', name: 'Class 10' }
  ],
  sections: [
    { id: 's9a', classId: 'c9', name: 'Section A' },
    { id: 's9b', classId: 'c9', name: 'Section B' },
    { id: 's10a', classId: 'c10', name: 'Section A' }
  ],
  students: [
    { id: 'st1', sectionId: 's9a', name: 'Rahul Sharma', roll: '042' },
    { id: 'st2', sectionId: 's9a', name: 'Ananya Iyer', roll: '015' },
    { id: 'st3', sectionId: 's9b', name: 'Vikram Singh', roll: '102' }
  ],
  tests: [
    {
      id: 't1',
      sectionId: 's9a',
      title: 'Mid-Term Mathematics',
      subject: 'Mathematics',
      date: '2023-10-24',
      questions: [
        { id: 1, text: "Value of Pi is approx?", options: ["3.14", "2.71", "1.41", "1.73"], correct: 0 },
        { id: 2, text: "Square root of 144?", options: ["10", "12", "14", "16"], correct: 1 }
      ]
    }
  ],
  results: []
};

export const cosmosApi = {
  // 1. Hierarchy Management
  getClasses: () => db.classes,
  getSections: (classId) => db.sections.filter(s => s.classId === classId),
  getStudents: (sectionId) => db.students.filter(s => s.sectionId === sectionId),

  // 2. Test Generator
  createTest: (testData) => {
    const newTest = { id: `t${Date.now()}`, ...testData };
    db.tests.push(newTest);
    return newTest;
  },
  getTests: (sectionId) => sectionId ? db.tests.filter(t => t.sectionId === sectionId) : db.tests,

  // 3. OMR Processing Simulation
  processBulkUpload: async (file) => {
    // Simulate server delay for CV processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate processing results
    const mockProcessedResults = [
      { studentId: 'st1', testId: 't1', score: 42, total: 50, status: 'Success' },
      { studentId: 'st2', testId: 't1', score: 38, total: 50, status: 'Success' }
    ];

    mockProcessedResults.forEach(res => db.results.push({ ...res, id: `r${Date.now()}${Math.random()}` }));
    return mockProcessedResults;
  },

  // 4. Performance Reporting
  getMonthlyReport: (month, classId) => {
    // Aggregate logic
    const sections = db.sections.filter(s => s.classId === classId);
    const sectionIds = sections.map(s => s.id);
    const tests = db.tests.filter(t => sectionIds.includes(t.sectionId));

    // Simplified aggregation for UI display
    return {
      avgScore: 74.2,
      rankShifts: [
        { name: 'Rahul Sharma', shift: '+3', current: 12 },
        { name: 'Ananya Iyer', shift: '-1', current: 15 }
      ],
      subjectWeaknesses: [
        { subject: 'Algebra', score: 62 },
        { subject: 'Geometry', score: 45 }
      ],
      topPerformers: [
        { name: 'Rahul Sharma', score: 98 },
        { name: 'Priya Das', score: 95 }
      ]
    };
  }
};
