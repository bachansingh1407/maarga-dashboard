"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChessPawn, FaBars, FaTimes } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { FaPen, FaFileCode } from "react-icons/fa6";
import Logo from "../common/Logo";
import { useState } from "react";

const NAV_ITEMS = [
  { id: 1, icon: MdSpaceDashboard, url: "/", text: "Dashboard" },
  { id: 2, icon: FaChessPawn, url: "/chess", text: "Chess" },
  { id: 3, icon: RiBook2Fill, url: "/reading", text: "Reading" },
  { id: 4, icon: FaPen, url: "/sketch", text: "Sketch" },
  { id: 5, icon: FaFileCode, url: "/dev", text: "Dev Log" },
  { id: 6, icon: FaFileCode, url: "/diary", text: "Diary" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`h-full flex flex-col bg-linear-to-b from-white to-slate-50 border-r border-gray-100 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between px-4 py-4 shrink-0 border-b border-gray-100">
        {isOpen && <Logo />}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
        >
          {isOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <div className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.url;

            return (
              <Link
                key={item.id}
                href={item.url}
                className={`flex items-center gap-3 p-3 rounded-md font-medium transition-colors
                  ${isActive ? "bg-slate-200 text-slate-900 border-l-4 border-slate-600" : "text-gray-700 hover:bg-slate-100 hover:text-slate-900"}
                `}
              >
                <Icon size={18} className={isActive ? "text-slate-600" : "text-gray-500"} />
                {isOpen && <span className="text-md">{item.text}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 shrink-0 text-center">
        {isOpen ? (
          <p className="text-sm text-gray-500">Your journey, your pace</p>
        ) : (
          <div className="text-gray-400 text-xs">⏳</div>
        )}
      </div>
    </aside>
  );
}
