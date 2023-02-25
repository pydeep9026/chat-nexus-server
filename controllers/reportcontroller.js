const reportmodel = require("../model/reportmodel")



module.exports.report=async (req,res,next)=>{
    try{
    const  {reportsenderusername,
            reportrecieverusername,
            reportsenderid,
            reportreceiverid,
            reportreason,}=req.body
    const data=await reportmodel.create({
        reportsenderusername,
        reportrecieverusername,
        reportsenderid,
        reportreceiverid,
        reportreason,
    })
    if(data ) return res.json({msg:"messae added"})
    return res.json({ msg:"failed to add msg"})
    }
    catch(ex){
    next(ex)
    }
}