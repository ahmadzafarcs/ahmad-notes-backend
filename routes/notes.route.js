import { Router } from "express";
import updateNote, { addNote, deleteNote, getNotes } from "../controllers/notes.controller.js";
import { verifyAuth } from "../middlewares/token.middleware.js";

const router = Router();

router.route("/note").post(verifyAuth, addNote)
router.route("/notes").get(verifyAuth, getNotes)
router.route("/note/:id").patch(verifyAuth, updateNote)
router.route("/note/:id").delete(verifyAuth, deleteNote)

export default router;