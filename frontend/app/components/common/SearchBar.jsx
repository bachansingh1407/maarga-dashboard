import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full md:w-72">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-slate-700 placeholder-slate-400"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
    </div>
  );
}