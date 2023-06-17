export type Event = {
  type: 'message',
  message: {
    type: 'text',
    id: string,
    text: string
  },
  webhookEventId: string,
  deliveryContext: {
    isRedelivery: boolean
  },
  timestamp: number,
  source: {
    type: 'user',
    userId: string,
  },
  replyToken: string,
  mode: 'active' | 'standby'
}
