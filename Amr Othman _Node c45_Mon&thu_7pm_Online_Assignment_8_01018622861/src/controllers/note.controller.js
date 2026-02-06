import Note from '../models/Note.model.js';

// 1. Create a Single Note
export const addNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.create({ title, content, userId: req.user._id });
        res.status(201).json({ message: "Note created", note });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 2. Update a single Note by its id (Owner Only)
export const updateNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findOneAndUpdate(
            { _id: noteId, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!note) return res.status(403).json({ message: "You are not the owner or note not found" });
        res.status(200).json({ message: "updated", note });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Replace the entire note document (PUT)
export const replaceNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findOneAndReplace(
            { _id: noteId, userId: req.user._id },
            { ...req.body, userId: req.user._id },
            { new: true }
        );
        if (!note) return res.status(404).json({ message: "Note not found or unauthorized" });
        res.status(200).json({ message: "updated", note });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Update titles of all notes created by a logged-in user
export const updateAllTitles = async (req, res) => {
    try {
        const { title } = req.body;
        const result = await Note.updateMany({ userId: req.user._id }, { title });
        if (result.matchedCount === 0) return res.status(404).json({ message: "No notes found" });
        res.status(200).json({ message: "All notes updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. Delete a single Note by its id
export const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findOneAndDelete({ _id: noteId, userId: req.user._id });
        if (!note) return res.status(404).json({ message: "Note not found or unauthorized" });
        res.status(200).json({ message: "deleted", note });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 6. Retrieve paginated list of notes (Sorted by createdAt descending)
export const getPaginatedNotes = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        const notes = await Note.find({ userId: req.user._id })
            .sort({ createdAt: -1 }) 
            .skip(skip)
            .limit(limit);

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 7. Get a note by its id
export const getNoteById = async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findOne({ _id: noteId, userId: req.user._id });
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 8. Get a note by its content
export const getNoteByContent = async (req, res) => {
    try {
        const { content } = req.query;
        const note = await Note.findOne({
            userId: req.user._id,
            content: { $regex: content, $options: 'i' }
        });
        if (!note) return res.status(404).json({ message: "No note found" });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 9. Retrieves all notes with user email information
export const getNotesWithUser = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id })
            .select('title userId createdAt') 
            .populate('userId', 'email'); 
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 10. Aggregation (Name and Email included)
export const aggregateNotes = async (req, res) => {
    try {
        const { title } = req.query;
        const notes = await Note.aggregate([
            { $match: { 
                userId: req.user._id, 
                title: { $regex: title || "", $options: 'i' } 
            }},
            {
                $lookup: {
                    from: 'users', 
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            { $project: { 
                title: 1, userId: 1, createdAt: 1, 
                "user.name": 1, "user.email": 1 
            }}
        ]);
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 11. Delete all notes for the logged-in user
export const deleteAllNotes = async (req, res) => {
    try {
        await Note.deleteMany({ userId: req.user._id });
        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};