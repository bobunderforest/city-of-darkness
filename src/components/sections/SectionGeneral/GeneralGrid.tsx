import { cns } from 'utils/classnames'

import {
  LetterImage,
  LetterText,
  LetterWrapper,
} from 'components/common/DecorativeLetter'
import { Column, Row, Strong, Title } from 'components/common/DecorativeGrid'

export const GeneralGrid = () => {
  return (
    <>
      <LetterWrapper text="KOWLOON" className="text-[#000]">
        <div className="absolute top-0 left-0 h-full w-full">
          <div className="absolute top-0 left-2/5 h-3/5 w-3/5 bg-[#000]" />
          <div className="absolute top-0 left-0 h-1/5 w-1/2 bg-[#000]" />
        </div>

        <LetterImage src="/img/letters/k1.svg" />
        <LetterText className="top-[57.4%] left-2/4 w-1/3 origin-top-right skew-y-[10deg]" />
        <LetterText className="top-[57.4%] right-0 w-1/6" />

        <LetterImage src="/img/letters/k2.svg" />
        <LetterText className="top-[57.4%] left-0 w-1/2 origin-top-right skew-y-[20deg]" />
        <LetterText className="top-[57.4%] left-2/4 w-1/6" />

        <div className="absolute top-[52.6%] left-0 w-full bg-[0_0] bg-[url('/img/grid-intro.svg')] bg-cover pt-[80.6%]"></div>
      </LetterWrapper>

      {/* Grid */}
      <div className="relative">
        <Row className={'mt-[1.5vw] h-[22.45vw]'}>
          <Column />

          <Column className="origin-[right_bottom] skew-y-[20deg]">
            <Title>53</Title>
            <p>
              thousands of people — a&nbsp;historical maximum, recorded in 1994
            </p>
          </Column>

          <Column>
            <p>
              All these people lived in an area comparable to two football
              fields
            </p>
            <img
              className="mt-[1vw] block w-full"
              src="/img/field.svg"
              alt=""
            />
          </Column>

          <Column className="origin-[left_bottom] skew-y-[20deg]">
            <Title>2,6</Title>
            <p>million people per square kilometer</p>
          </Column>

          <Column className="mt-[11.9vw] origin-top-right skew-y-[20deg]" />

          <Column />
        </Row>

        <Row className="h-[16.48vw]">
          <Column />
          <Column />
          <Column>
            <Title>500</Title>
            <p>
              buildings piled close to each other, and even on top of each other
            </p>
          </Column>
          <Column>
            <Strong>Also known as</Strong>
            <p>
              City of Darkness
              <br />
              Walled City
              <br />
              Lawless Enclave
            </p>
          </Column>
          <Column />
          <Column />
        </Row>

        <Row className="mb-[15vw]">
          <Column />
          <Column />
          <Column />
          <Column />
          <Column className="pt-[7.5vw]">
            <p>
              The city has earned mentions in books, films, and computer games
            </p>
          </Column>
          <Column />
        </Row>
      </div>
    </>
  )
}
