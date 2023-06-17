import { IncomingMessage } from 'http'
import { middleware, ClientConfig, MiddlewareConfig, Client, Profile } from "@line/bot-sdk"
import { FlexMessage, Event } from "./types"
import express, { Express, Request, Response, NextFunction } from 'express'
const https = require('node:https')

export class LineBotSimpleServer {
  private _app: Express
  private _message: FlexMessage | null = null
  private _config: ClientConfig
  private _middleWareConfig: MiddlewareConfig

  constructor(app: Express, port: string, channelAccessToken: string, channelSecret: string) {
    this._app = app

    if (!channelAccessToken) throw new Error(`there isn't channelAccessToken`)
    if (!channelSecret) throw new Error(`there isn't channelSecret`)

    this._config = {
      channelAccessToken: channelAccessToken,
      channelSecret: channelSecret,
    }
    this._middleWareConfig = {
      channelSecret: channelSecret
    }

    this._router(port)
  }

  _router(port: string) {
    this._app.listen(port)
    this._app.post('/webhook', middleware(this._middleWareConfig), this._endPointWebHook.bind(this))
  }

  async _endPointWebHook(req: Request, res: Response, next: NextFunction) {
    try {
      if (!this._message) throw new Error(`It's neccesary to set message. but there isnt message`)
      const events: Event[] = req.body.events
      const userId: string = events[0].source.userId
      
      const profile = await this._getProfile(userId, this._config)
      const replacedMessage = this._replacePlaceholder(this._message, profile)

      const dataStirng = JSON.stringify({
        replyToken: events[0].replyToken,
        messages: [replacedMessage]
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
        body: dataStirng
      }

      const request = https.request(webhookOptions, (res: IncomingMessage) => {
        res.on('data', (d: Buffer) => {
          process.stdout.write(d)
        })
      })

      request.on('error', (err: Error) => {
        console.error(err)
      })

      request.write(dataStirng)
      request.end()
    } catch (err: any) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }

  /**
   * this method makes some placeholder to replace.
   * @param {FlexMessage} message
   * @param {Profile} profile 
   * @returns 
   */
  _replacePlaceholder(message: FlexMessage, profile: Profile): FlexMessage {
    let messageStr = JSON.stringify(message);
    messageStr = messageStr.replace('[displayName]', profile.displayName);

    const updatedMessage: FlexMessage = JSON.parse(messageStr);
    return updatedMessage
  }

  /**
   * Get user profile who sent to bot.
   * @param {string} userId 
   * @param {ClientConfig} config 
   * @returns 
   */
  async _getProfile(userId: string, config: ClientConfig): Promise<Profile> {
    const client = new Client(config)
    const profile = await client.getProfile(userId)
    return profile
  }

  setMessage(message: FlexMessage) {
    this._message = message
  }
}