"use client";
import { useState } from "react";
import { FaUpload, FaCheckCircle, FaClock, FaCalendarAlt, FaChartLine, FaFileImage, FaComment, FaBook } from "react-icons/fa";

export default function SketchPage() {
  const [activeTab, setActiveTab] = useState("current");
  const [selectedImage, setSelectedImage] = useState(null);

  // Sketch tasks
  const sketchTasks = [
    { 
      id: 1, 
      title: "Character Design Concept", 
      description: "Create character concept art for fantasy novel",
      deadline: "Tomorrow", 
      status: "in-progress",
      points: 15,
      proofRequired: true
    },
    { 
      id: 2, 
      title: "Logo Design Draft", 
      description: "Initial logo concepts for startup project",
      deadline: "Today", 
      status: "pending",
      points: 10,
      proofRequired: true
    },
    { 
      id: 3, 
      title: "Storyboard Panels", 
      description: "5 panels for short animation sequence",
      deadline: "In 3 days", 
      status: "upcoming",
      points: 20,
      proofRequired: true
    },
  ];

  // Completed tasks
  const completedTasks = [
    { 
      id: 4, 
      title: "Landscape Study", 
      description: "Mountain landscape with watercolor",
      completedDate: "Yesterday", 
      points: 12,
      proofSubmitted: true,
      rating: 4.5
    },
    { 
      id: 5, 
      title: "UI Wireframes", 
      description: "Mobile app wireframe sketches",
      completedDate: "2 days ago", 
      points: 8,
      proofSubmitted: true,
      rating: 4.0
    },
  ];

  // Weekly summary
  const weeklySummary = {
    completed: 3,
    totalPoints: 32,
    avgRating: 4.3,
    streak: 5
  };

  // Reference materials
  const references = [
    { id: 1, title: "Anatomy Reference", type: "Image", added: "2 days ago" },
    { id: 2, title: "Color Theory Guide", type: "PDF", added: "1 week ago" },
    { id: 3, title: "Perspective Tutorial", type: "Video", added: "3 days ago" },
    { id: 4, title: "Digital Brush Pack", type: "Resource", added: "Yesterday" },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
              <FaBook className="text-purple-600" />
              Sketch Studio
            </h1>
            <p className="text-gray-600 text-sm mt-1">Track your drawing tasks, submit proofs, and review progress</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500">Weekly Points</p>
              <p className="text-xl font-semibold text-purple-600">{weeklySummary.totalPoints}</p>
            </div>
            <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500">Current Streak</p>
              <p className="text-xl font-semibold text-green-600">{weeklySummary.streak} days</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 border-b border-gray-200">
          {["current", "completed", "references"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all ${activeTab === tab
                  ? "bg-white border-t border-l border-r border-gray-200 text-purple-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Tasks */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <FaClock className="text-blue-500" />
                  Current Sketch Tasks
                </h2>
                <span className="text-sm text-gray-500">
                  {sketchTasks.filter(t => t.status === "in-progress").length} in progress
                </span>
              </div>

              <div className="space-y-4">
                {sketchTasks.map((task) => (
                  <div key={task.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{task.title}</h3>
                        <p className="text-gray-600 text-sm">{task.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          task.status === "in-progress" ? "bg-blue-100 text-blue-700" :
                          task.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {task.status}
                        </span>
                        <span className="text-sm text-gray-500">{task.points} points</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCalendarAlt className="text-gray-400" />
                        Deadline: {task.deadline}
                      </div>
                      
                      <div className="flex gap-3">
                        {task.proofRequired && (
                          <label className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer text-sm font-medium flex items-center gap-2">
                            <FaUpload />
                            Upload Proof
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </label>
                        )}
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proof Submission Area */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <FaUpload className="text-green-500" />
                Proof Submission
              </h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {selectedImage ? (
                    <div className="space-y-4">
                      <div className="relative max-w-md mx-auto">
                        <img
                          src={selectedImage}
                          alt="Uploaded proof"
                          className="rounded-lg mx-auto max-h-64 object-contain"
                        />
                        <button
                          onClick={() => setSelectedImage(null)}
                          className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Add a description..."
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                        <div className="flex gap-3 justify-center">
                          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Submit Proof
                          </button>
                          <button
                            onClick={() => setSelectedImage(null)}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <FaFileImage className="text-gray-400 text-4xl mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Upload your sketch proof</p>
                      <p className="text-sm text-gray-500 mb-4">Supported: JPG, PNG, PDF (Max 10MB)</p>
                      <label className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center gap-2">
                        <FaUpload />
                        Choose File
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Progress & References */}
          <div className="space-y-6">
            {/* Weekly Summary */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <FaChartLine className="text-purple-500" />
                Weekly Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-semibold text-gray-900">{weeklySummary.completed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Points</span>
                  <span className="font-semibold text-purple-600">{weeklySummary.totalPoints}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Rating</span>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span className="font-semibold text-gray-900">{weeklySummary.avgRating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Submission Streak</span>
                  <span className="font-semibold text-green-600">{weeklySummary.streak} days</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">This Week's Progress</p>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="w-3/4 bg-green-500 h-2 rounded-full"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">75% of weekly target completed</p>
                </div>
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recently Completed</h3>
              
              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <div key={task.id} className="p-3 border border-gray-100 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-500">{task.description}</p>
                      </div>
                      <span className="text-sm font-medium text-green-600">{task.points} pts</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaCheckCircle className="text-green-500" />
                        {task.completedDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        {task.rating}/5
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reference Materials */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Reference Materials</h3>
              
              <div className="space-y-3">
                {references.map((ref) => (
                  <div key={ref.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded">
                        <FaFileImage className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{ref.title}</p>
                        <p className="text-xs text-gray-500">{ref.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">{ref.added}</span>
                      <button className="block text-xs text-blue-600 hover:text-blue-700 mt-1">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 text-center text-gray-600 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:text-gray-700 transition-colors text-sm">
                + Add Reference
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-purple-50 rounded-xl border border-purple-100 p-6">
              <h3 className="font-medium text-gray-900 mb-2">Performance</h3>
              <p className="text-sm text-gray-600 mb-4">
                You're on track to complete all tasks this week. Keep up the good work!
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Weekly Goal</span>
                  <span className="font-medium text-purple-600">80% completed</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="w-4/5 bg-purple-500 h-2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <FaComment className="text-blue-500" />
            Recent Feedback
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-medium text-gray-900">4.5/5</span>
                </div>
                <div>
                  <p className="text-gray-900 mb-1">"Excellent character proportions and shading"</p>
                  <p className="text-sm text-gray-500">Submitted: Character Design Concept</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-medium text-gray-900">4.0/5</span>
                </div>
                <div>
                  <p className="text-gray-900 mb-1">"Good color choices, consider adding more contrast"</p>
                  <p className="text-sm text-gray-500">Submitted: Logo Design Draft</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add FaStar icon import if not already present
const FaStar = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);