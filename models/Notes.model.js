const { Schema, model } = require("mongoose");

const notesSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
            trim: true
        },
        content: {
            type: String
        }, 
        category: {
            type: String,
            default:'general'
        },
        pinned: {
            type: Boolean,
            default: false
        },
        user:{
            type: Schema.Types.ObjectId, ref: "User"
        }  
    },
    {
        timestamps: true
    }
);

const Notes = model("Notes", notesSchema);

module.exports = Notes;