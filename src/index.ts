import { middleware, ClientConfig, MiddlewareConfig } from "@line/bot-sdk"
import { FlexMessage, Event } from "./types";
import express from 'express'

const https = require('node:https');
const config: ClientConfig = {
  channelAccessToken: 'nJ0SE5VehIKpfDfMnq79ijs2XS7U0FE67OTv973quAVHGQWA8kEzVdh3/fETMrHMbEZQ3bYxVS+eSzc8I/iCiecWgzU/7NlWWRma1REKYaMuxOLTDLlt9+6Xuybe78fqVtF5siIDrQ0q1G3uGz7voAdB04t89/1O/w1cDnyilFU=',
  channelSecret: '390bd59925d724b635056d4eebbcb634'
}
const middleWareConfig: MiddlewareConfig = {
  channelSecret: config.channelSecret!
}
const app = express()

const message: FlexMessage = {
  "type": "flex",
  "altText": "This is a Flex Message",
  "contents": {
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "text",
          "text": "Hello,"
        }
      ]
    }
  }
}

app.post('/webhook', middleware(middleWareConfig), (req, res) => {
  const events: Event[] = req.body.events
  const dataStirng = JSON.stringify({
    replyToken: events[0].replyToken,
    messages: [message]
  })

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.channelAccessToken}`
  }

  const webhookOptions = {
    hostname: 'api.line.me',
    path: '/v2/bot/message/reply',
    method: 'POST',
    headers: headers,
    body: dataStirng
  }

  const request = https.request(webhookOptions, (res: any) => {
    res.on('data', (d: any) => {
      process.stdout.write(d)
    })
  })

  request.on('error', (err: any) => {
    console.error(err)
  })

  request.write(dataStirng)
  request.end()
})

app.listen('8081', () => {
  console.log("Example app listening at http://localhost:8081");
})