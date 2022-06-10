import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import locksRoutes from './routes/locks.js'
import cardsRoutes from './routes/cards.js'
const dbUrl = process.env.DBURL;
const app = express();
app.use(express.json())
app.use(cors())
app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/locks',locksRoutes)
app.use('/api/cards',cardsRoutes)

const CONNECTION_URL=dbUrl
const PORT = process.env.PORT || 1000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Running on port ${PORT}`)))
.catch((error)=>console.log(error.message))



