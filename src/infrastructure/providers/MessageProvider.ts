import { Carousel } from "../../domain/entities/Carousel";
import { Flex } from "../../domain/entities/Flex";

export class MessageProvider {
  private _message: Flex | Carousel

  constructor(message: Flex | Carousel) {
    this._message = message
  }

  getMessage(): Flex | Carousel {
    return this._message
  }

  setMessage(message: Flex | Carousel) {
    this._message = message
  }
}