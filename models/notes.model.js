import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: String,
    content: String,
    color: {
        type: String,
        default: "bg-white"
    },
    completed: {
        type: Boolean,
        default: false
    },
    pinned: {
        type: Boolean,
        default: false
    },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;