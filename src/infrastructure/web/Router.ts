import express, { Request, Response } from "express";
import { LineMessageController } from "../../interfaces/controllers/LineMessageController";
import { MessageProvider } from "../providers/MessageProvider";
import { MiddlewareConfig, middleware } from "@line/bot-sdk";

export class Router {
  private _router: express.Router
  private _lineMessageController: LineMessageController
  private _messageProvider: MessageProvider

  constructor(middlewareConfig: MiddlewareConfig, lineMessageController: LineMessageController, messageProvider: MessageProvider) {
    this._lineMessageController = lineMessageController
    this._messageProvider = messageProvider
    this._router = express.Router()
    this._router.post('/webhook', middleware(middlewareConfig), (req: Request, res: Response) => this._lineMessageController.sendMessage(req, res, this._messageProvider.getMessage()))
  }

  public getRouter() {
    return this._router
  }
}