import { cns } from 'utils/classnames'
import s from './sectionCredits.module.css'

import { ContentTextBlock } from 'components/common/ContentTextBlock'
import { ContentTitle } from 'components/common/ContentTitle'
import { ContentWrapper } from 'components/common/ContentWrapper'
import { Link } from 'components/common/Link'

export const SectionCredits = () => {
  return (
    <>
      <ContentWrapper fashion="dark" className={cns('pt-[200px]', s.text)}>
        <ContentTitle>About this project</ContentTitle>
        <ContentTextBlock>
          <p>
            This website is an enthusiastic project made in 2018 to experiment
            with visual storytelling techniques. It&nbsp;was shut down but
            restored and slightly remastered later in 2025.
          </p>
          <p>
            The original look of this project is partially available on the
            Wayback Machine:
          </p>
          <ul>
            <li>
              <Link
                isExternal
                href="https://web.archive.org/web/20181003073214/http://www.kwc.guide/"
              >
                Page 1
              </Link>
            </li>
            <li>
              <Link
                isExternal
                href="https://web.archive.org/web/20181004224229/http://www.kwc.guide/people"
              >
                Page 2
              </Link>
            </li>
          </ul>
        </ContentTextBlock>
        <ContentTitle>Credits</ContentTitle>
        <ContentTextBlock>
          <ul>
            <li>
              Design: <Link isExternal>Nikita Gusev</Link>
            </li>
            <li>
              Frontend:{' '}
              <Link href="https://github.com/bobunderforest/" isExternal>
                Dmitrii Podlesnyi
              </Link>
              , <Link isExternal>Giyos Abbaskhanov</Link>
            </li>
            <li>
              <Link
                href="https://github.com/bobunderforest/city-of-darkness"
                isExternal
              >
                GitHub
              </Link>
            </li>
          </ul>
        </ContentTextBlock>
        <ContentTitle className="mt-[100px]">
          Thank you for your attention
        </ContentTitle>
      </ContentWrapper>
    </>
  )
}
