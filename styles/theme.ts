import { extendTheme, theme, toCSSObject } from '@chakra-ui/react'

export enum IColors {
  primary = '#5198CD',
  secondary = '#5f7c93',
  bg = '#D8DFE6',
  item_bg = '#F9F9F9',
}

export enum IShadows {
  shadoItem = '2px 2px 10px 0px rgba(0,0,0,0.5)',
  shadowItemContainer = '9px 9px 17px -6px rgba(0,0,0,0.75)',
}

export const customTheme = extendTheme({})
