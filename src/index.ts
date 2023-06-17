import express from "express";
import { Router } from "./infrastructure/web/Router";
import { LineMessageController } from "./interfaces/controllers/LineMessageController";
import { SendMessageUsecase } from "./application/use_cases/SendMessageUsecase";
import { ClientConfig, MiddlewareConfig } from "@line/bot-sdk";
import { MessageProvider } from "./infrastructure/providers/MessageProvider";
import { Flex } from "./domain/entities/Flex";
import { Box, Text } from "./domain/entities/content";

export class LineBotSimpleServer {
  constructor(config: ClientConfig, messageProvider: MessageProvider) {
    const app = express()
    // const config: ClientConfig = {
    //   channelAccessToken: 'nJ0SE5VehIKpfDfMnq79ijs2XS7U0FE67OTv973quAVHGQWA8kEzVdh3/fETMrHMbEZQ3bYxVS+eSzc8I/iCiecWgzU/7NlWWRma1REKYaMuxOLTDLlt9+6Xuybe78fqVtF5siIDrQ0q1G3uGz7voAdB04t89/1O/w1cDnyilFU=',
    //   channelSecret: '390bd59925d724b635056d4eebbcb634'
    // }
    const middlewareConfig: MiddlewareConfig = {
      channelSecret: config.channelSecret!
    }

    // const text: Text = {
    //   type: "text",
    //   text: "こんにちわ"
    // }

    // const box: Box = {
    //   type: "box",
    //   layout: "horizontal",
    //   contents: [text]
    // }

    // const message: Flex = {
    //   type: "flex",
    //   altText: "this is flex message",
    //   contents: {
    //     type: "bubble",
    //     body: box
    //   }
    // }
    const sendMessageUsecase = new SendMessageUsecase(config)
    const lineMessageController = new LineMessageController(sendMessageUsecase)
    // const messageProvider = new MessageProvider(message)
    const router = new Router(middlewareConfig, lineMessageController, messageProvider)
    const PORT = 8081

    app.use(router.getRouter())
    app.listen(PORT, () => {
      console.log(`server is running at http://localhost:${PORT}`)
    })
  }
}


