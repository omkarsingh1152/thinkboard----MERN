


import NavBar from "../components/NavBar.jsx";
import { useEffect, useState } from "react";
import RateLimitUI from "../components/RateLimitedUI.jsx";
// import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";
import api from "../lib/axios.js";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");

        setNotes(response.data);
        setIsRateLimited(false);

      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Error fetching notes:");
          console.error("Error fetching notes:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);


  return (
    <div className="min-h-screen">
      <NavBar />

      {isRateLimited && <RateLimitUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;