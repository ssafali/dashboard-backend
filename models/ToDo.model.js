const { Schema, model } = require("mongoose");

const toDoSchema = new Schema(
    {
        content: {
            type: String
        },
        completed:{
            type: Boolean, default:false, required:true
        },
        user:{
            type: Schema.Types.ObjectId, ref: "User"
        }  
    },  
    {
        timestamps: true
    }
);

const ToDo = model("ToDo", toDoSchema);

module.exports = ToDo;