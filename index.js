const line = require("@line/bot-sdk")
const express = require('express')
const dotenv = require("dotenv")
const app = express() // create Express app

const env =dotenv.config().parsed

// create LINE SDK config from env variables
const lineConfig = {
    channelAccessToken: env.ACCESS_TOKEN,
    channelSecret: env.SECRET_TOKEN
}
//create client
const client = new line.Client(lineConfig)

app.post('/webhook', line.middleware(lineConfig), async (req,res)=>{
    try {
        const events = req.body.events
        console.log('event=>>>>',events)
        return events.length > 0 ? await events.map(item=>handleEvent(item)):res.status(200).send("OK")
        } catch (error){
            res.status(500).end()
        }
})
// event handler
const handleEvent = async(event) =>{
    if(event.type !== 'message'|| event.message.type !=='text'){
        return null
    }
    else if(event.type ==='message'){
        return client.replyMessage(event.replyToken,{type:'text',text:randomText(array)})
    }
}

//create reply text with array and function randomtext
var array = ["วันนี้คุณดวงดีมาก","ซวยแล้วหละ","ระวังโชคลาภหล่นทับ","มีโอกาสถูกหวย!","สุขภาพแข็งแรง!","ความรักสุดปัง","เดินทางอย่างปลอดภัย","วันนี้คุณดวงดีมากๆ"]

function randomText (arr){
    const randomIndex = Math.floor(Math.random()*arr.length)
    const item =arr[randomIndex]
    return item
}

app.listen(4000,()=>{
    console.log('listening on 4000')
})