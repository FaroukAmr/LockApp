import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cardsSchema = new Schema({
    userid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    access:{
        type:String,
        required:false,
    },
    lock:{
        type:String,
        required:false,
        default:"",
    }


})

const Cards = mongoose.model('Cards',cardsSchema);
export {Cards}