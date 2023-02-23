const User=require("../model/usermodel")
const bcrypt=require("bcrypt")


module.exports.signup=async (req,res,next)=>{
    try{
        const {username,email,password,photo}=req.body
    const usernamecheck=await User.findOne({username})
    if(usernamecheck)
    return res.json({msg:"username already used",status:false})
    const emailcheck=await User.findOne({email})
    if(emailcheck)
    return res.json({msg:"Entered Email is already registered",status:false})
    const hashedpassword=await bcrypt.hash(password,10)
    const user=await User.create({
        email,
        username,
        password:hashedpassword,
        photo,
    })
    delete user.password
    return res.json({status:true,user})
    }
    catch(ex){
    next(ex)
    }
}

module.exports.login=async (req,res,next)=>{
    try{
        const {username,email,password}=req.body

    const user=await User.findOne({username})
    if(!user)
    return res.json({msg:"This username is not registered!    note: username and email  are case sensitive",status:false})

    const mail=await User.findOne({email})
    if(!mail)
    return res.json({msg:"this email is not registered  note: username and email  are case sensitive",status:false})

    const ispassswordvalid=await bcrypt.compare(password,user.password)
    if(!ispassswordvalid)
    return res.json({msg:"wrong password",status:false})
    delete user.password
    
    return res.json({status:true,user})
    }
    catch(ex){
    next(ex)
    }
}


module.exports.getallusers=async (req,res,next)=>{
    try{
        const users=await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "id",
            "photo",
            "createdAt"
        ])
        return res.json(users)
    }catch(ex){
        next(ex)
    }
}

module.exports.deleteuser=async (req,res,next)=>{
    try{
        const users=await User.deleteOne({ username: req.params.username })
        return res.json(users)
    }catch(ex){
        next(ex)
    }
}
