const {signup, login, getallusers, deleteuser} =require("../controllers/usercontroller")
const {report} =require("../controllers/reportcontroller")


const router=require("express").Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/report",report)
router.get('/allusers/:id',getallusers)
router.delete('/:username', deleteuser)
module.exports=router