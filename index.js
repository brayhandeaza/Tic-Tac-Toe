require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const address = require('address')

app.use(express.static("./public"))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(process.env.PORT , process.env.HOST, async () => {
    console.log(`\nListening Local: http://${process.env.HOST}:${process.env.PORT}`)
    await app.listen(process.env.PORT , address.ip(), async () => {
        console.log(`Listening On Your Network: http://${address.ip()}:${process.env.PORT}\n`)
    })
})
