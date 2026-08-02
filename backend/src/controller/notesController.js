import Note from "../models/Note.js";

async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Error fetching notes", error });
    }
};

async function getNoteById(req, res) {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note:", error);
        res.status(500).json({ message: "Error fetching note", error });
    }
}

async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Error creating note", error });
    }
}

async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const { id } = req.params;
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: "note not found !" })
        }

        res.status(200).json({ message: "note updated successfully !", updatedNote })
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Error updating note", error });
    }
}

async function deleteNote(req, res) {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: "note not found !" });
        }
        res.status(200).json({ message: `note with id ${id} deleted successfully !` });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Error deleting note", error });
    }
}

export {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
}