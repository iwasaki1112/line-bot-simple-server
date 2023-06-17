import { Box, Content } from "./content"

export class Bubble {
  type: 'bubble'
  header?: Box
  hero?: Box
  body: Box
  footer?: Box

  constructor(body: Box, header?: Box, hero?: Box, footer?: Box) {
    this.type = 'bubble'
    this.header = header
    this.hero = hero
    this.body = body
    this.footer = footer
  }
}