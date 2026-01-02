"use client";
import { useState } from "react";
import { FaBookOpen, FaBookmark, FaClock, FaSearch, FaPlus, FaStar, FaFilter, FaCalendarAlt, FaTags } from "react-icons/fa";

export default function ReadingPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [readingTime, setReadingTime] = useState(45); // minutes today

  // Reading stats
  const readingStats = {
    booksRead: 12,
    pagesToday: 42,
    currentStreak: 7,
    targetPages: 50,
  };

  // Currently reading books
  const currentBooks = [
    {
      id: 1,
      title: "Deep Work",
      author: "Cal Newport",
      progress: 65,
      pages: "250/384",
      category: "Productivity",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      progress: 42,
      pages: "120/286",
      category: "Self-Help",
      color: "bg-green-100 text-green-700",
    },
    {
      id: 3,
      title: "The Pragmatic Programmer",
      author: "David Thomas & Andrew Hunt",
      progress: 80,
      pages: "320/400",
      category: "Technology",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  // Reading list
  const readingList = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin", added: "2 days ago" },
    { id: 2, title: "Design Patterns", author: "Erich Gamma", added: "1 week ago" },
    { id: 3, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", added: "3 days ago" },
    { id: 4, title: "Zero to One", author: "Peter Thiel", added: "2 weeks ago" },
  ];

  // Recently finished
  const finishedBooks = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", rating: 4.5, finished: "Last week" },
    { id: 2, title: "Sapiens", author: "Yuval Noah Harari", rating: 4.8, finished: "2 weeks ago" },
    { id: 3, title: "1984", author: "George Orwell", rating: 4.2, finished: "3 weeks ago" },
  ];

  // Categories
  const categories = [
    { id: "all", name: "All", count: 8 },
    { id: "technology", name: "Technology", count: 3 },
    { id: "productivity", name: "Productivity", count: 2 },
    { id: "fiction", name: "Fiction", count: 2 },
    { id: "self-help", name: "Self-Help", count: 1 },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
              <FaBookOpen className="text-blue-600" />
              Reading Nook
            </h1>
            <p className="text-gray-600 text-sm mt-1">Track your reading progress and discover new books</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500">Today's Reading</p>
              <p className="text-xl font-semibold text-blue-600">{readingTime} min</p>
            </div>
            <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500">Current Streak</p>
              <p className="text-xl font-semibold text-green-600">{readingStats.currentStreak} days</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Books Read</p>
            <p className="text-2xl font-semibold text-blue-600">{readingStats.booksRead}</p>
            <p className="text-xs text-green-600 mt-1">+2 this month</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Pages Today</p>
            <p className="text-2xl font-semibold text-green-600">{readingStats.pagesToday}</p>
            <p className="text-xs text-gray-500 mt-1">{readingStats.targetPages} target</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Reading Time</p>
            <p className="text-2xl font-semibold text-purple-600">{readingTime} min</p>
            <p className="text-xs text-green-600 mt-1">+15 from yesterday</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Completion</p>
            <p className="text-2xl font-semibold text-orange-600">68%</p>
            <p className="text-xs text-yellow-600 mt-1">3 books in progress</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Currently Reading */}
          <div className="lg:col-span-2 space-y-6">
            {/* Currently Reading Section */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  <FaBookmark className="text-blue-500" />
                  Currently Reading
                </h2>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <FaPlus />
                  Add Book
                </button>
              </div>

              <div className="space-y-6">
                {currentBooks.map((book) => (
                  <div key={book.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{book.title}</h3>
                        <p className="text-gray-600 text-sm">{book.author}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${book.color}`}>
                        {book.category}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium text-gray-700">{book.pages} pages</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${book.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{book.progress}% complete</span>
                        <span className="flex items-center gap-1">
                          <FaClock className="text-xs" /> ~{Math.round((100 - book.progress) / 10)} hours left
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                        Continue Reading
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                        Update Progress
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reading Goals */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Goal</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">2 books completed</span>
                    <span className="font-medium text-gray-700">4 books target</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="w-1/2 bg-green-500 h-2 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">1,250 pages read</span>
                    <span className="font-medium text-gray-700">2,000 pages target</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="w-3/5 bg-blue-500 h-2 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reading List & Stats */}
          <div className="space-y-6">
            {/* Reading List */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <FaBookmark className="text-purple-500" />
                Reading List
              </h3>
              
              <div className="space-y-3">
                {readingList.map((book) => (
                  <div key={book.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{book.title}</p>
                      <p className="text-sm text-gray-500">{book.author}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{book.added}</span>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <FaBookmark />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full py-2 text-center text-gray-600 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:text-gray-700 transition-colors text-sm">
                  + Add to reading list
                </button>
              </div>
            </div>

            {/* Recently Finished */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recently Finished</h3>
              <div className="space-y-3">
                {finishedBooks.map((book) => (
                  <div key={book.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{book.title}</p>
                        <p className="text-sm text-gray-500">{book.author}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500 text-sm" />
                        <span className="text-sm font-medium text-gray-700">{book.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{book.finished}</span>
                      <button className="text-blue-600 hover:text-blue-700">
                        Write review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories Filter */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <FaTags className="text-green-500" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`w-full flex justify-between items-center p-3 rounded-lg transition-colors ${activeFilter === category.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "hover:bg-gray-50 text-gray-700"
                      }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${activeFilter === category.id
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                      }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Habit */}
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
              <h3 className="font-medium text-gray-900 mb-2">Daily Habit</h3>
              <p className="text-sm text-gray-600 mb-3">
                You've read for {readingTime} minutes today. Keep going to maintain your streak!
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(readingTime / 60) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-blue-600">75% of goal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Book Search */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Discover New Books</h3>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "The Design of Everyday Things", author: "Don Norman", category: "Design" },
              { title: "Thinking in Systems", author: "Donella Meadows", category: "Systems" },
              { title: "The Psychology of Money", author: "Morgan Housel", category: "Finance" },
            ].map((book, index) => (
              <div key={index} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="mb-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {book.category}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{book.title}</h4>
                <p className="text-sm text-gray-500 mb-3">{book.author}</p>
                <button className="w-full py-2 text-center text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                  Add to List
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}