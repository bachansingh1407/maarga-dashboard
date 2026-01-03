"use client";

import { useState } from "react";
import {
  FaUpload,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaChartLine,
  FaFileImage,
  FaComment,
  FaBook,
  FaStar,
} from "react-icons/fa";

/* ------------------------------------------------------------------ */
/* DATA (unchanged) */
/* ------------------------------------------------------------------ */

const SKETCH_TASKS = [
  {
    id: 1,
    title: "Character Design Concept",
    description: "Create character concept art for fantasy novel",
    deadline: "Tomorrow",
    status: "in-progress",
    points: 15,
    proofRequired: true,
  },
  {
    id: 2,
    title: "Logo Design Draft",
    description: "Initial logo concepts for startup project",
    deadline: "Today",
    status: "pending",
    points: 10,
    proofRequired: true,
  },
  {
    id: 3,
    title: "Storyboard Panels",
    description: "5 panels for short animation sequence",
    deadline: "In 3 days",
    status: "upcoming",
    points: 20,
    proofRequired: true,
  },
];

const COMPLETED_TASKS = [
  {
    id: 4,
    title: "Landscape Study",
    description: "Mountain landscape with watercolor",
    completedDate: "Yesterday",
    points: 12,
    rating: 4.5,
  },
  {
    id: 5,
    title: "UI Wireframes",
    description: "Mobile app wireframe sketches",
    completedDate: "2 days ago",
    points: 8,
    rating: 4.0,
  },
];

const WEEKLY_SUMMARY = {
  completed: 3,
  totalPoints: 32,
  avgRating: 4.3,
  streak: 5,
};

const REFERENCES = [
  { id: 1, title: "Anatomy Reference", type: "Image", added: "2 days ago" },
  { id: 2, title: "Color Theory Guide", type: "PDF", added: "1 week ago" },
  { id: 3, title: "Perspective Tutorial", type: "Video", added: "3 days ago" },
  { id: 4, title: "Digital Brush Pack", type: "Resource", added: "Yesterday" },
];

/* ------------------------------------------------------------------ */
/* REUSABLE UI */
/* ------------------------------------------------------------------ */

const SectionCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
    <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-4">
      {Icon && <Icon className="text-slate-500" />}
      {title}
    </h2>
    {children}
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    "in-progress": "bg-slate-100 text-slate-700",
    pending: "bg-yellow-100 text-yellow-700",
    upcoming: "bg-gray-100 text-gray-600",
  };

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* PAGE */
/* ------------------------------------------------------------------ */

export default function SketchPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-600 flex items-center gap-3">
            <FaBook className="text-slate-800" />
            Sketch Studio
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Track your drawing tasks, submit proofs, and review progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">

            {/* Tasks */}
            <SectionCard title="Current Sketch Tasks" icon={FaClock}>
              <div className="space-y-4">
                {SKETCH_TASKS.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <StatusBadge status={task.status} />
                        <p className="text-sm text-gray-500">{task.points} pts</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCalendarAlt className="text-gray-400" />
                        {task.deadline}
                      </span>

                      {task.proofRequired && (
                        <label className="px-4 py-2 bg-slate-600 text-white rounded-lg text-sm cursor-pointer hover:bg-slate-700 transition flex items-center gap-2">
                          <FaUpload />
                          Upload Proof
                          <input type="file" className="hidden" onChange={handleUpload} />
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Proof Upload */}
            <SectionCard title="Proof Submission" icon={FaUpload}>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {selectedImage ? (
                  <img src={selectedImage} className="max-h-64 mx-auto rounded-lg" />
                ) : (
                  <>
                    <FaFileImage className="text-4xl text-gray-400 mx-auto mb-3" />
                    <label className="px-6 py-3 bg-slate-600 text-white rounded-lg cursor-pointer inline-flex gap-2 items-center hover:bg-slate-700 transition">
                      <FaUpload /> Choose File
                      <input type="file" className="hidden" onChange={handleUpload} />
                    </label>
                  </>
                )}
              </div>
            </SectionCard>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* Weekly Summary */}
            <SectionCard title="Weekly Summary" icon={FaChartLine}>
              <div className="space-y-3 text-sm font-medium">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="text-slate-700">{WEEKLY_SUMMARY.completed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Points</span>
                  <span className="text-slate-700">{WEEKLY_SUMMARY.totalPoints}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg Rating</span>
                  <span className="flex items-center gap-1 text-slate-700">
                    <FaStar className="text-yellow-500" /> {WEEKLY_SUMMARY.avgRating}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Streak</span>
                  <span className="text-green-600">{WEEKLY_SUMMARY.streak} days</span>
                </div>
              </div>
            </SectionCard>

            {/* Completed */}
            <SectionCard title="Recently Completed">
              <div className="space-y-3">
                {COMPLETED_TASKS.map((task) => (
                  <div key={task.id} className="p-3 border border-gray-100 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.description}</p>
                    <div className="flex justify-between text-xs mt-2">
                      <span className="flex items-center gap-1 text-green-600">
                        <FaCheckCircle /> {task.completedDate}
                      </span>
                      <span className="flex items-center gap-1 text-slate-700">
                        <FaStar className="text-yellow-500" /> {task.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* References */}
            <SectionCard title="Reference Materials">
              <div className="space-y-3">
                {REFERENCES.map((ref) => (
                  <div
                    key={ref.id}
                    className="flex justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{ref.title}</p>
                      <p className="text-xs text-gray-500">{ref.type}</p>
                    </div>
                    <span className="text-xs text-gray-400">{ref.added}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Feedback */}
        <SectionCard title="Recent Feedback" icon={FaComment}>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="font-medium text-gray-900">
              “Excellent character proportions and shading”
            </p>
            <span className="text-sm text-gray-500">
              Character Design Concept
            </span>
          </div>
        </SectionCard>

      </div>
    </div>
  );
}
