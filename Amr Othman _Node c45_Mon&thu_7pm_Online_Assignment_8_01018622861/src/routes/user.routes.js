import mongoose, { Schema, model } from 'mongoose';

const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Note title is required'],
            trim: true,
            
            validate: {
                validator: function (value) {
                    return value !== value.toUpperCase();
                },
                message: 'Title should not be entirely uppercase (e.g., use "First Note" instead of "FIRST NOTE")'
            }
        },
        content: {
            type: String,
            required: [true, 'Note content is required'],
            trim: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User', 
            required: [true, 'User ID is required']
        }
    },
    {
        timestamps: true, 
        bufferCommands: false 
    }
);

const Note = mongoose.models.Note || model('Note', noteSchema);

export default Note;