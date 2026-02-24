import React from "react";

function ThoughtCard({ date, text, moodEmoji = "✨" }) {
  // Safely format date
  let formattedDate = "Unknown";

  if (date) {
    const parsed = new Date(date);
    if (!isNaN(parsed)) {
      formattedDate = parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  }

  return (
    <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:border-emerald-500/30 transition-all flex flex-col gap-3 mb-4">
      <div className="flex justify-between items-start">
        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
          {formattedDate}
        </p>
        <span className="text-base bg-zinc-800/50 p-1.5 rounded-lg border border-zinc-700/50 leading-none">
          {moodEmoji}
        </span>
      </div>

      <p className="text-sm text-zinc-300 leading-relaxed break-words whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );
}

export default ThoughtCard;