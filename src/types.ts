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

export type FlexMessage = {
  type: "flex"
  altText: string
  contents: FlexBubble | FlexCarousel
}

type FlexCarousel = {
  type: 'carousel';
  contents: FlexBubble[];
};

type FlexBubble = {
  type: 'bubble'
  styles?: Styles
  header?: Box
  hero?: Image | Video
  body?: Box
  footer?: Box
}

type Styles = {
  header: Style;
  body: Style;
  footer: Style;
}

type Style = {
  separator?: boolean
  separatorColor?: string
  backgroundColor?: string
}

type Box = {
  type: 'box'
  layout: 'vertical' | 'horizontal'
  spacing?: "md"
  contents: (Text | Button)[];
}

type Text = {
  type: 'text';
  text: string;
  wrap?: boolean;
}

type Button = {
  type: 'button';
  style: 'primary';
  action: Action;
}

type Action = {
  type: 'uri'
  label: string
  uri: string;
}

type Image = {
  type: 'image';
  url: string;
  size: 'full';
  aspectRatio: '2:1';
}

type Video = {
  type: "video"
  url: string
  previewUrl: string
  aspectRatio: "20:13"
  "altContent": Image,
}