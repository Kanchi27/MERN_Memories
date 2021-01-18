/* in order to use module imports instead of require , add type=module in package.json*/
import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';  //in order to read .env file
import postRoutes from './routes/posts.js';


const app = express();
dotenv.config();
app.use(bodyparser.json({ limit: "30mb", extended:true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended:true }));
app.use(cors());
//cors should be above Routes
app.use('/posts', postRoutes)
 
//const CONNECTION_URL = 'mongodb+srv://dbAdmin:12345@cluster0.caqpe.mongodb.net/<dbname>?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser:true ,useUnifiedTopology:true})
    .then( ()=> app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((error)=> console.log(error.message));
 //not required but gives warning on console if not specifies useNewUrlParser & useUnifiedTopology

mongoose.set('useFindAndModify', false )