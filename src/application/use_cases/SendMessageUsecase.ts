import { ClientConfig } from "@line/bot-sdk"
import { Carousel } from "../../domain/entities/Carousel"
import { Flex } from "../../domain/entities/Flex"
import https from 'https'

export class SendMessageUsecase {
  private _config: ClientConfig

  constructor(config: ClientConfig) {
    this._config = config
  }

  public execute(replyToken: string, message: Flex | Carousel) {
    const dataString = JSON.stringify({
      replyToken: replyToken,
      messages: [message]
    })
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this._config.channelAccessToken}`
    }
    const webhookOptions = {
      hostname: 'api.line.me',
      path: '/v2/bot/message/reply',
      method: 'POST',
      headers: headers,
      body: dataString
    };

    const request = https.request(webhookOptions, (res: any) => {
      res.on('data', (d: Buffer) => {
        process.stdout.write(d)
      });
    });

    request.on('error', (err: Error) => {
      console.error(err)
    });

    request.write(dataString);
    request.end();
  }
}