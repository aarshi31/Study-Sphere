import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: Number,
        required: true
    },
    experienceLevel:{
        type:Number,
        required:true,
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutor',
        //required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ],
    agency: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Agency" 
    }, // Reference to Agency model
    
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},{timestamps:true});
export const Tutor = mongoose.model("Tutor", tutorSchema);