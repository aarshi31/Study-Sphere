import { Application } from "../models/application.model.js";
import { Tutor } from './../models/tutor.model.js';

export const applyTutor = async (req, res) => {
    try {
        const userId = req.id;
        const tutorId = req.params.id;
        if (!tutorId) {
            return res.status(400).json({
                message: "Tutor id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ tutor: tutorId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            });
        }

        // check if the tutor exists
        const tutor = await Tutor.findById(tutorId);
        if (!tutor) {
            return res.status(404).json({
                message: "Tutor not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            tutor:tutorId,
            applicant:userId,
        });

        tutor.applications.push(newApplication._id);
        await tutor.save();
        return res.status(201).json({
            message:"Tutor applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedTutors = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'tutor',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'agency',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req,res) => {
    try {
        const tutorId = req.params.id;
        const tutor= await Tutor.findById(tutorId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!tutor){
            return res.status(404).json({
                message:'Tutor not found.',
                success:false
            })
        };
        return res.status(200).json({
            tutor, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}