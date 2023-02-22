const {signup, login, getallusers, deleteuser} =require("../controllers/usercontroller")


const router=require("express").Router()

router.post("/signup",signup)
router.post("/login",login)
router.get('/allusers/:id',getallusers)
router.delete('/:username', deleteuser)
module.exports=router