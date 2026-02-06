import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        validate: {
            validator: function(value) {
                return value !== value.toUpperCase();
            },
            message: 'Title cannot be entirely uppercase (e.g., "FIRST NOTE" is not allowed).'
        }
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'userId is required']
    }
}, {
    timestamps: true
});

const Note = mongoose.model('Note', noteSchema);
export default Note;