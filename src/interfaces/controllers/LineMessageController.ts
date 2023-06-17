import { Request, Response } from "express";
import { Carousel } from "../../domain/entities/Carousel";
import { Flex } from "../../domain/entities/Flex";
import { Event } from "../../domain/entities/Event";
import { SendMessageUsecase } from "../../application/use_cases/SendMessageUsecase";

export class LineMessageController {
  private _sendMessageUsecase: SendMessageUsecase

  constructor(sendMessageUsecase: SendMessageUsecase) {
    this._sendMessageUsecase = sendMessageUsecase
  }

  public async sendMessage(req: Request, res: Response, message: Flex | Carousel) {
    const event: Event = req.body.events[0]
    this._sendMessageUsecase.execute(event.replyToken, message)
    res.sendStatus(200)
  }

}