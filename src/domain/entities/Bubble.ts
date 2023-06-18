import { Box } from "./content"

export interface Bubble {
  type: "bubble"
  header?: Box
  hero?: Box
  body: Box
  footer?: Box
}