import { FC, useContext, useRef } from 'react'

import { Cardstep, StepsQf, SkeletonQf } from '../stepMessageCss'
import { Context } from '..'

const StepMessage: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { checkIndex, data, funcStep } = useContext(Context)!

  const onChange = (value: number) => {
    funcStep(value)
  }

  const newDescriptionReactNode = (arr: any) => {
    if (arr == undefined) return true
    const reactDec = arr.map((item: any, index: any) => {
      const newdec = {
        description: (
          <Cardstep ref={targetRef} key={index}>
            {item.describition}
          </Cardstep>
        ),
      }
      return { title: `${item.upgradeTime} ${item.title}`, ...newdec }
    })
    return reactDec
  }

  const result = newDescriptionReactNode(data)

  return (
    <div className="overflow-auto flex flex-col items-center bg-[#F4F6F9] h-[100vh] pb-[100px]  pt-16 scroll-smooth">
      <div className="flex flex-col items-center w-[80%] " ref={containerRef}>
        <div className="w-[80%] flex font-normal text-[#767E89] text-[13px] mt-4 mb-8">
          <span>共 {result.length} 篇更新日志</span>
        </div>
        {data == undefined && result ? (
          <>
            <SkeletonQf active />
            <SkeletonQf active />
            <SkeletonQf active />
          </>
        ) : (
          <StepsQf
            progressDot
            current={checkIndex}
            size={'small'}
            status="wait"
            direction="vertical"
            items={result}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  )
}
export default StepMessage
