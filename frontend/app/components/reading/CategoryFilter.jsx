import { FaTags } from "react-icons/fa";

export default function CategoryFilter({ categories, activeFilter, onFilterChange }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-800 flex items-center gap-2">
        <FaTags className="text-emerald-500" />
        Categories
      </h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onFilterChange(category.id)}
            className={`w-full flex justify-between items-center p-3 rounded-lg transition-all ${
              activeFilter === category.id
                ? "bg-slate-800 text-white shadow-sm"
                : "hover:bg-slate-50 text-slate-700"
            }`}
          >
            <span className="font-medium">{category.name}</span>
            <span className={`px-2.5 py-1 text-xs rounded-full ${
              activeFilter === category.id
                ? "bg-white text-slate-800"
                : "bg-slate-100 text-slate-600"
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}