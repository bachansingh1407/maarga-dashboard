"use client";
import { useState } from "react";
import { 
  FaBookOpen, FaBookmark, FaClock, FaSearch, FaPlus, 
  FaStar, FaFilter, FaCalendarAlt, FaTags 
} from "react-icons/fa";

// Constants
const READING_STATS = {
  booksRead: 12,
  pagesToday: 42,
  currentStreak: 7,
  targetPages: 50,
  completionRate: 68,
};

const CURRENT_BOOKS = [
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

const READING_LIST = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", added: "2 days ago" },
  { id: 2, title: "Design Patterns", author: "Erich Gamma", added: "1 week ago" },
  { id: 3, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", added: "3 days ago" },
  { id: 4, title: "Zero to One", author: "Peter Thiel", added: "2 weeks ago" },
];

const DISCOVER_BOOKS = [
  { title: "The Design of Everyday Things", author: "Don Norman", category: "Design" },
  { title: "Thinking in Systems", author: "Donella Meadows", category: "Systems" },
  { title: "The Psychology of Money", author: "Morgan Housel", category: "Finance" },
];

// Reusable Components
const StatCard = ({ label, value, subText, trend }) => {
  const trendColor = trend?.startsWith('+') ? 'text-green-600' : 'text-yellow-600';
  
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-semibold text-slate-600">{value}</p>
      {subText && <p className="text-xs text-gray-500 mt-1">{subText}</p>}
      {trend && <p className={`text-xs mt-1 ${trendColor}`}>{trend}</p>}
    </div>
  );
};

const ProgressBar = ({ progress, label, value, estimatedTime }) => {
  const hoursLeft = Math.round((100 - progress) / 10);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-700">{value}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-slate-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {estimatedTime && (
        <div className="flex justify-between text-xs text-gray-500">
          <span>{progress}% complete</span>
          <span className="flex items-center gap-1">
            <FaClock className="text-xs" /> ~{hoursLeft} hours left
          </span>
        </div>
      )}
    </div>
  );
};

const BookCard = ({ book, onContinue, onUpdate }) => {
  return (
    <div className="shadow p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-md">{book.title}</h3>
          <p className="text-gray-600 text-xs">{book.author}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${book.color}`}>
          {book.category}
        </span>
      </div>

      <ProgressBar 
        progress={book.progress}
        label="Progress"
        value={book.pages}
        estimatedTime={true}
      />

      <div className="flex gap-3 mt-4">
        <button 
          onClick={() => onContinue(book.id)}
          className="flex-1 px-4 py-2 bg-gray-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-500 hover:text-white transition-colors"
        >
          Continue Reading
        </button>
        <button 
          onClick={() => onUpdate(book.id)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
        >
          Update Progress
        </button>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, icon, action }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
      {icon}
      {title}
    </h2>
    {action}
  </div>
);

const AddBookButton = ({ onClick, text = "Add Book", className = "" }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 bg-slate-600 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 ${className}`}
  >
    <FaPlus />
    {text}
  </button>
);

// Main Sections
const StatsSection = ({ readingTime }) => (
  <section className="grid grid-cols-2 md:grid-cols-4 gap-4 font-medium">
    <StatCard 
      label="Books Read"
      value={READING_STATS.booksRead}
      trend="+2 this month"
    />
    <StatCard 
      label="Pages Today"
      value={READING_STATS.pagesToday}
      subText={`${READING_STATS.targetPages} target`}
    />
    <StatCard 
      label="Reading Time"
      value={`${readingTime} min`}
      trend="+15 from yesterday"
    />
    <StatCard 
      label="Completion"
      value={`${READING_STATS.completionRate}%`}
      subText="3 books in progress"
    />
  </section>
);

const CurrentlyReadingSection = ({ onContinue, onUpdate }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
    <SectionHeader 
      title="Currently Reading"
      icon={<FaBookmark className="text-slate-500" />}
      action={<AddBookButton text="Add Book" />}
    />

    <div className="space-y-6">
      {CURRENT_BOOKS.map((book) => (
        <BookCard 
          key={book.id}
          book={book}
          onContinue={onContinue}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  </div>
);

const GoalsSection = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
    <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
      Monthly Goal
    </h2>
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
          <div className="w-3/5 bg-slate-500 h-2 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

const ReadingListSection = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
    <SectionHeader 
      title="Completed books"
      icon={<FaBookmark className="text-slate-500" />}
    />

    <div className="space-y-3">
      {READING_LIST.map((book) => (
        <div key={book.id} className="shadow flex items-start justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
          <div>
            <p className="font-medium text-gray-900">{book.title}</p>
            <p className="text-xs text-gray-500">{book.author}</p>
          </div>
          <span className="text-xs text-gray-400">{book.added}</span>
        </div>
      ))}
    </div>

    <div className="mt-4 pt-4 border-t border-gray-100">
      <button className="w-full py-2 text-center text-gray-600 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:text-gray-700 transition-colors text-sm">
        + Add to reading list
      </button>
    </div>
  </div>
);

const DiscoverBooksSection = ({ onAddBook }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
    <SectionHeader 
      title="Discover New Books"
      action={
        <button className="text-sm text-slate-600 hover:text-slate-800">
          <FaPlus size={14} />
        </button>
      }
    />

    <div className="grid grid-cols-1 gap-4 h-100 overflow-y-scroll">
      {DISCOVER_BOOKS.map((book, index) => (
        <div key={index} className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow">
          <h4 className="font-medium text-gray-900 mb-1">{book.title}</h4>
          <p className="text-xs text-gray-500 mb-3">{book.author}</p>
          <button 
            onClick={() => onAddBook(book.title)}
            className="w-full px-4 py-2 bg-gray-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-500 hover:text-white transition-colors"
          >
            Add to List
          </button>
        </div>
      ))}
    </div>
  </div>
);

// Main Component
export default function ReadingPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [readingTime, setReadingTime] = useState(45);

  const handleContinueReading = (bookId) => {
    console.log("Continue reading book:", bookId);
    // Add modal or API call here
  };

  const handleUpdateProgress = (bookId) => {
    console.log("Update progress for book:", bookId);
    // Add progress update modal here
  };

  const handleAddBook = (bookTitle) => {
    console.log("Add book to list:", bookTitle);
    // Add to reading list logic
  };

  const handleAddNewBook = () => {
    console.log("Add new book");
    // Open add book modal
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-semibold text-slate-600 flex items-center gap-3">
            <FaBookOpen className="text-slate-800" />
            Reading Book
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Track your reading progress and discover new books
          </p>
        </header>

        {/* Stats Section */}
        <StatsSection readingTime={readingTime} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <CurrentlyReadingSection 
              onContinue={handleContinueReading}
              onUpdate={handleUpdateProgress}
            />
            <GoalsSection />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ReadingListSection />
            <DiscoverBooksSection onAddBook={handleAddBook} />
          </div>
        </div>
      </div>
    </div>
  );
}