export default function StatCard({ label, value, change, changeColor, icon }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-slate-500">{label}</p>
        <div className="text-slate-400">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-semibold text-slate-800">{value}</p>
      {change && (
        <p className={`text-xs mt-2 ${changeColor}`}>
          {change}
        </p>
      )}
    </div>
  );
}