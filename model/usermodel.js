const mongoose=require("mongoose")

const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:5,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:34,
    },password:{
        type:String,
        required:true,
        unique:true,
        max:20,
    },photo:{
        type:String,
    },
    blocked: {
        type: Boolean,
        default: false
      }
}
,
{
    timestamps:true
   }
   )

module.exports=mongoose.model("users",userschema)