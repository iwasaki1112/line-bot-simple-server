import { MiddlewareConfig, middleware, Config } from "@line/bot-sdk";
import { Express, Request, Response } from "express";
import { FlexMessage, Event } from "./types"
import https from 'https'
import { IncomingMessage } from 'http'

export class Router {
  private _app: Express;
  private _config: Config

  constructor(app: Express, middlewareConfig: MiddlewareConfig, config: Config) {
    this._app = app
    this._config = config
    this._app.post('/webhook', middleware(middlewareConfig), this._handleWebhook.bind(this))
  }

  _handleWebhook(req: Request, res: Response) {
    const events: Event[] = req.body.events
    // const userId: string = events[0].source.userId

    // const message: FlexMessage = {
    //   "type": "flex",
    //   "altText": "This is a Flex Message",
    //   "contents": {
    //     "type": "bubble",
    //     "body": {
    //       "type": "box",
    //       "layout": "horizontal",
    //       "contents": [
    //         {
    //           "type": "text",
    //           "text": "Hello,"
    //         }
    //       ]
    //     }
    //   }
    // }

    // const dataStirng = JSON.stringify({
    //   replyToken: events[0].replyToken,
    //   messages: [message]
    // })
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${this._config.channelAccessToken}`
    // }

    // const webhookOptions = {
    //   hostname: 'api.line.me',
    //   path: '/v2/bot/message/reply',
    //   method: 'POST',
    //   headers: headers,
    //   body: dataStirng
    // }

    // const request = https.request(webhookOptions, (res: IncomingMessage) => {
    //   res.on('data', (d: Buffer) => {
    //     process.stdout.write(d)
    //   })
    // })

    // request.on('error', (err: Error) => {
    //   console.error(err)
    // })

    // request.write(dataStirng)
    // request.end()
  }
}