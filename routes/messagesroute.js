const {addmessage,getallmessage,deletemessage} =require("../controllers/messagescontroller")


const router=require("express").Router()

router.post("/addmsg",addmessage)
router.post("/getmsg",getallmessage)
router.delete("/:currentchat",deletemessage)


module.exports=router