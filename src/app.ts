import express, { Express } from "express";
import { Router } from "./infrastructure/web/Router";
import { LineMessageController } from "./interfaces/controllers/LineMessageController";
import { SendMessageUsecase } from "./application/use_cases/SendMessageUsecase";
import { MiddlewareConfig } from "@line/bot-sdk";
import { MessageProvider } from "./infrastructure/providers/MessageProvider";
import { LineBotSimpleServerConfig } from "./domain/entities/LineBotSimpleServerConfig";

export class LineBotSimpleServer {
  private _app: Express;

  constructor(clientConfig: LineBotSimpleServerConfig, messageProvider: MessageProvider) {
    const middlewareConfig: MiddlewareConfig = {
      channelSecret: clientConfig.channelSecret!
    }
    const sendMessageUsecase = new SendMessageUsecase(clientConfig)
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