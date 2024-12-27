const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'Firstname must be at least 3 characters long'],
    },
    lastname: {
      type: String,

      minlength: [3, 'Firstname must be at least 3 characters long'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    soketID: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        minlength: [3, 'color must be 3 characters long'],
      },
      plate: {
        type: String,
        required: true,
        minlength: [3, 'plate number must be 3 characters long'],
      },
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, 'capacity must be at least 1'],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['car', 'motorcycle', 'auto'],
    },
    location:{
        lat:{
            type: Number,
        },
        lng:{
            type: Number,
        }
    }
  },
})

captainSchema.methods.generateAuthToken=function(){
    const token=JsonWebTokenError.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})

    return token;
}

captainSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password, this.password)
}


captainSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
  };
  



const captainModel=mongoose.model('captain',captainSchema)


module.exports=captainModel;