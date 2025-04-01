import { SectionArchitectureLetter } from './ArchitectureLetter'

import { ContentImage } from 'components/common/ContentImage'
import { ContentTextBlock } from 'components/common/ContentTextBlock'
import { ContentTitle } from 'components/common/ContentTitle'
import { ContentWrapper } from 'components/common/ContentWrapper'
import {
  ArchitectureSchemaItem,
  ArchitectureSchemas,
} from './ArchitectureSchemas'
import { ArchitecturePlans } from './ArchitecturePlans'
import { ArchitectureInsideOut } from './ArchitectureInsideOut'
import { Map } from './Map'

export const SectionArchitecture = () => {
  return (
    <>
      <SectionArchitectureLetter />

      <ContentWrapper fashion="dark" noMargin>
        <br />

        <ContentImage src="/img/photo/architecture-2.jpg" coeff={0.8} />

        <ContentTitle>Houses are liquid</ContentTitle>
        <ContentTextBlock>
          Kowloon was far from the only place on Earth where poverty and
          lawlessness reigned. But it was the only one with such architecture
          and appearance. The main reason was the rapid population growth. In 10
          years the city&amp;s population could double.
        </ContentTextBlock>

        <ArchitectureSchemas>
          <ArchitectureSchemaItem
            image="/img/architecture/scheme-1.svg"
            classNameImage="top-[20px]"
          >
            This city could not grow in length and width, because the territory
            that belonged to it was limited to two and a half hectares.
          </ArchitectureSchemaItem>
          <ArchitectureSchemaItem
            image="/img/architecture/scheme-2.svg"
            classNameImage="top-[50px]"
          >
            It could not grow in depth because the foundations of the buildings
            already built everywhere were not designed for this.
          </ArchitectureSchemaItem>
          <ArchitectureSchemaItem
            image="/img/architecture/scheme-3.svg"
            classNameImage="top-[-55px]"
          >
            Growing tall was also impossible: the height of buildings was
            limited to 14 floors due to the fact that there was an airport
            nearby, and planes landed directly over Kowloon.
          </ArchitectureSchemaItem>
          <ArchitectureSchemaItem
            image="/img/architecture/scheme-4.svg"
            classNameImage="top-[0]"
            classNameImageWrap="h-[200px]"
          >
            So there was nothing left to do but grow within itself.
          </ArchitectureSchemaItem>
        </ArchitectureSchemas>

        <ContentTextBlock>
          And so it turned out that the houses, like liquid, filled all the
          space allocated for them. Illegal buildings grew like mushrooms after
          rain, the gaps between the houses gradually decreased, and eventually
          it all turned into one big and ugly house, a kind of self-regulating,
          albeit toxic, ecosystem.
        </ContentTextBlock>

        <ContentImage src="/img/photo/street-1.webp" coeff={0.6} />

        <ContentTitle>Without a plan</ContentTitle>
        <ContentTextBlock>
          You can pile up in different ways. All the chaos and absurdity of the
          buildings was due to the lack of a unified architectural plan for the
          city. At the dawn of its development, the city consisted of two- and
          three-story houses built on the ruins of a military fortress.
          Surprisingly, no one was going to demolish them, and they served as
          the foundation for further piling up. At first, the city's residents
          built everything themselves, with their own hands, as best they could.
        </ContentTextBlock>

        <ArchitecturePlans src="/img/architecture/plans.svg" />

        <ContentTextBlock>
          Then small Hong Kong construction companies joined this process. They
          realized that in order to build something in Kowloon, you don’t need
          to get permits or pay taxes. But the demand for housing grew
          exponentially. They paid a little extra to the owners of already built
          houses for the opportunity to add a few floors, and 10-square-meter
          apartments costing 10 thousand dollars were flying off the shelves
          like hot cakes. Sometimes 7-8 people lived in such small apartments.
          Of course, such construction took place in violation of all possible
          architectural norms.
        </ContentTextBlock>
      </ContentWrapper>

      <ArchitectureInsideOut />

      <ContentWrapper fashion="dark" noMargin>
        <br />
        <br />
        <br />
        <br />
        <ContentTitle>In a cramped space</ContentTitle>
        <ContentTextBlock>
          Courtyards and playgrounds ceased to exist in this city almost
          immediately, and the streets became narrower and narrower, sometimes
          reaching only 70 cm in width. Apartments either had no windows at all,
          or the windows offered a picturesque where you could sometimes reach
          out and touch the opposite house. At some point, the streets became so
          crowded that a parallel overground system of passages appeared in the
          city.
        </ContentTextBlock>
        <br />
        <br />
        <br />
      </ContentWrapper>

      <Map />

      <ContentWrapper fashion="dark">
        <br />

        <ContentTitle>Water</ContentTitle>
        <ContentTextBlock>
          Water supply has always been one of the most pressing problems for the
          inhabitants of Kowloon. At first, there was no water in the city at
          all. Residents had to collect water from a well located outside the
          city. Then water carriers appeared, who were ready to bring water from
          that same well on schedule for $15 per person per month.
          <br />
          <br />
          Soon, local entrepreneurs realized that they could make money on this
          problem. They dug several wells within the city limits, installed
          electric pumps there, which turned on at a certain time every day and
          filled the reservoirs located on the roofs with water. And from there,
          water was supplied to residents, it cost about $40 per month. The
          condition of these structures was very deplorable, and very often you
          had to walk along the streets under an umbrella, since sometimes the
          water did not just drip on your head, but actually poured.
          <br />
          <br />
          However, this did not solve the problem completely. If the water in
          the reservoirs ran out, you had to wait for the next pump to turn on.
          Moreover, such water was not suitable for drinking, let alone even for
          bathing.
        </ContentTextBlock>

        <ContentImage src="/img/photo/water.jpg" coeff={0.6} />

        <ContentTitle>Electricity</ContentTitle>
        <ContentTextBlock>
          Until 1953, there was no electricity at all in the walled city. At
          that time, such settlements were content with only kerosene lamps for
          lighting and stoves for cooking on solid or liquid fuel.
          <br />
          <br />
          The impetus for electrification was a very large fire that occurred on
          New Year's Eve 1953 in a refugee camp from mainland China in the Shek
          Kip Mei area, when more than 50,000 people were left homeless.
          <br />
          <br />
          Starting in 1953, the local electric power company "China Light and
          Power" began active work to connect absolutely all objects in Hong
          Kong in order to reduce the use of open fire in everyday life. This
          included the Walled City.
        </ContentTextBlock>

        <ContentImage src="/img/photo/electricity.jpg" coeff={0.8} />
      </ContentWrapper>
    </>
  )
}
