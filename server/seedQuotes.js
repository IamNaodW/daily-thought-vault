import mongoose from "mongoose";
import dotenv from "dotenv";
import Quote from "./models/Quote.js"; // Adjust path if your models are in a subfolder

dotenv.config();

const quotes = [
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
  { text: "The privilege of a lifetime is to become who you truly are.", author: "Carl Jung" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  { text: "The wound is the place where the Light enters you.", author: "Rumi" },
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  
  // --- LONGER "THINK PIECES" & DEEP REFLECTIONS ---
  { 
    text: "Everything can be taken from a man but one thing: the last of the human freedoms—to choose one’s attitude in any given set of circumstances, to choose one’s own way.", 
    author: "Viktor Frankl" 
  },
  { 
    text: "It is not the critic who counts; not the man who points out how the strong man stumbles. The credit belongs to the man who is actually in the arena, whose face is marred by dust and sweat and blood.", 
    author: "Theodore Roosevelt" 
  },
  { 
    text: "The journey into self-love is the most difficult thing we will ever do. It is not a destination, but a daily practice of radical honesty and forgiving the versions of yourself that were just trying to survive.", 
    author: "Unknown" 
  },
  { 
    text: "Don’t ask what the world needs. Ask what makes you come alive, and go do it. Because what the world needs is people who have come alive.", 
    author: "Howard Thurman" 
  },
  { 
    text: "You have a limit to your time. If you don't use it to brighten your own spirit and soul, it will be gone and never return, and you will be gone as well.", 
    author: "Marcus Aurelius" 
  },
  { 
    text: "Nature does not hurry, yet everything is accomplished. We are the only creatures who believe we must rush toward the end of a story that is actually meant to be lived in the middle.", 
    author: "Lao Tzu (Adapted)" 
  },
  { 
    text: "The reason we struggle with insecurity is because we compare our behind-the-scenes with everyone else’s main event. Life is not a highlight reel; it is a collection of unedited, messy moments.", 
    author: "Steven Furtick" 
  },
  { 
    text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it. The same is true for your success and your peace.", 
    author: "Rumi" 
  },
  { 
    text: "The cave you fear to enter holds the treasure you seek. We spend our lives avoiding the dark, forgetting that seeds only grow when they are buried in the deep, quiet earth.", 
    author: "Joseph Campbell" 
  },
  { 
    text: "True freedom is not the ability to do whatever you want; it is the strength of character to do what you know is right even when the entire world is screaming at you to do otherwise.", 
    author: "Unknown" 
  },

  // --- SHORT PHILOSOPHICAL HITS ---
  { text: "What you seek is seeking you.", author: "Rumi" },
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
  { text: "Silence is sometimes the most powerful answer.", author: "Dalai Lama" }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing quotes so you don't double them up
    await Quote.deleteMany({});
    console.log("Old quotes cleared.");

    await Quote.insertMany(quotes);
    console.log(`${quotes.length} quotes successfully added to the vault!`);

    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDB();