import User from "../models/UserSchema.js";

export const updateUser = async(req,res) => {
    const id = req.params.id
    try{
        const updateUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        res.status(200).json({success:true, message:"Sucessfully updated" , data:updateUser})
    } catch (err) {
        res.status(500).json({success:false, message:"Failed to updated"})
    }
}


export const deleteUser = async(req,res) => {
    const id = req.params.id
    try{
         await User.findByIdAndDelete(id, )
        res.status(200).json({success:true, message:"Sucessfully Deleted",})
    } catch (err) {
        res.status(500).json({success:false, message:"Failed to Delete"})
    }
}


export const getSingleUser = async(req,res) => {
    const id = req.params.id
    try{
        const user = await User.findById(id).select("-password");
        res.status(200).json({success:true, message:"user Found" , data:user})
    } catch (err) {
        res.status(400).json({success:false, message:"Failed to found user"})
    }
}

export const getAllUser = async(req,res) => {

    try{
        const users = await User.find({}).select("-password")
        res.status(200).json({success:true, message:"Sucessfully Found" , data:users})
    } catch (err) {
        res.status(400).json({success:false, message:"Not found"})
    }
}

export const getUserProfile = async (req,res) => {
    const userId = req.userId
    try {
        const user = await User.findById(userId)
        if(!user){
            return res. status(404).json({sucecess:false, message:'User not found'})
        }
        const {password, ...rest} = user._doc

        res.status(200).json({success:true, message: "Profile info is getting", data:{...rest}});
    } catch (error) {
        res.status(500).json({success:false, message:"Something went wrong cannot get"});
    }
};

