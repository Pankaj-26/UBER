const captainModel=require("../models/caption.model");

module.exports.createUser=async ({firstname, lastname, email, password,color,plate,capacity,vehicleType})=>{
    if(!firstname||!email||!password||!plate||!capacity||!vehicleType){
        throw new Error("All fields are required")
    }

    const captain = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain
}