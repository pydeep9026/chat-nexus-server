const messagemodel = require("../model/mesasgemodel")


module.exports.addmessage=async (req,res,next)=>{
try{
    const {from,to,message}=req.body
    const data=await messagemodel.create({
        message:{text:message},
        users:[from,to], 
        sender:from,
    })
    if(data ) return res.json({msg:"messae added"})
    return res.json({ msg:"failed to add msg"})
}catch(ex){
    next(ex) 
}

}



module.exports.getallmessage=async (req,res,next)=>{
    try{
        const{from,to}=req.body
        const messages=await messagemodel
        .find({
            users:{
                $all:[from,to]
            }  
        })
        .sort({updatedAt:1})
        const projectedmessages=messages.map((msg)=>{
            return{
                fromself:msg.sender.toString()===from,
                message:msg.message.text,
                msgtime:msg.createdAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }),
            }
        })
        res.json(projectedmessages)
    }catch(ex){
        next(ex)
    }
}

module.exports.deletemessage=async (req,next)=>{
    try{
        const receiver = req.params.currentchat; 
        console.log(receiver)  
        await messagemodel.deleteMany({users: receiver});
    }catch(ex){
        next(ex)
    }
}