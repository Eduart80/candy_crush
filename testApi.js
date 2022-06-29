import express from 'express'
import axios from 'axios'

const app = express()

app.get('/', (req,res )=>{
    res.json("Helloooo")
})




const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`listening on port : ${PORT}`)
})