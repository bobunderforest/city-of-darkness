import {
  LetterImage,
  LetterText,
  LetterWrapper,
} from 'components/common/DecorativeLetter'

export const SectionArchitectureLetter = () => {
  return (
    <LetterWrapper text="ARCHITECTURE" className="text-[#fff]">
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="absolute top-2/5 left-[0] h-3/5 w-1/2 bg-[#000]" />
        <div className="absolute top-[55%] left-2/4 h-[45%] w-1/2 bg-[#000]" />
      </div>

      <LetterImage src="/img/letters/a1.svg" />
      <LetterText className="top-[40.3%] left-2/4 w-1/6" />
      <LetterText className="top-[57.4%] left-2/3 w-1/6 origin-top-right skew-y-[20deg]" />
      <LetterText className="top-[57.4%] right-[0] w-1/6" />

      <LetterImage src="/img/letters/a2.svg" />
      <LetterText className="top-[57.4%] left-[0] w-1/2 origin-top-right skew-y-[20deg]" />
      <LetterText className="top-[57.4%] left-2/4 w-1/6" />
    </LetterWrapper>
  )
}
