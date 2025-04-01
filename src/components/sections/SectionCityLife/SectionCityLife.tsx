import { CityLifeLetterGrid } from './CityLifeLetterGrid'
import { ContentImage } from 'components/common/ContentImage'
import { ContentTextBlock } from 'components/common/ContentTextBlock'
import { ContentTitle } from 'components/common/ContentTitle'
import { ContentWrapper } from 'components/common/ContentWrapper'
import { Stories } from './Stories'

export const SectionCityLife = () => {
  return (
    <>
      <CityLifeLetterGrid />

      <ContentWrapper noMargin>
        <ContentTextBlock>
          The area of this fortress city was only 2.7 hectares, and there were
          about four hundred buildings on it, in which a huge number of people
          lived and more than 1000 different small factories worked. Imagine how
          much biological and industrial waste was born here every day. Despite
          the efforts to regularly remove the garbage, absolutely everything
          here looked like a garbage dump: the streets, the roofs and almost
          every apartment.
        </ContentTextBlock>

        <ContentImage src="/img/photo/trash.jpg" coeff={0.6} />

        <ContentTitle>Law</ContentTitle>
        <ContentTextBlock>
          There was no police here, and everyone had complete freedom to do
          everything that was prohibited in Hong Kong. Even the triads — the
          all-powerful Chinese criminal groups — kept Kowloon as a neutral zone.
          Despite all this, there were extremely few murders and other violent
          crimes committed in Kowloon. Everyone understood that the independence
          of this territory was a rather ephemeral thing and in the event of
          some really dramatic events, the authorities would do everything
          possible to put an end to it.
          <br />
          <br />
          Therefore, everyone — both the triads and ordinary residents — kept
          order. The police generally did not dare to enter the territory of
          Kowloon, but even if it happened that they went in pursuit of some
          pickpocket, the locals would immediately throw garbage at them.
          Intelligence work in Kowloon was also impossible, because all the
          residents knew each other and it was difficult for an outsider to
          penetrate their ranks and pretend to be one of them.
        </ContentTextBlock>

        <ContentTitle>People</ContentTitle>
        <ContentTextBlock>
          Despite the abundance of representatives of various "lower classes",
          Kowloon was mostly inhabited by decent people. Everyone knew each
          other, neighbors helped each other whenever possible. Any sin was
          possible here, but there were very few murders and, in general, it was
          calm. Everyone was busy with their own business and survived as best
          they could. This anarchic society was self-regulating.
        </ContentTextBlock>
      </ContentWrapper>

      <Stories />

      <ContentWrapper>
        <ContentImage src="/img/photo/police.jpg" coeff={0.6} />

        <ContentTitle>Medicine</ContentTitle>
        <ContentTextBlock>
          Doctors worked in extremely unsanitary conditions. Their prices were
          strikingly different from official doctors in the city, but the
          quality of equipment, materials, and their qualifications were always
          questionable. However, this did not scare off the majority of
          low-income locals, and even in clients "from the outside" there was no
          shortage.
          <br />
          <br />
          One of the results of the lack of government control was the
          appearance of a huge number of dentists in Kowloon: out of 150
          doctors, 87 were dentists, all from mainland China. Many of them were
          real dentists and had the appropriate documents and diplomas of the
          mainland, but they did not have the right to legally practice in Hong
          Kong.
        </ContentTextBlock>

        <ContentImage src="/img/photo/dentals.jpg" />

        <ContentTitle>Production</ContentTitle>
        <ContentTextBlock>
          There were about a thousand different small production facilities,
          cafes and restaurants on the territory of the walled city. Most of
          them were "one-man" factories, when the owner himself was the
          workforce, the accountant and the seller. One of the most common
          industries was the production of Chinese noodles. Entry into the
          business was inexpensive, and the demand was high and constant.
          <br />
          <br />
          The cafes, with their windows facing the "street" from the walled
          city, looked quite decent, but what was going on inside was shrouded
          in mystery. Since there was practically no government control here,
          this untied the hands of the owners of such restaurants to increase
          profits by reducing the cost of production and ingredients as much as
          possible.
          <br />
          <br />
          As for the "light industry", here you could find mini-factories
          producing anything you want. It was believed that the highest quality
          fakes of clothes and shoes were produced right here, in Kowloon.
          Products made of rubber, fabric, leather and even metal could be
          purchased from local factories for next to nothing.
        </ContentTextBlock>

        <ContentImage src="/img/photo/production.jpg" />

        <ContentTitle>Education</ContentTitle>
        <ContentTextBlock>
          In fact, there was no education as such in Kowloon itself. A serious
          problem was children hiding from school. In some buildings, makeshift
          schools and kindergartens were organized, where the more affluent
          residents sent their children.
          <br />
          <br />
          Most children went to small groups, organized by their neighbors,
          where they were taught to read, write, draw and recite poetry. But
          most of the time they ran with their friends on the stairs, corridors
          and rooftops, playing hundreds of different exciting games.
        </ContentTextBlock>

        <ContentImage src="/img/photo/education.jpg" />

        <ContentTitle>Take a break</ContentTitle>
        <ContentTextBlock>
          The list of the quarter's infrastructure did not include cinemas,
          clubs or sports grounds. The real space used for recreation and
          socialization of the former fort's population was the roofs. There
          were paths and stairs to move from one level to another. Only here
          could anyone find at least some free space. Children played on the
          roofs, young people relaxed, their parents socialized and met, and
          older generations sat playing manjong.
        </ContentTextBlock>

        <ContentImage src="/img/photo/roofs.jpg" />
      </ContentWrapper>
    </>
  )
}
