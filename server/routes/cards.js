import express  from "express"
const router = express.Router()
import {Cards} from "../models/cards.js"

router.post("/", async (req, res) => {
    try{
        await new Cards({...req.body}).save();
        res.status(201).send({ message: "Card created successfully" });
    }catch(error){
        res.status(500).send(error);
    }

})

router.get("/all", async (req, res) => {
    try{
    let param = req.query.userid
   // let param=req.body.userid
    const card = await Cards.find({userid:param});
    res.status(201).send(card);
    }catch{
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.get("/", async (req, res) => {
    try{
    let param = req.query.userid
   // let param=req.body.userid
    const card = await Cards.find({userid:param});
    res.status(201).send(card);
    }catch{
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.patch("/", async (req, res) => {
    try{
    var conditions = {_id:req.body.id}
    let oid = {lock:req.body.oid}
   // let param=req.body.userid
    const card = await Cards.updateOne(conditions,oid);
    res.status(201).send(card);
    }catch{
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.patch("/update", async (req, res) => {
    try{
    var conditions = {lock:req.body.id}
    var oid = {lock:"no"}
   // let param=req.body.userid
    const card = await Cards.updateMany(conditions,oid);
    res.status(201).send(card);
    }catch{
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.get("/id", async (req, res) => {
    try{
    let param = req.query._id
   // let param=req.body.userid
    const card = await Cards.find({_id:param});
    res.status(201).send(card);
    }catch{
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.get("/allCards", async (req, res) => {
    try{
   // let param=req.body.userid
    const card = await Cards.find({});
    res.status(201).send(card);
    }catch{
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.get("/search", async (req, res) => {
    try{
    let param=req.body.userid
    const card = await Cards.find();
    res.status(201).send(card);
    }catch{
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.delete("/", async (req, res) => {
    try{
        let param = req.query.userid
        const card = await Cards.deleteOne({_id:param});
        res.status(201).send(card);
        }catch{
            res.status(500).send({ message: "Internal Server Error" });
        }
})

export default router