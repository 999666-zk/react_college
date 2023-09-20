import { FC } from 'react'
import { dataProps } from '@/pages/recent-update/interface'
import dayjs from 'dayjs'

const TextHeader: FC<{ data: dataProps }> = (props) => {
  const { title, updateTime } = props.data

  const afterFormatUpdateTime = dayjs(updateTime).format('YYYY-M-D HH:mm')

  return (
    <div>
      <div className="w-[100%] h-[62px]  flex justify-between mt-20">
        <div className="h-[100%] w-[100%]  flex flex-col justify-between">
          <div className="h-[32px] text-[28px] leading-[32px] text-[ #121315] font-semibold">
            <span className="whitespace-nowrap">{title}</span>
          </div>
          <div className="text-[14px] leading-[22px] font-normal text-[#767E89]">
            最近更新时间: <span>{afterFormatUpdateTime}</span>
          </div>
        </div>
        <div>{/* <ShareText QRurl='https://www.baidu.com'></ShareText> */}</div>
      </div>
      <div className="mt-20 w-[100] h-auto"></div>
    </div>
  )
}
export default TextHeader
