const request = require('supertest');
import { Config, MiddlewareConfig } from "@line/bot-sdk";
import { Router } from "../src/Router"
import express, { Express } from "express"
require('dotenv').config();

// jest.mock('@line/bot-sdk', () => ({
//   middleware: jest.fn().mockImplementation(() => { (req: any, res: any, next: any) => { next() } })
// }))


describe('Router', () => {
  let app: Express
  let router: Router

  beforeEach(() => {
    const middlewareConfig: MiddlewareConfig = {
      channelSecret: process.env.CHANNEL_SECRET!
    }
    const config: Config = {
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
    }
    app = express()
    router = new Router(app, middlewareConfig, config)
  })

  it("should handle POST /webhook correctly", async () => {
    const res = await request(app).post('/webhook')
    expect(res.status).toEqual(200)
    // expect(res.text).toEqual("Received POST Data!")
  })
})