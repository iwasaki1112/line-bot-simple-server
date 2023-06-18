# Line Bot Simple Server

`line-bot-simple-server` is a Node.js package that allows you to easily and quickly create a bot server for Line. It utilizes the Line Messaging API to send messages from this server to the Line app. Using this package allows you to quickly and easily create a bot server, even if you are not familiar with Node.js and the details of the Messaging API.

## Prerequisites
- Node.js and npm installed
- Line Business Account
- Channel Access Token and Channel Secret from your Line Business Account. To obtain them, please refer to the [instructions](https://developers.line.biz/ja/docs/messaging-api/channel-access-tokens/#long-lived-channel-access-tokens) 
### Installation
```sh
npm install line-bot-simple-server --save
```

### Usage
Firstly, import the package and initialize it with your Channel Access Token and Channel Secret.
Create a message to initialize the `messageProvider` using the `setMessage` method, and then start the bot server!
The server will be available at the endpoint http://localhost:8081/webhook
```typescript
import { LineBotSimpleServer, MessageProvide, LineBotSimpleServerConfig } from 'line-bot-simple-server'

const lineBotSimpleServerConfig: LineBotSimpleServerConfig = {
  channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN,
  channelSecret: YOUR_CHANNEL_SECRET
}
const message: Flex | Carousel = {...***}
const PORT = 8081

const messageProvider = new MessageProvider(message)
messageProvider.setMessage(message)
const lineBotSimpleServer = new LineBotSimpleServer(lineBotSimpleServerConfig, messageProvider)
lineBotSimpleServer.startServer(PORT)
```

#### Create message
The code bellow provides an exmaple of how to create a Flex Message using the package. It utilizes CSS Flexbox and provides support for various type such as Flex, Bubble, Carousel, Text, Box, Button, Image, Video, Icon, Span, Separator and Filler.

```typescript
const text: Text = {
  type: 'text',
  text: 'hoge'
}
const box: Box = {
  type: 'box',
  layout: 'horizontal',
  contents: [text]
}

const bubble: Bubble = {
  type: 'bubble',
  body: box
}

const message: Flex = {
  type: 'flex',
  altText: 'This is a flex message',
  contents: bubble
}
```

#### Demo
To create a temporary demo of your Node.js server on localhost, you can use `localtunnel`.
Run the following commands.
```sh
npm install localtunnel -D
npx lt --port 8081 --subdomain enterYourPreferredSubdomain
```