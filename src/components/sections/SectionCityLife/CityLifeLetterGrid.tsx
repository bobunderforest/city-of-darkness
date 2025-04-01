import {
  LetterImage,
  LetterText,
  LetterWrapper,
} from 'components/common/DecorativeLetter'
import { Column, Row, Strong, Title } from 'components/common/DecorativeGrid'

export const CityLifeLetterGrid = () => {
  return (
    <>
      <LetterWrapper text="CITY LIFE" className="text-[#000]">
        <div className="absolute top-[0] left-[0] h-full w-full bg-[#000]">
          <div className="absolute top-[0] left-[0] h-full w-1/2 bg-[#fff]" />
          <div className="absolute top-[52%] left-2/4 h-[48%] w-1/2 bg-[#fff]" />
        </div>

        <LetterImage src="/img/letters/c.svg" />
        <LetterText className="top-[57.4%] left-[0] w-1/2 origin-top-right skew-y-[20deg]" />
        <LetterText className="top-[57.4%] left-2/4 w-1/2" />

        <div className="absolute top-[47.7%] left-[0] w-full bg-[0_0] bg-[url('/img/grid-people.svg')] bg-cover pt-[80.4%]"></div>
      </LetterWrapper>

      {/* Grid */}
      <div className="relative">
        <Row className={'mt-[1.5vw] h-[22.45vw]'}>
          <Column />

          <Column className="origin-[right_bottom] skew-y-[20deg]">
            <Title>1k</Title>
            <p>of mini-factories where people worked and lived</p>
          </Column>

          <Column />
          <Column className="origin-[left_bottom] skew-y-[20deg]" />
          <Column className="mt-[11.9vw] origin-top-right skew-y-[20deg]" />
          <Column />
        </Row>

        <Row className="h-[16.48vw]">
          <Column />
          <Column />
          <Column>
            <Strong>Immigrants</Strong>
            <p>
              The original inhabitants of&nbsp;Kowloon were migrants
              who&nbsp;fled the Chinese regime
            </p>
          </Column>
          <Column>
            <Strong>Criminals</Strong>
            <p>
              No police - no problems for&nbsp;those who are wanted
              or&nbsp;engaged in illegal activities
            </p>
          </Column>
          <Column />
          <Column />
        </Row>

        <Row className="h-[16.48vw]"></Row>
        <Row className="h-[16.48vw]"></Row>
      </div>
    </>
  )
}
