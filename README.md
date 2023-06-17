if (process.env.CHANNEL_ACCESS_TOKE && process.env.CHANNEL_SECRET) {
  const lineBot = new LineBotSimpleServer('8081', process.env.CHANNEL_ACCESS_TOKE, process.env.CHANNEL_SECRET)
  const message: FlexMessage = {
    type: "flex",
    altText: "",
    contents: {
      type: "bubble",
      header: undefined,
      hero: undefined,
      body: undefined,
      footer: undefined
    }
  }
  lineBot.setMessage(message)
}


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
          "text": "[displayName]さん、こんにちは！omato2"
        }
      ]
    }
  }
}