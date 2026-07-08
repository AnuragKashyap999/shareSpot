import app from './app.js'
import connectDB from './db/index.js';
import 'dotenv/config'

// connect to the db 

const PORT = process.env.PORT || 8000;

connectDB()
.then(()=>{
    const server = app.listen(PORT,()=>{
        console.log(`Server listen at ${PORT}`)
    })
    server.on("error",(error)=>{
        console.log("Server Errror :", error )
    })
})
.catch((error)=>{
    console.log("MongoDb connection failed !!!",error)
})