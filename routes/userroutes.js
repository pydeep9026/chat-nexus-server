const {signup, login, getallusers, deleteuser, liveconnections} =require("../controllers/usercontroller")
const {report} =require("../controllers/reportcontroller")


const router=require("express").Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/report",report)
router.get('/allusers/:id',getallusers)
router.get('/connections',liveconnections)
router.delete('/:username', deleteuser)
module.exports=router