"use client";
import { useState, useEffect } from "react";
import {
  FaBook,
  FaPlay,
  FaClock,
  FaChartLine,
  FaVideo,
  FaFileCode,
  FaExternalLinkAlt,
  FaTag,
  FaPlus,
  FaFilter,
  FaEdit,
  FaCheck,
  FaTimes,
  FaTrash,
  FaCalendar,
  FaFire,
  FaGraduationCap,
  FaCog,
} from "react-icons/fa";

// Constants
const INITIAL_SUBJECTS = [
  {
    id: 1,
    title: "Next.js 14 & App Router",
    category: "Frontend",
    progress: 75,
    resources: 8,
    lastStudied: "Today",
    priority: "high",
    description: "Master the new App Router and server components",
  },
  {
    id: 2,
    title: "TypeScript Advanced Patterns",
    category: "Frontend",
    progress: 45,
    resources: 6,
    lastStudied: "2 days ago",
    priority: "medium",
    description: "Advanced TS patterns for scalable applications",
  },
  {
    id: 3,
    title: "System Design",
    category: "Backend",
    progress: 30,
    resources: 12,
    lastStudied: "1 week ago",
    priority: "medium",
    description: "Design scalable distributed systems",
  },
  {
    id: 4,
    title: "Docker & Kubernetes",
    category: "DevOps",
    progress: 60,
    resources: 10,
    lastStudied: "3 days ago",
    priority: "high",
    description: "Containerization and orchestration",
  },
];

const INITIAL_WEEKLY_STATS = {
  hoursStudied: 18,
  topicsCovered: 5,
  resourcesCompleted: 12,
  streak: 14,
  dailyGoal: 2, // hours
};

const CATEGORIES = ["All", "Frontend", "Backend", "DevOps", "Database", "Cloud", "Tools"];

const PRIORITY_COLORS = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-blue-100 text-blue-700",
};

// Reusable Components
const StatCard = ({ label, value, icon, trend, color = "text-slate-600" }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-gray-500">{label}</p>
      {icon && <div className="text-gray-400">{icon}</div>}
    </div>
    <p className={`text-2xl font-semibold ${color}`}>{value}</p>
    {trend && <p className="text-xs text-green-600 mt-1">{trend}</p>}
  </div>
);

const ProgressBar = ({ progress, showLabel = true, color = "bg-slate-600" }) => (
  <div className="space-y-1">
    {showLabel && (
      <div className="flex justify-between text-xs">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
    )}
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-500`}
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

const PriorityBadge = ({ priority }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${PRIORITY_COLORS[priority] || PRIORITY_COLORS.medium}`}>
    {priority}
  </span>
);

