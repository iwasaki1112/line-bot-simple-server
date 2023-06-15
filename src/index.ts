import { middleware, ClientConfig, MiddlewareConfig, Client, Profile } from "@line/bot-sdk"
import { FlexMessage, Event } from "./types";
import express, { Express } from 'express'
const https = require('node:https');

export class LineBotSimpleServer {
  private _app: Express
  private _message: FlexMessage | null = null

  constructor(port: string, channelAccessToken: string, channelSecret: string) {
    this._app = express()

    if (!channelAccessToken) throw new Error(`there isn't channelAccessToken`)
    if (!channelSecret) throw new Error(`there isn't channelSecret`)

    const config: ClientConfig = {
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKE!,
      channelSecret: process.env.CHANNEL_SECRET,
    }
    const middleWareConfig: MiddlewareConfig = {
      channelSecret: config.channelSecret!
    }

    this.startServer(port, config, middleWareConfig)
  }

  async startServer(port: string, config: ClientConfig, middleWareConfig: MiddlewareConfig) {

    this._app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    })

    this._app.post('/webhook', middleware(middleWareConfig), async (req, res, next) => {
      try {
        if (!this._message) throw new Error(`It's neccesary to set message. but there isnt message`)
        const events: Event[] = req.body.events
        const userId: string = events[0].source.userId
        const profile = await this._getProfile(userId, config)
        const replacedMessage = this._replacePlaceholder(message, profile)

        const dataStirng = JSON.stringify({
          replyToken: events[0].replyToken,
          messages: [replacedMessage]
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
      } catch (err) {
        console.error(err)
        res.status(500).send(err)
      }
    })

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