// const request = require('supertest');
// import express from 'express';
// import { LineBotSimpleServer } from '../src/LineBotSimpleServer'
// import { Client, middleware, Profile } from "@line/bot-sdk";
// require('dotenv').config();

// jest.mock('@line/bot-sdk', () => ({
//   Client: jest.fn(),
//   middleware: jest.fn().mockImplementation(() => (req: any, res: any, next: any) => { next(); return (req: any, res: any, next: any) => { }; })
// }))

// const app = express()

// describe('LineBotSimpleServer', () => {
//   let server: LineBotSimpleServer
//   let channelAccessToken: string | undefined
//   let channelSecret: string | undefined

//   beforeEach(() => {
//     channelAccessToken = process.env.CHANNEL_ACCESS_TOKEN
//     channelSecret = process.env.CHANNEL_SECRET

//     if (!channelAccessToken || !channelSecret) {
//       console.error('there is not token or secret')
//       return
//     }
//     server = new LineBotSimpleServer('8081', channelAccessToken, channelSecret)
//   })

//   test('Constructor', () => {
//     expect(server).toBeDefined();
//   })

//   test('webhook post endpoint', async () => {
//     const res = await request(app)
//       .post('/webhook')
//       .send({ example: 'payload' }) // payloadを送る

//     expect(res.status).toBe(200)
//   })
// })