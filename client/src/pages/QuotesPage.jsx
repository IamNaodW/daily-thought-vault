import React from "react";

function QuotesPage() {
  // For now, simple placeholder
  const quotes = [
    "The best way to get started is to quit talking and begin doing.",
    "Don’t let yesterday take up too much of today.",
    "It’s not whether you get knocked down, it’s whether you get up."
  ];

  return (
    <div className="flex-1 p-6 overflow-y-auto h-screen bg-zinc-950 text-zinc-200">
      <h2 className="text-emerald-500 font-bold text-xl mb-4">Quotes & Inspirations</h2>
      <div className="flex flex-col gap-4">
        {quotes.map((quote, idx) => (
          <div key={idx} className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
            {quote}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuotesPage;