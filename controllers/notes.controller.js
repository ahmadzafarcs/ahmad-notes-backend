import Note from "../models/notes.model.js";

export async function addNote(req, res) {
    try {
        const {title, content, color, completed=false, pinned=false} = req.body;

        if (!title || !content) {
            throw new Error('Title and content are required.');
        }

        const note = await Note.create({
            userId: req.user.id,
            title,
            content,
            color,
            completed,
            pinned
        });
        
        return res.status(201).json({success: true, message: 'Note added successfully', note});
        
    } catch (error) {
        return res.status(400).json({success: false, message: error.message})
    }
}

export async function getNotes(req, res) {
    try {
        const notes = await Note.find({userId: req.user.id});
        return res.status(200).json({success: true, notes});
    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
}

export default async function updateNote(req, res) {
    try {
        const {title, content, color, completed, pinned} = req.body;

        const updateOneNote = await Note.updateOne({userId: req.user.id, _id: req.params.id}, {
            title,
            content,
            color,
            completed,
            pinned
        });

        return res.status(200).json({success: true, message: 'Note updated successfully'});

    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
}

export async function deleteNote(req, res) {
    try {
        const note = await Note.findOneAndDelete({userId: req.user.id, _id: req.params.id});
        
        if (!note) {
            return res.status(404).json({success: false, message: 'Note not found'});
        }

        return res.status(200).json({success: true, message: 'Note deleted successfully'});
        
    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
}