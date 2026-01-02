"use client"
import { useState, useEffect } from "react";
import { FaBullseye, FaCoffee, FaSun, FaPlus, FaCheck, FaClock, FaFire, FaChartLine, FaHistory, FaTasks, FaCalendarAlt, FaBookOpen, FaChess, FaPen, FaCode } from "react-icons/fa";

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete API integration", completed: false, priority: "high", time: "2h" },
    { id: 2, text: "Review pull requests", completed: true, priority: "medium", time: "1h" },
    { id: 3, text: "Update documentation", completed: false, priority: "low", time: "45m" },
    { id: 4, text: "Fix navigation bug", completed: false, priority: "high", time: "1.5h" },
  ]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(timeString);

      const hour = now.getHours();
      if (hour < 12) setTimeOfDay("morning");
      else if (hour < 17) setTimeOfDay("afternoon");
      else setTimeOfDay("evening");
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const greetings = {
    morning: { emoji: "☀️", text: "Good morning", color: "from-amber-50 to-yellow-50" },
    afternoon: { emoji: "⛅", text: "Good afternoon", color: "from-sky-50 to-blue-50" },
    evening: { emoji: "🌙", text: "Good evening", color: "from-indigo-50 to-purple-50" }
  };

  const currentGreeting = greetings[timeOfDay];

  // Today's focus
  const todayFocus = {
    primary: "Complete the API integration",
    secondary: "Review pull requests"
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const stats = {
    focusHours: 4.2,
    tasksCompleted: 8,
    streakDays: 7,
    productivity: 82
  };

  const energyLevel = 7; // out of 10

  const quickActions = [
    { id: 1, icon: FaBullseye, label: "Today's Focus", color: "bg-blue-100 text-blue-600", url: "/" },
    { id: 2, icon: FaChartLine, label: "View Stats", color: "bg-green-100 text-green-600", url: "/stats" },
    { id: 3, icon: FaHistory, label: "Recent Activity", color: "bg-purple-100 text-purple-600", url: "/activity" },
  ];

  // Activity from different pages
  const recentActivity = [
    { id: 1, icon: FaBookOpen, page: "Reading", action: "Finished 'Clean Code' chapter", time: "2h ago" },
    { id: 2, icon: FaChess, page: "Chess", action: "Won against AI (Intermediate)", time: "Yesterday" },
    { id: 3, icon: FaPen, page: "Sketch", action: "Started new character design", time: "2 days ago" },
    { id: 4, icon: FaCode, page: "Dev Log", action: "Updated project docs", time: "3 days ago" },
  ];

  // Upcoming events
  const upcomingEvents = [
    { id: 1, title: "Team Meeting", time: "10:00 AM", location: "Zoom" },
    { id: 2, title: "Code Review", time: "2:00 PM", location: "GitHub" },
    { id: 3, title: "Reading Session", time: "6:00 PM", location: "Reading Nook" },
  ];

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: tasks.length + 1,
        text: newTask,
        completed: false,
        priority: "medium",
        time: "1h"
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Section */}

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome Bachan</h1>
            <p className="text-gray-600 text-sm">Ready to make today productive?</p>
          </div>
          <div className="flex items-center gap-2 text-sm bg-gray-100 border border-gray-300 px-2 py-1 rounded-2xl font-light text-gray-800">
            <FaClock className=" text-green-500" />
            {currentTime}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Focus Hours</p>
            <p className="text-2xl font-semibold text-blue-600">{stats.focusHours}h</p>
            <p className="text-xs text-green-600 mt-1">+1.2h from yesterday</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Tasks Done</p>
            <p className="text-2xl font-semibold text-green-600">{stats.tasksCompleted}</p>
            <p className="text-xs text-green-600 mt-1">2 remaining</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Productivity</p>
            <p className="text-2xl font-semibold text-purple-600">{stats.productivity}%</p>
            <p className="text-xs text-green-600 mt-1">Optimal level</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Energy Level</p>
            <p className="text-2xl font-semibold text-orange-600">{energyLevel}/10</p>
            <p className="text-xs text-yellow-600 mt-1">Good for focus</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Tasks & Focus */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Focus */}
            <div className="mb-8">
              <div className="border-l-4 border-blue-500 pl-4 mb-3">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Today's Focus</h2>
              </div>

              <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6">
                <div className="mb-4">
                  <p className="text-lg text-gray-800 leading-relaxed">{todayFocus.primary}</p>
                  <p className="text-sm text-gray-500 mt-1">{todayFocus.secondary}</p>
                </div>

                {/* Simple progress indicator */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(energyLevel / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{energyLevel}/10 energy</span>
                </div>
              </div>
            </div>


            {/* Todo List */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <FaTasks className="text-green-500" />
                  Task List
                </h2>
                <span className="text-sm text-gray-500">
                  {tasks.filter(t => t.completed).length}/{tasks.length} completed
                </span>
              </div>

              {/* Add Task */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  placeholder="Add a new task..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={addTask}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaPlus />
                </button>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-xl border ${task.completed ? 'border-green-100 bg-green-50' : 'border-gray-100'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center ${task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                          }`}
                      >
                        {task.completed && <FaCheck className="text-white text-xs" />}
                      </button>
                      <div>
                        <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                          {task.text}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                            {task.priority}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <FaClock className="text-xs" /> {task.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Activity & Tools */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-6">
                <FaHistory className="text-purple-500" />
                Recent Activity
              </h2>

              <div className="space-y-4 h-70 overflow-y-scroll">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <Icon className="text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-600">{activity.action}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{activity.page}</span>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Tools */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">Quick Tools</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center gap-2 p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors border border-amber-100">
                  <FaCoffee className="text-amber-600 text-xl" />
                  <span className="text-sm font-medium text-gray-700">Take Break</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors border border-blue-100">
                  <FaSun className="text-blue-600 text-xl" />
                  <span className="text-sm font-medium text-gray-700">Day Mode</span>
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <FaCalendarAlt className="text-green-500" />
                  Today's Schedule
                </h2>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaClock className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.time} • {event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Motivation Section */}
        <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
          <div className="text-center">
            <p className="text-xl text-gray-800 font-medium mb-2">"Progress, not perfection."</p>
            <p className="text-gray-600">Keep moving forward, one step at a time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}