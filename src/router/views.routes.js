import express from "express";


const router = express.Router()

router.get("/realtimeproducts3", (req,res) => {
    res.render("realtimeProducts")

})



export default router