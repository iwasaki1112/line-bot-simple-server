import { Bubble } from "./Bubble"

export class Flex {
  type: 'flex'
  altText: string
  contents: Bubble

  constructor(altText: string, contents: Bubble) {
    this.type = 'flex'
    this.altText = altText
    this.contents = contents
  }
}