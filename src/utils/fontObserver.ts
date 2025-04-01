import FontFaceObserver from 'fontfaceobserver'
import { isBrowser } from './is-browser'

export const fontobserver = isBrowser
  ? Promise.all([
      new FontFaceObserver('KanitSans').load(null, 100000),
      new FontFaceObserver('TypefaceCustom').load('九龍城寨', 100000),
    ])
  : new Promise<void>((resolve) => resolve())
