require('modules/vendor/parlin-noise')
import { Intro } from '../modules/ui/section-intro/Intro'
import { Map } from '../modules/ui/map/Map'
import '../modules/ui/letter/Letters'
import '../modules/Spinner'
import '../modules/ui/section-architecture/Plans'
import '../modules/ui/wide-scroll/WideScroll'
import '../modules/ui/section-stories/Stories'
import '../modules/ParallaxPhotos'
import '../modules/Link'

import { createRoot } from 'react-dom/client'
import { App } from 'modules/ui/app/app'

const root = createRoot(document.getElementById('app')!)
root.render(<App />)

setTimeout(() => {
  new Map()
}, 300)
