import express, { Express } from "express";
import { Router } from "./infrastructure/web/Router";
import { LineMessageController } from "./interfaces/controllers/LineMessageController";
import { SendMessageUsecase } from "./application/use_cases/SendMessageUsecase";
import { ClientConfig, MiddlewareConfig } from "@line/bot-sdk";
import { MessageProvider } from "./infrastructure/providers/MessageProvider";

export class LineBotSimpleServer {
  private _app: Express;

  constructor(config: ClientConfig, messageProvider: MessageProvider) {
    const middlewareConfig: MiddlewareConfig = {
      channelSecret: config.channelSecret!
    }
    const sendMessageUsecase = new SendMessageUsecase(config)
    const lineMessageController = new LineMessageController(sendMessageUsecase)
    const router = new Router(middlewareConfig, lineMessageController, messageProvider)

    this._app = express()
    this._app.use(router.getRouter())
  }

  startServer(port: number) {
    this._app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`)
    })
  }
}