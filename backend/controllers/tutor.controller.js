import { Tutor } from "../models/tutor.model.js";

// admin posts tutor job
export const postTutor = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, agencyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !agencyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const tutor = await Tutor.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            agency: agencyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New tutor profile created successfully.",
            tutor,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// For students to see all tutors
export const getAllTutors = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const tutors = await Tutor.find(query).populate({
            path: "agency"
        }).sort({ createdAt: -1 });
        if (!tutors) {
            return res.status(404).json({
                message: "Tutors not found.",
                success: false
            })
        };
        return res.status(200).json({
            tutors,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getTutorById = async (req, res) => {
    try {
        const tutorId = req.params.id;
        const tutor = await Tutor.findById(tutorId).populate({
            path:"applications"
        });
        if (!tutor) {
            return res.status(404).json({
                message: "Tutors not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin created how many tutors
export const getAdminTutors = async (req, res) => {
    try {
        const adminId = req.id;
        const tutors = await Tutor.find({ created_by: adminId }).populate({
            path:'agency',
            createdAt:-1
        });
        if (!tutors) {
            return res.status(404).json({
                message: "Tutors not found.",
                success: false
            })
        };
        return res.status(200).json({
            tutors,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
