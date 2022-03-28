const express =require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use("/auth", authRouter)

const start = async() => {
    try {
        app.listen(PORT, () => console.log(`start ${PORT}`))
        await mongoose.connect('mongodb+srv://denis281542:Dd123123@cluster0.we4st.mongodb.net/auth?retryWrites=true&w=majority')
    } catch (e) {
        console.log(e);
    }
}

start()