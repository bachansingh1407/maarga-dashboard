"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChessPawn } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { FaPen } from "react-icons/fa6";
import { FaFileCode } from "react-icons/fa6";
import Logo from "../common/Logo";


const NAV_ITEMS = [
  { id: 1, icon: MdSpaceDashboard, url: "/", text: "Dashboard"},
  { id: 2, icon: FaChessPawn, url: "/chess", text: "Chess", },
  { id: 3, icon: RiBook2Fill, url: "/reading", text: "Reading"},
  { id: 4, icon: FaPen, url: "/sketch", text: "Sketch"},
  { id: 5,  icon: FaFileCode,  url: "/dev",  text: "Dev Log"},
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-100 flex flex-col">
      
      {/* Logo */}
      <div className="px-6 py-6">
        <Logo />
      </div>
      {/* Navigation */}
      <nav className="flex-1">
        
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.url;

            return (
              <Link
                key={item.id}
                href={item.url}
                className={`
                  flex items-center gap-3 p-2 font-medium ${isActive && " border-r-3 bg-[#5A7ACD]/10 border-gray-800"}
                `}
              >
                <Icon 
                  size={16} 
                  className={isActive ? "text-[#3F7D58]" : "text-gray-700"} 
                />
                <span className={`text-md ${isActive ? "text-[#3F7D58]" : "text-[#33372C]"}`}>
                  {item.text}
                </span>
                
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100">
        <p className="text-sm text-gray-500 text-center">
          Your journey, your pace
        </p>
      </div>
    </aside>
  );
}