"use client";

import { useState } from "react";
import { FaFeatherAlt } from "react-icons/fa";

export default function DiaryPage() {
    const [entry, setEntry] = useState("");
    const [ideas, setIdeas] = useState("");
    const [closing, setClosing] = useState("");
    const [mood, setMood] = useState("Calm");

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-full px-6 py-10">
            <div className="max-w-7xl mx-auto space-y-6 bg-white shadow p-4 rounded-2xl">

                {/* Header */}
                <header className="space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                        <FaFeatherAlt className="text-gray-500" />
                        Diary
                    </h1>
                    <p className="text-sm text-gray-500">
                        {today} · Mood:{" "}
                        <input
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-600 w-24"
                        />
                    </p>
                </header>

                {/* Main Entry */}
                <section className="space-y-3">
                    <div className="w-full">
                        <h2 className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                            Today’s Thoughts
                        </h2>
                        <hr className="text-slate-300 border border-slate-400 mt-2" />
                    </div>
                    <textarea
                        value={entry}
                        onChange={(e) => setEntry(e.target.value)}
                        placeholder="Write without structure. This space is yours."
                        rows={14}
                        className="w-full resize-none bg-transparent text-[17px] leading-relaxed text-gray-800 placeholder:text-gray-400 focus:outline-none font-serif"
                    />
                </section>

                {/* Ideas / Learning */}
                <section className="space-y-3">
                     <div className="w-full">
                        <h2 className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                            Ideas / Learning
                        </h2>
                        <hr className="text-slate-300 border border-slate-400 mt-2" />
                    </div>
                    
                    <textarea
                        value={ideas}
                        onChange={(e) => setIdeas(e.target.value)}
                        placeholder="Short notes, insights, things to remember."
                        rows={5}
                        className="w-full resize-none bg-transparent text-[15px] leading-relaxed text-gray-700 placeholder:text-gray-400 focus:outline-none font-mono"
                    />
                </section>

                {/* Closing Thought */}
                <section className="space-y-3">
                     <div className="w-full">
                        <h2 className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                            Closing Thought
                        </h2>
                        <hr className="text-slate-300 border border-slate-400 mt-2" />
                    </div>
                  
                    <input
                        value={closing}
                        onChange={(e) => setClosing(e.target.value)}
                        placeholder="One sentence to close the day."
                        className="w-full bg-transparent border-b border-gray-300 text-gray-800 focus:outline-none focus:border-gray-00 pb-1"
                    />
                </section>

                {/* Footer */}
                <footer className="pt-6 text-center text-xs text-gray-400">
                    This page exists only to help you think.
                </footer>
            </div>
        </div>
    );
}
