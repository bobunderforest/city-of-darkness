import { GeneralGrid } from './GeneralGrid'
import { ContentImage } from 'components/common/ContentImage'
import { ContentPanorama } from 'components/common/ContentPanorama'
import { ContentTextBlock } from 'components/common/ContentTextBlock'
import { ContentTitle } from 'components/common/ContentTitle'
import { ContentWrapper } from 'components/common/ContentWrapper'

export const SectionGeneral = () => {
  return (
    <>
      <div className="bg-[#000]">
        <div className="mx-[auto] my-0 max-w-[1100px] px-[40px] py-[200px] text-[36px] leading-[1.4] text-[#fff]">
          This city was so densely populated that daylight didn't reach it. It
          was formed on territory not controlled by any state within the
          boundaries of Hong Kong. Having become a real lair of anarchy, its
          very appearance inspired horror.
        </div>
      </div>

      <GeneralGrid />

      <ContentWrapper>
        <ContentImage src="/img/photo/kowloon_walled_city_1989_aerial.jpg" />
        <ContentTitle>What is it?</ContentTitle>
        <ContentTextBlock>
          This is how, without embellishment, begins the story of one of the
          most incredible places that ever existed on our planet — the Kowloon
          Walled City. The City of Darkness, the Hong Kong Anthill — this
          absolute record holder for population density has had many names, but
          all of them, one way or another, made it clear that people here
          literally live on each other's heads.
        </ContentTextBlock>
      </ContentWrapper>

      <ContentPanorama src="/img/photo/kcity.jpg" />

      <ContentWrapper>
        <ContentTitle>What is it?</ContentTitle>
        <ContentTextBlock>
          In a nutshell, China and Great Britain were so busy dividing the
          territories under their control that they completely forgot about the
          small piece of land that began to live its own life and obey no one.
          Surprisingly, most people voluntarily lived in such conditions. They
          preferred freedom to their usual life. Everyone has their own concept
          of freedom: they understood it as the opportunity to not follow the
          law, not pay taxes, and generally do whatever their heart desires and
          not be convicted for it. There were also those who simply had nowhere
          else to go. There were more and more of both. Over time, entire
          generations changed in this city, and the natives simply could not
          imagine what it was like to live differently. Although in order to see
          a different life, it was enough to leave the walls of the anthill.
        </ContentTextBlock>
      </ContentWrapper>
    </>
  )
}
