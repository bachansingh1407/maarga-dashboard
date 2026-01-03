import { FaFire } from "react-icons/fa";
import Logo from "../common/Logo";

export default function Header() {
    const currentStreak = 7; // Example streak
    const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <header className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-6">

            {/* Left: Dashboard & Date */}
            <div className="flex items-center gap-4">
                {/* <Logo /> */}
                <span className="text-sm font-medium text-gray-500">{formattedDate}</span>
            </div>

            {/* Right: Stats, Status & Profile */}
            <div className="flex items-center gap-6">
                {/* Streak */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-orange-200 shadow-xs">
                    <div className="flex items-center gap-1.5">
                        <FaFire className="text-orange-500" />
                        <span className="text-orange-700 font-semibold">{currentStreak}</span>
                    </div>
                    <span className="text-sm text-gray-600">Streak</span>
                </div>

                {/* Status */}
                {/* <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Online</span>
                </div> */}

                {/* Profile */}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                        <span className="text-blue-600 font-medium">M</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">Profile</p>
                        <p className="text-xs text-gray-500">Bachan Singh</p>
                    </div>
                </div>
            </div>
        </header>
    );
}