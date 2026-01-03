import { GrGrow } from "react-icons/gr";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2 font-bold text-xl text-slate-700 cursor-default transition-colors">
      <span className="text-slate-700">
        <GrGrow size={20} />
      </span>
      <span>Maarga</span>
    </div>
  );
}
