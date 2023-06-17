export type Content = Text | Box | Button | Image | Video | Icon | Span | Separator | Filler
export type Size = 'md' | 'lg' | 'xl' | 'xxl' | '3xl' | 'md' | 'full'
export type Weight = 'bold'

export interface Box {
  type: 'box'
  layout: 'horizontal' | 'vertical'
  contents: Content[]
}

export interface Text {
  type: 'text'
  text: string
  size?: Size
  color?: string
  align?: 'center'
  weight?: Weight
  wrap?: boolean
  lineSpacing?: string
}

export interface Button {
  type: 'button'
  style: 'primary',
  action: Action
}

export interface Image {
  type: "image"
  url: string
  size: Size
  aspectRatio: string
  aspectMode: 'cover'
}

export interface Action {
  type: 'uri'
  label: string,
  uri: string
}

export interface Video {
  type: 'video'
  url: string
  previewUrl: string
  altContent: Image
  aspectRatio: string
}

export interface Icon {
  type: "icon"
  url: string
  size: Size
}

export interface Span {
  type: "span"
  text: string
  decoration: 'line-through'
  size: Size
  color: string,
  weight: Weight
}

export interface Separator {
  type: "separator"
}

export interface Filler {
  type: "filler"
}

