const { validationResult } = require("express-validator")
const captainModel=require("../models/caption.model")
const captainService=require("../services/captain.service")



module.exports.registerCaptain=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res,status(400).json({error:errors.array()});
    }

    const {fullname,email,password,vehicle}=req.body;

const isCaptainAlreadyExists=await captainModel.findOne({email})
 
    if(!isCaptainAlreadyExists){
        return res.status(400).json({message:'captain already exists'});
    }



    const hashPassword=await captainModel.hashpassword(password);


    const captain=await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehivleType
    })

    const token =captain.generateAuthToken();
    res.status(200).json({token,captain})
}