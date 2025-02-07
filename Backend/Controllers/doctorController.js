import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async(req,res) => {
    const id = req.params.id;
    try{
        const updateDoctor = await Doctor.findByIdAndUpdate(id, {$set : req.body}, {new:true})
        res.status(200).json({sucecess:true, message:"Sucessfully updated" , data:updateDoctor})
    } catch (err) {
        res.status(500).json({sucecess:false, message:"Failed to updated"})
    }
}


export const deleteDoctor = async(req,res) => {
    const id = req.params.id
    try{
         await Doctor.findByIdAndDelete(id, )
        res.status(200).json({sucecess:true, message:"Sucessfully Deleted",})
    } catch (err) {
        res.status(500).json({sucecess:false, message:"Failed to Delete"})
    }
}


export const getSingleDoctor = async(req,res) => {
    const id = req.params.id
    try{
        const doctor = await Doctor.findById(id).populate('reviews').select("-password");
        res.status(200).json({sucecess:true, message:"Sucessfully Found" , data:doctor})
    } catch (err) {
        res.status(400).json({sucecess:false, message:"Failed to found user"})
    }
}

export const getAllDoctor = async(req,res) => {

    try{

        const {query} = req.query
        let doctors;

        if(query){
            doctors = await Doctor.find({
                isApproved:"approved",
                $or: [{name:{$regex: query , $options: "i"}},
                    {specialization: { $regex: query, $options: "i"}},
                ]
        }).select("-password");
        } else{
             doctors = await Doctor.find ({isApproved:"approved"}).select("-password");
        }

        

        res.status(200).json({sucecess:true, message:"User Found" , data:doctors})
    } catch (err) {
        res.status(400).json({sucecess:false, message:"Not found"})
    }
}