import { Agency } from "../models/agency.model.js";
//import getDataUri from "../utils/datauri.js";
//import cloudinary from "../utils/cloudinary.js";

export const registerAgency = async (req, res) => {
    try {
        const { agencyName } = req.body;
        if (!agencyName) {
            return res.status(400).json({
                message: "Agency name is required.",
                success: false
            });
        }
        let agency = await Agency.findOne({ name: agencyName });
        if (agency) {
            return res.status(400).json({
                message: "You can't register same agency.",
                success: false
            })
        };
        agency = await Agency.create({
            name: agencyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Agency registered successfully.",
            agency,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getAgency = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const agencies = await Agency.find({ userId });
        if (!agencies) {
            return res.status(404).json({
                message: "Agencies not found.",
                success: false
            })
        }
        return res.status(200).json({
            agencies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get agency by id
export const getAgencyById = async (req, res) => {
    try {
        const agencyId = req.params.id;
        const agency = await Agency.findById(agencyId);
        if (!agency) {
            return res.status(404).json({
                message: "Agency not found.",
                success: false
            })
        }
        return res.status(200).json({
            agency,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateAgency = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;
        // here cloudinary 
        //const fileUri = getDataUri(file);
        //const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        //const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location };

        const agency = await Agency.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!agency) {
            return res.status(404).json({
                message: "Agency not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Agency information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}
