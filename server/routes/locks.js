import express  from "express"
const router = express.Router()
import {Locks} from "../models/locks.js"

router.post("/", async (req, res) => {
    try{
        let param = req.query.userid
        await new Locks({userid:req.body.userid}).save();
        res.status(201).send({ message: "Lock created successfully" });
    }catch{
        res.status(500).send({ message: "Internal Server Error" });
    }

})

router.get("/", async (req, res) => {
    try{
    let param = req.query.userid
    const lock = await Locks.find({userid:param});
    res.status(201).send(lock);
    }catch{
        res.status(500).send({ message: "Internal Server Error" });
    }
})



router.patch("/", async (req, res) => {
    try{
    let conditions = {_id:req.body.id,cardo:""}
    let oid = {cardo:req.body.oid}
    //let param=req.body.userid
    let lock = await Locks.updateOne(conditions,oid);
    if(lock.matchedCount!==0){
        res.status(201).send(lock);
        return;
    }
    conditions = {_id:req.body.id,cardt:""}
    oid = {cardt:req.body.oid}
    lock = await Locks.updateOne(conditions,oid);
    if(lock.matchedCount!==0){
        res.status(201).send(lock);
        return;
    }
    res.status(500).send({ message: "No" });
    }catch{
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.patch("/unassign", async (req, res) => {
    try{
    let conditions = {cardo:req.body.id}
    let oid = {cardo:req.body.oid}
   let lock = await Locks.updateOne(conditions,oid);
    if(lock.matchedCount!==0){
        res.status(201).send(lock);
        return;
    }
     conditions = {cardt:req.body.id}
     oid = {cardt:req.body.oid}
      lock = await Locks.updateOne(conditions,oid);
    if(lock.matchedCount!==0){
        res.status(201).send(lock);
        return;
    }
    
    //let param=req.body.userid
   
    }catch{
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.delete("/", async (req, res) => {
    try{
        let param = req.query.userid
        const lock = await Locks.deleteOne({_id:param});
        res.status(201).send(lock);
        }catch{
            res.status(500).send({ message: "Internal Server Error" });
        }
})

export default router