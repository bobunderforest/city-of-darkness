import { useState } from 'react'
import { SectionIntro } from 'components/sections/SectionIntro/SectionIntro'
import { Editor } from 'components/Editor/Editor'
import type { Intro } from 'components/sections/SectionIntro/Intro'

export const EditorPage = () => {
  const [introInstance, setIntroInstance] = useState<Intro>()
  return (
    <>
      <SectionIntro onCreate={setIntroInstance} />
      {introInstance && <Editor introInstance={introInstance} />}
    </>
  )
}
