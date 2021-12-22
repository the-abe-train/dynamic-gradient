import { createContext } from "react";

export const ColoursListContext = createContext({
  coloursList: ['red', 'blue', 'green'],
  setColoursList: () => {}
});