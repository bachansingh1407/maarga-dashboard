"use client";
import { useState } from "react";
import { FaCode, FaBook, FaPlay, FaCheckCircle, FaClock, FaCalendarAlt, FaChartLine, FaVideo, FaFileCode, FaExternalLinkAlt, FaTag } from "react-icons/fa";

export default function DevLogPage() {
  const [activeTab, setActiveTab] = useState("current");
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Learning subjects
  const subjects = [
    { 
      id: 1, 
      title: "Next.js 14 & App Router", 
      category: "Frontend",
      progress: 75,
      resources: 8,
      lastStudied: "Today",
      priority: "high"
    },
    { 
      id: 2, 
      title: "TypeScript Advanced Patterns", 
      category: "Frontend",
      progress: 45,
      resources: 6,
      lastStudied: "2 days ago",
      priority: "medium"
    },
    { 
      id: 3, 
      title: "System Design", 
      category: "Backend",
      progress: 30,
      resources: 12,
      lastStudied: "1 week ago",
      priority: "medium"
    },
    { 
      id: 4, 
      title: "Docker & Kubernetes", 
      category: "DevOps",
      progress: 60,
      resources: 10,
      lastStudied: "3 days ago",
      priority: "high"
    },
  ];

  // Learning resources
  const resources = {
    "Next.js 14 & App Router": [
      { id: 1, type: "Course", title: "Next.js Official Docs", link: "https://nextjs.org/docs", completed: true },
      { id: 2, type: "Video", title: "App Router Deep Dive", link: "#", completed: true },
      { id: 3, type: "Article", title: "Server Components Guide", link: "#", completed: false },
      { id: 4, type: "Project", title: "Build a Blog Platform", link: "#", completed: false },
    ],
    "TypeScript Advanced Patterns": [
      { id: 5, type: "Course", title: "TypeScript Handbook", link: "#", completed: true },
      { id: 6, type: "Video", title: "Advanced Types Tutorial", link: "#", completed: true },
      { id: 7, type: "Article", title: "Generics Deep Dive", link: "#", completed: false },
    ]
  };

  // Weekly stats
  const weeklyStats = {
    hoursStudied: 18,
    topicsCovered: 5,
    resourcesCompleted: 12,
    streak: 14
  };

  // Recent study sessions
  const recentSessions = [
    { id: 1, subject: "Next.js 14 & App Router", duration: "2h 15m", date: "Today", focus: 85 },
    { id: 2, subject: "TypeScript", duration: "1h 30m", date: "Yesterday", focus: 90 },
    { id: 3, subject: "System Design", duration: "3h", date: "2 days ago", focus: 75 },
  ];

  // Upcoming goals
  const upcomingGoals = [
    { id: 1, title: "Complete Next.js Course", deadline: "Next week", priority: "high" },
    { id: 2, title: "Build Portfolio Project", deadline: "2 weeks", priority: "medium" },
    { id: 3, title: "Learn Docker Deployment", deadline: "3 weeks", priority: "medium" },
  ];

  const categories = ["Frontend", "Backend", "DevOps", "Database", "Cloud"];

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
              <FaFileCode className="text-blue-600" />
              Dev Log
            </h1>
            <p className="text-gray-600 text-sm mt-1">Track your learning progress, resources, and development journey</p>
          </div>
          
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 border-b border-gray-200">
          {["current", "resources", "progress"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all ${activeTab === tab
                  ? "bg-white border-t border-l border-r border-gray-200 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Subjects & Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Subjects */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <FaBook className="text-blue-500" />
                  Learning Subjects
                </h2>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  + Add Subject
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((subject) => (
                  <div 
                    key={subject.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedSubject?.id === subject.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-100 hover:border-gray-200"
                      }`}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{subject.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            subject.category === "Frontend" ? "bg-blue-100 text-blue-700" :
                            subject.category === "Backend" ? "bg-green-100 text-green-700" :
                            subject.category === "DevOps" ? "bg-purple-100 text-purple-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {subject.category}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            subject.priority === "high" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>
                            {subject.priority}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{subject.resources} resources</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium text-gray-700">{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${subject.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaClock className="text-xs" />
                          Last studied: {subject.lastStudied}
                        </span>
                        <button className="text-blue-600 hover:text-blue-700">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Resources */}
            {selectedSubject && resources[selectedSubject.title] && (
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Resources for {selectedSubject.title}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {resources[selectedSubject.title].filter(r => r.completed).length}/
                    {resources[selectedSubject.title].length} completed
                  </span>
                </div>

                <div className="space-y-3">
                  {resources[selectedSubject.title].map((resource) => (
                    <div 
                      key={resource.id}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${resource.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                          {resource.type === "Course" ? <FaBook /> :
                           resource.type === "Video" ? <FaVideo /> :
                           resource.type === "Article" ? <FaFileCode /> :
                           <FaPlay />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{resource.title}</p>
                          <p className="text-sm text-gray-500">{resource.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs rounded-full ${resource.completed
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                          }`}>
                          {resource.completed ? "Completed" : "Pending"}
                        </span>
                        <a 
                          href={resource.link}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="w-full py-3 text-center text-gray-600 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:text-gray-700 transition-colors">
                    + Add Resource
                  </button>
                </div>
              </div>
            )}

            {/* Study Sessions */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <FaClock className="text-purple-500" />
                Recent Study Sessions
              </h2>
              
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div key={session.id} className="p-4 border border-gray-100 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium text-gray-900">{session.subject}</p>
                        <p className="text-sm text-gray-500">{session.date}</p>
                      </div>
                      <span className="font-semibold text-blue-600">{session.duration}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Focus Level</span>
                        <span className="font-medium text-gray-700">{session.focus}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${session.focus}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Stats & Goals */}
          <div className="space-y-6">
            {/* Weekly Stats */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <FaChartLine className="text-green-500" />
                Weekly Stats
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hours Studied</span>
                  <span className="font-semibold text-gray-900">{weeklyStats.hoursStudied}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Topics Covered</span>
                  <span className="font-semibold text-blue-600">{weeklyStats.topicsCovered}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Resources Completed</span>
                  <span className="font-semibold text-green-600">{weeklyStats.resourcesCompleted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-semibold text-orange-600">{weeklyStats.streak} days</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Weekly Learning Goal</p>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="w-3/4 bg-blue-500 h-2 rounded-full"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">20 hours target (75% completed)</p>
                </div>
              </div>
            </div>

            {/* Upcoming Goals */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Goals</h3>
              
              <div className="space-y-3">
                {upcomingGoals.map((goal) => (
                  <div key={goal.id} className="p-3 border border-gray-100 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{goal.title}</p>
                        <p className="text-sm text-gray-500">Deadline: {goal.deadline}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        goal.priority === "high" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {goal.priority}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="w-1/3 bg-green-500 h-1.5 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <FaTag className="text-purple-500" />
                Learning Categories
              </h3>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900">{category}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {subjects.filter(s => s.category === category).length} subjects
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Notes */}
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
              <h3 className="font-medium text-gray-900 mb-2">Today's Focus</h3>
              <p className="text-sm text-gray-600 mb-4">
                Complete Next.js Server Actions section and practice with a small project.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Today's Progress</span>
                  <span className="font-medium text-blue-600">2h 15m / 4h target</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="w-1/2 bg-blue-500 h-2 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Progress Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Completed</span>
                  </div>
                  <span className="font-medium text-gray-900">6 subjects</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">In Progress</span>
                  </div>
                  <span className="font-medium text-gray-900">4 subjects</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-gray-600">Planned</span>
                  </div>
                  <span className="font-medium text-gray-900">3 subjects</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes & Takeaways */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <FaFileCode className="text-green-500" />
            Recent Takeaways
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Next.js Discovery</h4>
              <p className="text-sm text-gray-600">
                Server Components don't have access to browser APIs, making them ideal for data fetching.
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">TypeScript Tip</h4>
              <p className="text-sm text-gray-600">
                Use discriminated unions with literal types for better type safety in complex state management.
              </p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">System Design</h4>
              <p className="text-sm text-gray-600">
                When designing APIs, always version them from the start to maintain backward compatibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}