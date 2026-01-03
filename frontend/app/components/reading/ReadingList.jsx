import { FaBookmark, FaPlus } from "react-icons/fa";

export default function ReadingList({ books, onAddBook }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <FaBookmark className="text-violet-500" />
          Reading List
        </h3>
        <span className="text-sm text-slate-500">{books.length} books</span>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
        {books.map((book) => (
          <div key={book.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-800 truncate">{book.title}</p>
              <p className="text-sm text-slate-500 truncate">{book.author}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 whitespace-nowrap">{book.added}</span>
              <button className="p-2 text-slate-400 hover:text-violet-600 transition-colors">
                <FaBookmark />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <button 
          onClick={onAddBook}
          className="w-full py-3 text-center text-slate-600 border border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
        >
          <FaPlus />
          Add more books
        </button>
      </div>
    </div>
  );
}