const { validationResult } = require("express-validator")
const captainModel=require("../models/caption.model")
const captainService=require("../services/captain.service");
const blacklistTokenModel = require("../models/blacklistToken.model");



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


module.exports.loginCaptain=async (req, res) => {

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body;

    const captain=await captainModel.findOne({email}).selectlect('+password');

    if(!captain){
        return res.status(401).json({message:'Invalid Email pr passworo'})
    }

    const isMatch=await captain.comparePassword(password);

    if(isMatch){
        return res.status(401).json({message:'Invalid email or password'})
    }

    const token =captain.generateAuthToken();
    res.cooikie("token",token)

    res.status(200).json({token,captain})
    }


    module.exports.getCaptainProfile=async (req,res,next)=>{
        res.status(200).json(req.user);
    }
    


    module.exports.logoutCaptain=async(req,res,next)=>{
        
        const token=req.cookies.token || req.headers.authorization.split(' ')[1];
        
        await blacklistTokenModel.create({token});
        res.clearCookie('token');
    
        res.status(200).json({message:'Logged out successfully'});
    }