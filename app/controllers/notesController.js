const { v4: uuidv4 } = require("uuid");
const dbUtils = require("../utils/dbUtils");

const notesController = {

    //returns the notes.html file
    getNotes: async (req, res) => {
        const notes = await dbUtils.readNotes();
        res.json(notes);
    },
    
    //adds a new note to the db file
    addNote: async (req, res) => {
        try {
            const newNote = req.body;
            newNote.id = uuidv4();
            const notes = await dbUtils.readNotes();
            notes.push(newNote);
            dbUtils.writeNotes(notes);
            res.json(notes);
        } catch (err) {
            console.error("Error writing db.json", err);
            res.status(500).json({ error: "Failed to write note" });
        }
    },
    
    //deletes a note from the db file
    deleteNote: async (req, res) => {
        try {
            const id = req.params.id;
            const notes = await dbUtils.readNotes();
            const updatedNotes = notes.filter((note) => note.id !== id);
            dbUtils.writeNotes(updatedNotes);
            res.json(updatedNotes);
        } catch (err) {
            console.error("Error writing db.json", err);
            res.status(500).json({ error: "Failed to write note" });
        }
     },
};

module.exports = notesController;