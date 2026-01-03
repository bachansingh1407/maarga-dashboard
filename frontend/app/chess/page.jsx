"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaTrophy,
  FaHistory,
  FaChartLine,
  FaClock,
  FaBook,
  FaPuzzlePiece,
  FaExternalLinkAlt,
  FaChessPawn,
  FaPlus,
} from "react-icons/fa";
import { GiChessKing } from "react-icons/gi";

export default function ChessPage() {
  const [puzzles, setPuzzles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const playerStats = {
    rating: 1580,
    gamesPlayed: 245,
    winRate: 62,
    streak: 5,
    bestRating: 1650,
    accuracy: 78,
  };

  const recentGames = [
    {
      id: 1,
      opponent: "AI Bot (Intermediate)",
      result: "W",
      rating: "+12",
      time: "10 min ago",
      opening: "Italian Game",
      moves: 42,
      review: "Good positional play, but missed a winning tactic on move 24",
    },
    {
      id: 2,
      opponent: "chess_master88",
      result: "L",
      rating: "-8",
      time: "Yesterday",
      opening: "Sicilian Defense",
      moves: 36,
      review: "Lost due to early pawn weakness. Study pawn structures in Sicilian.",
    },
    {
      id: 3,
      opponent: "novice_player",
      result: "W",
      rating: "+6",
      time: "2 days ago",
      opening: "Queen's Gambit",
      moves: 28,
      review: "Excellent endgame technique. Converted advantage efficiently.",
    },
  ];

  const openingPerformance = [
    { name: "Italian Game", games: 45, winRate: 68 },
    { name: "Sicilian Defense", games: 32, winRate: 56 },
    { name: "Queen's Gambit", games: 28, winRate: 71 },
    { name: "French Defense", games: 21, winRate: 48 },
  ];

  const learningResources = [
    { title: "Chess.com Drills", type: "Puzzles", link: "https://www.chess.com/puzzles" },
    { title: "Lichess Studies", type: "Lessons", link: "https://lichess.org/study" },
    { title: "Chessable Free Courses", type: "Courses", link: "https://www.chessable.com/free-chess-courses/" },
    { title: "Chess Tempo Tactics", type: "Puzzles", link: "https://chesstempo.com/" },
  ];

  const chessTips = [
    "Always analyze your games, especially losses",
    "Focus on one opening as White and two as Black",
    "Practice endgames regularly",
    "Calculate at least 3 moves ahead",
    "Keep your king safe",
  ];

  const fetchPuzzles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://lichess.org/api/puzzle/daily");
      const data = await res.json();
      setPuzzles([
        {
          id: 1,
          title: "Daily Puzzle",
          rating: data.puzzle?.rating || 1500,
          themes: data.puzzle?.themes?.join(", ") || "Tactics",
          link: `https://lichess.org/training/${data.puzzle?.id}`,
        },
      ]);
    } catch {
      setPuzzles([
        {
          id: 1,
          title: "Fork Tactics",
          rating: 1200,
          themes: "Fork, Double Attack",
          link: "https://lichess.org/training/fork",
        },
      ]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPuzzles();
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
            <FaChessPawn className="text-slate-600" />
            Chess Analytics
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Review games, analyze performance, and improve your skills
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* Recent Games */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                <FaHistory className="text-slate-500" />
                Recent Games
              </h2>

              <div className="space-y-4">
                {recentGames.map((game) => (
                  <div key={game.id} className="p-4 border border-gray-100 rounded-lg">
                    <div className="flex justify-between items-center mb-3 text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <FaClock /> {game.time}
                      </span>
                      <span className={game.rating.startsWith("+") ? "text-green-600" : "text-red-600"}>
                        {game.rating}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900">{game.opponent}</p>
                    <p className="text-sm text-gray-600">{game.opening} • {game.moves} moves</p>
                    <p className="text-sm text-gray-600 mt-2">{game.review}</p>



                    <div className="flex gap-3 mt-4">
                      <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 text-sm">
                        Analyze Game
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                        Save Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Opening Performance */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                <FaChartLine className="text-slate-500" />
                Opening Performance
              </h2>

              {openingPerformance.map((o, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{o.name}</span>
                    <span className="font-medium">{o.winRate}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="h-2 bg-slate-500 rounded-full" style={{ width: `${o.winRate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Stats */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                <GiChessKing className="text-slate-500" />
                Performance Stats
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Rating</span><span>{playerStats.rating}</span></div>
                <div className="flex justify-between"><span>Games</span><span>{playerStats.gamesPlayed}</span></div>
                <div className="flex justify-between"><span>Win Rate</span><span className="text-green-600">{playerStats.winRate}%</span></div>
                <div className="flex justify-between"><span>Accuracy</span><span>{playerStats.accuracy}%</span></div>
              </div>
            </div>

            {/* Puzzles */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FaPuzzlePiece className="text-slate-500" />
                Daily Puzzles
              </h3>

              {puzzles.map((p) => (
                <Link
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  className="block p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-gray-600">{p.themes}</p>
                </Link>
              ))}
            </div>

            {/* Tips */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                <FaBook className="text-slate-500" />
                Chess Tips
              </h3>
              <button className="text-sm text-slate-600 hover:text-slate-800">
                <FaPlus size={14} />
              </button>
              </div>


              <ul className="space-y-2 text-sm text-gray-700">
                {chessTips.map((tip, i) => (
                  <li key={i} className="flex gap-2">
                    <FaChessPawn className="text-slate-400 mt-1" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Free Resources */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <FaExternalLinkAlt className="text-slate-500" />
            Free Learning Resources
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {learningResources.map((r, i) => (
              <Link key={i} href={r.link} target="_blank" className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                <p className="font-medium">{r.title}</p>
                <p className="text-sm text-gray-500">{r.type}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Improvement Plan */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-4">
            <FaTrophy className="text-slate-500" />
            Improvement Plan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Endgames", "Daily Puzzles", "Rating Target"].map((title, i) => (
              <div key={i} className="p-4 border border-gray-100 rounded-lg">
                <p className="font-medium">{title}</p>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                  <div className="w-2/3 bg-slate-500 h-2 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
