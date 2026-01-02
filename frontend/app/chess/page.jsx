"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaChessBoard, FaTrophy, FaRobot, FaHistory, FaChartLine, FaClock, FaBook, FaPuzzlePiece, FaStar, FaExternalLinkAlt, FaChessPawn } from "react-icons/fa";
import { GiChessKing, GiChessQueen, GiChessRook, GiChessBishop, GiChessKnight, GiChessPawn } from "react-icons/gi";

export default function ChessPage() {
  const [activeTab, setActiveTab] = useState("games");
  const [puzzles, setPuzzles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Player stats
  const playerStats = {
    rating: 1580,
    gamesPlayed: 245,
    winRate: 62,
    streak: 5,
    bestRating: 1650,
    accuracy: 78,
  };

  // Recent games
  const recentGames = [
    { 
      id: 1, 
      opponent: "AI Bot (Intermediate)", 
      result: "W", 
      rating: "+12", 
      time: "10 min ago",
      opening: "Italian Game",
      moves: 42,
      accuracy: 85,
      review: "Good positional play, but missed a winning tactic on move 24"
    },
    { 
      id: 2, 
      opponent: "chess_master88", 
      result: "L", 
      rating: "-8", 
      time: "Yesterday",
      opening: "Sicilian Defense",
      moves: 36,
      accuracy: 72,
      review: "Lost due to early pawn weakness. Study pawn structures in Sicilian."
    },
    { 
      id: 3, 
      opponent: "novice_player", 
      result: "W", 
      rating: "+6", 
      time: "2 days ago",
      opening: "Queen's Gambit",
      moves: 28,
      accuracy: 88,
      review: "Excellent endgame technique. Converted small advantage efficiently."
    },
  ];

  // Performance by opening
  const openingPerformance = [
    { name: "Italian Game", games: 45, wins: 30, draws: 5, losses: 10, winRate: 68 },
    { name: "Sicilian Defense", games: 32, wins: 18, draws: 4, losses: 10, winRate: 56 },
    { name: "Queen's Gambit", games: 28, wins: 20, draws: 3, losses: 5, winRate: 71 },
    { name: "French Defense", games: 21, wins: 10, draws: 4, losses: 7, winRate: 48 },
  ];

  // Learning resources (free)
  const learningResources = [
    { title: "Chess.com Drills", type: "Puzzles", link: "https://www.chess.com/puzzles", free: true },
    { title: "Lichess Studies", type: "Lessons", link: "https://lichess.org/study", free: true },
    { title: "Chessable Free Courses", type: "Courses", link: "https://www.chessable.com/free-chess-courses/", free: true },
    { title: "Chess Tempo Tactics", type: "Puzzles", link: "https://chesstempo.com/", free: true },
    { title: "YouTube - ChessNetwork", type: "Video", link: "https://www.youtube.com/@ChessNetwork", free: true },
    { title: "365Chess Openings", type: "Database", link: "https://www.365chess.com/opening.php", free: true },
  ];

  // Chess tips & tricks
  const chessTips = [
    "Always analyze your games, especially losses",
    "Focus on one opening as White and two as Black",
    "Practice endgames - they decide many games",
    "Calculate at least 3 moves ahead in tactics",
    "Control the center, develop pieces, then castle",
    "Don't move the same piece twice in opening",
    "Trade when you're ahead in material",
    "Keep your king safe at all costs",
  ];

  // Fetch chess puzzles from Lichess API (free)
  const fetchPuzzles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://lichess.org/api/puzzle/daily');
      const data = await response.json();
      setPuzzles([{
        id: 1,
        title: "Daily Puzzle",
        rating: data.puzzle?.rating || 1500,
        themes: data.puzzle?.themes?.join(", ") || "Tactics",
        solution: data.game?.pgn || "Check the solution on Lichess",
        link: `https://lichess.org/training/${data.puzzle?.id}`
      }]);
    } catch (error) {
      console.error("Error fetching puzzles:", error);
      // Fallback puzzles if API fails
      setPuzzles([
        {
          id: 1,
          title: "Fork Tactics",
          rating: 1200,
          themes: "Fork, Double Attack",
          solution: "Nf6+ forking king and rook",
          link: "https://lichess.org/training/fork"
        },
        {
          id: 2,
          title: "Pin & Win",
          rating: 1400,
          themes: "Pin, Material Gain",
          solution: "Bb5 pinning knight to king",
          link: "https://lichess.org/training/pin"
        }
      ]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPuzzles();
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
              <FaChessPawn className="text-purple-600" />
              Chess Analytics
            </h1>
            <p className="text-gray-600 text-sm mt-1">Review games, analyze performance, and improve your skills</p>
          </div>
        </div>

        {/* Tabs */}
        {/* <div className="flex space-x-1 border-b border-gray-200">
          {["games", "puzzles", "analysis", "resources"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all ${activeTab === tab
                  ? "bg-white border-t border-l border-r border-gray-200 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div> */}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Games & Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Games */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <FaHistory className="text-purple-500" />
                  Recent Games Analysis
                </h2>
                <span className="text-sm text-gray-500">
                  {recentGames.length} games reviewed
                </span>
              </div>

              <div className="space-y-4 h-150 overflow-y-scroll">
                {recentGames.map((game) => (
                  <div key={game.id} className="p-4 border border-gray-200 rounded-lg bg-purple-50 shadow transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-700 text-md">{game.opponent}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${game.result === "W"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                            }`}>
                            {game.result === "W" ? "Win" : "Loss"}
                          </span>
                          <span className="text-xs text-gray-600">{game.opening}</span>
                          <span className="text-xs text-gray-500">{game.moves} moves</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-md font-semibold ${game.rating.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {game.rating}
                        </div>
                        {/* <div className="text-sm text-gray-500">Accuracy: {game.accuracy}%</div> */}
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Review:</span> {game.review}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaClock className="text-gray-400" />
                        {game.time}
                      </div>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                          Analyze Game
                        </button>
                        <button className="px-4 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                          Save Review
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Opening Performance */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8 flex items-center gap-2">
                <FaChartLine className="text-green-500" />
                Opening Performance
              </h2>
              
              <div className="space-y-4">
                {openingPerformance.map((opening, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-gray-900">{opening.name}</span>
                        <span className="text-sm text-gray-500 ml-3">{opening.games} games</span>
                      </div>
                      <span className="font-medium text-green-600">{opening.winRate}% win rate</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${opening.winRate > 60 ? 'bg-green-500' : opening.winRate > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${opening.winRate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{opening.wins}W - {opening.draws}D - {opening.losses}L</span>
                      <span>Success: {opening.winRate > 60 ? 'Strong' : opening.winRate > 50 ? 'Average' : 'Needs Work'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Stats & Resources */}
          <div className="space-y-6">
            {/* Player Stats */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8 flex items-center gap-2">
                <GiChessKing className="text-blue-500" />
                Performance Stats
              </h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Rating</span>
                  <span className="font-semibold text-gray-900">{playerStats.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Games Played</span>
                  <span className="font-semibold text-gray-900">{playerStats.gamesPlayed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Win Rate</span>
                  <span className="font-semibold text-green-600">{playerStats.winRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-semibold text-orange-600">{playerStats.streak} wins</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Best Rating</span>
                  <span className="font-semibold text-purple-600">{playerStats.bestRating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Accuracy</span>
                  <span className="font-semibold text-blue-600">{playerStats.accuracy}%</span>
                </div>
              </div>
            </div>

            {/* Chess Puzzles */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <FaPuzzlePiece className="text-purple-500" />
                  Daily Puzzles
                </h3>
                <button 
                  onClick={fetchPuzzles}
                  disabled={isLoading}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm disabled:opacity-50"
                >
                  {isLoading ? "Loading..." : "Refresh"}
                </button>
              </div>
              
              <div className="space-y-3">
                {puzzles.map((puzzle) => (
                  <div key={puzzle.id} className="p-4 border border-gray-100 rounded-lg bg-linear-to-r from-purple-50 to-pink-50">
                    <div className="flex flex-col gap-3 mb-2">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-900">{puzzle.title}</p>
                        <p className="text-xs text-gray-600">Rating: {puzzle.rating}</p>
                      </div>
                      <span className="px-2 py-1 bg-white border border-gray-200 text-purple-700 text-xs rounded-md">
                        {puzzle.themes}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">Hint:</span> {puzzle.solution.substring(0, 150)}...
                    </p>
                    <Link
                      href={puzzle.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block text-center py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      Solve Puzzle
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Chess Tips */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8 flex items-center gap-2">
                <FaBook className="text-green-500" />
                Chess Tips & Tricks
              </h3>
              
              <div className="space-y-3 overflow-y-scroll h-90">
                {chessTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded">
                      <FaChessPawn className="text-green-600 text-lg" />
                    </div>
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

         {/* Free Resources */}
            <div className="bg-blue-50 rounded-xl border border-gray-200 p-6">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <FaExternalLinkAlt className="text-blue-600" />
                Free Learning Resources
              </h3>
              
              <div className="space-y-3 flex flex-wrap justify-evenly gap-3">
                {learningResources.map((resource, index) => (
                  <Link
                    key={index}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-white border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors w-90"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{resource.title}</p>
                        <p className="text-sm text-gray-500">{resource.type}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        Free
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

        {/* Improvement Plan */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8 flex items-center gap-2">
            <FaTrophy className="text-orange-500" />
            Improvement Plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-orange-100 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Current Focus</h4>
              <p className="text-sm text-gray-600">Improve endgame technique and Sicilian Defense</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full h-2">
                  <div className="w-3/4 bg-orange-500 h-2 rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-orange-600">75%</span>
              </div>
            </div>
            
            <div className="p-4 border border-green-100 bg-green-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Weekly Goal</h4>
              <p className="text-sm text-gray-600">Solve 15 puzzles daily, analyze 3 games</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full h-2">
                  <div className="w-2/3 bg-green-500 h-2 rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-green-600">67%</span>
              </div>
            </div>
            
            <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Rating Target</h4>
              <p className="text-sm text-gray-600">Reach 1700 rating by end of month</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full h-2">
                  <div className="w-1/2 bg-blue-500 h-2 rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-blue-600">50%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}