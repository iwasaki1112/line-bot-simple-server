import { Bubble } from "./Bubble"

export class Carousel {
  type: 'carousel'
  contents: Bubble[]

  constructor(contents: Bubble[]) {
    this.type = 'carousel'
    this.contents = contents
  }
}