const ResourceItem = ({ resource, onToggle }) => (
  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-3">
      <button
        onClick={() => onToggle(resource.id)}
        className={`w-5 h-5 rounded-full border flex items-center justify-center ${resource.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
      >
        {resource.completed && <FaCheck className="text-white text-xs" />}
      </button>
      <div>
        <span className="text-sm font-medium text-gray-900">{resource.title}</span>
        <span className="text-xs text-gray-500 ml-2">{resource.type}</span>
      </div>
    </div>
    {resource.link && (
      <a href={resource.link} target="_blank" rel="noopener noreferrer">
        <FaExternalLinkAlt className="text-gray-400 hover:text-slate-600" />
      </a>
    )}
  </div>
);

const SectionHeader = ({ title, icon, action }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      {icon}
      {title}
    </h2>
    {action}
  </div>
);

const AddButton = ({ onClick, label = "Add", icon = <FaPlus /> }) => (
  <button
    onClick={onClick}
    className="px-3 py-2 bg-slate-600 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2"
  >
    {icon}
    {label}
  </button>
);

// Main Component
export default function DevLogPage() {
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState(INITIAL_WEEKLY_STATS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [newSubject, setNewSubject] = useState({ title: "", category: "Frontend", priority: "medium" });
  const [studyTime, setStudyTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Resources for selected subject
  const [resources, setResources] = useState({
    1: [
      { id: 1, type: "Course", title: "Next.js Official Docs", completed: true, link: "https://nextjs.org/docs" },
      { id: 2, type: "Video", title: "App Router Deep Dive", completed: true, link: "#" },
      { id: 3, type: "Article", title: "Server Components Guide", completed: false, link: "#" },
      { id: 4, type: "Project", title: "Build a Blog Platform", completed: false, link: "#" },
    ],
    2: [
      { id: 1, type: "Course", title: "TypeScript Handbook", completed: true, link: "https://www.typescriptlang.org/docs" },
      { id: 2, type: "Article", title: "Advanced Generics", completed: false, link: "#" },
    ],
  });

  // Study sessions
  const [recentSessions, setRecentSessions] = useState([
    { id: 1, subject: "Next.js 14", duration: "2h 15m", date: "Today", focus: 85 },
    { id: 2, subject: "TypeScript", duration: "1h 30m", date: "Yesterday", focus: 90 },
    { id: 3, subject: "System Design", duration: "3h", date: "2 days ago", focus: 75 },
  ]);

  // Learning goals
  const [upcomingGoals, setUpcomingGoals] = useState([
    { id: 1, title: "Complete Next.js Course", deadline: "Next week", priority: "high", completed: false },
    { id: 2, title: "Build Portfolio Project", deadline: "2 weeks", priority: "medium", completed: false },
    { id: 3, title: "Learn Docker Deployment", deadline: "3 weeks", priority: "medium", completed: false },
  ]);

  // Random learning suggestion
  const [randomLearning] = useState({
    topic: "JavaScript Event Loop",
    reason: "Understanding async behavior improves debugging & performance",
    estimatedTime: "30–45 min",
    resources: [
      { title: "MDN Event Loop Guide", link: "https://developer.mozilla.org" },
      { title: "Visual Event Loop Explanation", link: "#" },
    ],
  });

  // Filter subjects by category
  const filteredSubjects = activeCategory === "All" 
    ? subjects 
    : subjects.filter(subject => subject.category === activeCategory);

  // Timer functionality
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handlers
  const handleAddSubject = () => {
    if (!newSubject.title.trim()) return;
    
    const newSubjectObj = {
      id: subjects.length + 1,
      ...newSubject,
      progress: 0,
      resources: 0,
      lastStudied: "Never",
      description: "",
    };
    
    setSubjects([...subjects, newSubjectObj]);
    setNewSubject({ title: "", category: "Frontend", priority: "medium" });
    setShowAddSubject(false);
  };

  const handleToggleResource = (subjectId, resourceId) => {
    setResources(prev => ({
      ...prev,
      [subjectId]: prev[subjectId].map(resource =>
        resource.id === resourceId 
          ? { ...resource, completed: !resource.completed }
          : resource
      )
    }));
  };

  const handleStartSession = () => {
    if (!selectedSubject) {
      alert("Please select a subject first!");
      return;
    }
    setIsTimerRunning(true);
  };

  const handleEndSession = () => {
    setIsTimerRunning(false);
    if (studyTime > 0) {
      const hours = Math.floor(studyTime / 3600);
      const minutes = Math.floor((studyTime % 3600) / 60);
      const duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
      
      const newSession = {
        id: recentSessions.length + 1,
        subject: selectedSubject.title,
        duration,
        date: "Just now",
        focus: Math.floor(Math.random() * 30) + 70,
      };
      
      setRecentSessions([newSession, ...recentSessions.slice(0, 2)]);
      setWeeklyStats(prev => ({
        ...prev,
        hoursStudied: prev.hoursStudied + hours + (minutes / 60),
        topicsCovered: prev.topicsCovered + 1,
      }));
      setStudyTime(0);
    }
  };

  const handleToggleGoal = (goalId) => {
    setUpcomingGoals(goals =>
      goals.map(goal =>
        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const handleDeleteSubject = (subjectId) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      setSubjects(subjects.filter(s => s.id !== subjectId));
      if (selectedSubject?.id === subjectId) {
        setSelectedSubject(null);
      }
    }
  };

  const handleUpdateProgress = (subjectId, newProgress) => {
    setSubjects(subjects.map(s =>
      s.id === subjectId ? { ...s, progress: Math.min(100, Math.max(0, newProgress)) } : s
    ));
  };

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Dev Log</h1>
            <p className="text-sm text-gray-600 mt-1">
              Track your learning, progress, and daily development focus
            </p>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Filter */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${activeCategory === category
                        ? 'bg-slate-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowAddSubject(true)}
                className="px-3 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 flex items-center gap-2 text-sm"
              >
                <FaPlus /> Add Subject
              </button>
            </div>

            {/* Add Subject Form */}
            {showAddSubject && (
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-4">Add New Learning Subject</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Subject Title"
                    value={newSubject.title}
                    onChange={(e) => setNewSubject({...newSubject, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={newSubject.category}
                      onChange={(e) => setNewSubject({...newSubject, category: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg"
                    >
                      {CATEGORIES.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <select
                      value={newSubject.priority}
                      onChange={(e) => setNewSubject({...newSubject, priority: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddSubject}
                      className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 flex-1"
                    >
                      Add Subject
                    </button>
                    <button
                      onClick={() => setShowAddSubject(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Learning Subjects */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <SectionHeader
                title="Learning Subjects"
                icon={<FaBook className="text-slate-600" />}
                action={<span className="text-sm text-gray-500">{filteredSubjects.length} subjects</span>}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSubjects.map(subject => (
                  <div
                    key={subject.id}
                    className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${selectedSubject?.id === subject.id
                        ? 'border-slate-300 bg-gray-50'
                        : 'border-gray-100 hover:bg-gray-50'
                      }`}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{subject.title}</h3>
                      <PriorityBadge priority={subject.priority} />
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{subject.category} • {subject.resources} resources</p>
                    
                    <ProgressBar progress={subject.progress} />
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-500">Last studied: {subject.lastStudied}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newProgress = prompt("Enter new progress (0-100):", subject.progress);
                            if (newProgress !== null) {
                              handleUpdateProgress(subject.id, parseInt(newProgress));
                            }
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Update
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSubject(subject.id);
                          }}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources Section */}
            {selectedSubject && resources[selectedSubject.id] && (
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <SectionHeader
                  title={`Resources - ${selectedSubject.title}`}
                  icon={<FaFileCode className="text-slate-600" />}
                  action={
                    <span className="text-sm text-gray-500">
                      {resources[selectedSubject.id].filter(r => r.completed).length} / {resources[selectedSubject.id].length} completed
                    </span>
                  }
                />

                <div className="space-y-3">
                  {resources[selectedSubject.id].map(resource => (
                    <ResourceItem
                      key={resource.id}
                      resource={resource}
                      onToggle={(id) => handleToggleResource(selectedSubject.id, id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Recent Sessions */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <SectionHeader
                title="Recent Study Sessions"
                icon={<FaChartLine className="text-slate-600" />}
                action={<AddButton label="View All" />}
              />
              
              <div className="space-y-4">
                {recentSessions.map(session => (
                  <div key={session.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="font-medium text-gray-900">{session.subject}</span>
                        <span className="text-xs text-gray-500 ml-3">{session.date}</span>
                      </div>
                      <span className="text-sm font-medium text-slate-600">{session.duration}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Focus Level</span>
                        <span>{session.focus}%</span>
                      </div>
                      <ProgressBar progress={session.focus} showLabel={false} color="bg-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Random Learning */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <SectionHeader
                title="Today's Random Learning"
                icon={<FaGraduationCap className="text-slate-600" />}
                action={
                  <button className="text-sm text-slate-600 hover:text-slate-800">
                    <FaCog />
                  </button>
                }
              />

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900">{randomLearning.topic}</h3>
                  <p className="text-sm text-gray-600 mt-2">{randomLearning.reason}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <FaClock className="text-gray-400" />
                    <span className="text-sm text-gray-500">{randomLearning.estimatedTime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Recommended Resources:</p>
                  {randomLearning.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm text-gray-900">{resource.title}</span>
                      <FaExternalLinkAlt className="text-gray-400 text-xs" />
                    </a>
                  ))}
                </div>

                <button className="w-full py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium">
                  Start Learning This Now
                </button>
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <SectionHeader
                title="Learning Goals"
                icon={<FaCalendar className="text-slate-600" />}
                action={<AddButton label="Add Goal" />}
              />

              <div className="space-y-3">
                {upcomingGoals.map(goal => (
                  <div key={goal.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleGoal(goal.id)}
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${goal.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                        >
                          {goal.completed && <FaCheck className="text-white text-xs" />}
                        </button>
                        <div>
                          <p className={`font-medium ${goal.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                            {goal.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            <FaCalendar className="inline mr-1" />
                            {goal.deadline}
                          </p>
                        </div>
                      </div>
                      <PriorityBadge priority={goal.priority} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center gap-2">
                  <FaPlus className="text-slate-600" />
                  <span className="text-sm">Add Resource</span>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center gap-2">
                  <FaChartLine className="text-slate-600" />
                  <span className="text-sm">View Stats</span>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center gap-2">
                  <FaBook className="text-slate-600" />
                  <span className="text-sm">Take Notes</span>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center gap-2">
                  <FaVideo className="text-slate-600" />
                  <span className="text-sm">Record Session</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}