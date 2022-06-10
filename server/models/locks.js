import mongoose from "mongoose";
const Schema = mongoose.Schema;

const locksSchema = new Schema({
    userid:{
        type:String,
        required:true
    },
   cardo:{
    type:String,
    required:false,
    default:""
   },
   cardt:{
    type:String,
    required:false,
    default:""
   }


})

const Locks = mongoose.model('Locks',locksSchema);
export {Locks}