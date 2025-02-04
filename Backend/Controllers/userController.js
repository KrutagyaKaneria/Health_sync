import User from "../models/UserSchema.js";

export const updateUser = async(req,res) => {
    const id = req.params.id
    try{
        const updateUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        res.status(200).json({sucecess:true, message:"Sucessfully updated" , data:updateUser})
    } catch (err) {
        res.status(500).json({sucecess:false, message:"Failed to updated"})
    }
}


export const deleteUser = async(req,res) => {
    const id = req.params.id
    try{
         await User.findByIdAndDelete(id, )
        res.status(200).json({sucecess:true, message:"Sucessfully Deleted",})
    } catch (err) {
        res.status(500).json({sucecess:false, message:"Failed to Delete"})
    }
}


export const getSingleUser = async(req,res) => {
    const id = req.params.id
    try{
        const user = await User.findById(id)
        res.status(200).json({sucecess:true, message:"Sucessfully Found" , data:user})
    } catch (err) {
        res.status(400).json({sucecess:false, message:"Failed to found user"})
    }
}

export const getAllUser = async(req,res) => {
    const id = req.params.id
    try{
        const user = await User.findById({})
        res.status(200).json({sucecess:true, message:"Sucessfully Found" , data:users})
    } catch (err) {
        res.status(400).json({sucecess:false, message:"Not found"})
    }
}