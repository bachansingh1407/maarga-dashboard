import { FaClock } from "react-icons/fa";

export default function BookCard({ book, onContinue, onUpdate }) {
  return (
    <div className="p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <div>
          <h3 className="font-semibold text-slate-800 text-base">{book.title}</h3>
          <p className="text-slate-500 text-sm">{book.author}</p>
        </div>
        <span className={`px-3 py-1.5 text-xs font-medium rounded-full border ${book.color}`}>
          {book.category}
        </span>
      </div>

      <div className="space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Progress</span>
          <span className="font-medium text-slate-800">{book.pages} pages</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div 
            className="bg-slate-700 h-2 rounded-full transition-all duration-500"
            style={{ width: `${book.progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>{book.progress}% complete</span>
          <span className="flex items-center gap-1">
            <FaClock className="text-xs" />
            ~{Math.round((100 - book.progress) / 10)} hours left
          </span>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button 
          onClick={onContinue}
          className="flex-1 px-4 py-2.5 bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
        >
          Continue Reading
        </button>
        <button 
          onClick={onUpdate}
          className="px-4 py-2.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
        >
          Update
        </button>
      </div>
    </div>
  );
}