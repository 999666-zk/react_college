import { QRCode, Popover } from 'antd'
import { FC } from 'react'
import styled from 'styled-components'
const ShareText: FC<{ QRurl: string }> = (props) => {
  const { QRurl } = props

  const Qfdiv = styled.div`
    transition: all 0.3s;
    &:hover {
      background-color: #f4f6f9;
      border: 1px solid #acb3bd;
    }
  `

  const QRCodeQf = styled(QRCode)`
    border-radius: 0px !important;
    canvas {
      width: 112px !important;
      height: 112px !important;
    }
  `

  const PopoverQf = styled(Popover)`
    &.ant-popover-content {
      .ant-popover-inner {
        box-shadow: 0px 4px 10px 0px #0c1f5014, 0px 0px 0px 1px #e6eaf0 !important;
        padding: 8px !important;
      }
    }
  `
  const content = (
    <div className="shadow-[box-shadow: 0px 4px 10px 0px #0C1F5014,0px 0px 0px 1px #E6EAF0;] ">
      <div className="flex flex-col justify-between">
        <div className="w-[112px] h-[112px] ">
          <QRCodeQf value={QRurl} style={{ marginBottom: 0 }} size={112} iconSize={112} />
        </div>
        <div className="text-[13px] leading-[20px] text-center mt-8">
          <span>微信扫一扫</span>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <PopoverQf
        content={content}
        placement="bottom"
        arrow={false}
        overlayInnerStyle={{
          padding: '8px',
          boxShadow: '0px 4px 10px 0px #0c1f5014, 0px 0px 0px 1px #e6eaf0 !important',
        }}
      >
        <Qfdiv className="w-[36px] h-[36px] rounded-[4px] flex justify-center items-center border-solid border border-[#CCD4E0] cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.3716 3.75976C14.3716 4.82405 13.5071 5.68683 12.4407 5.68683C11.8824 5.68683 11.3794 5.45033 11.0269 5.07224L10.7984 4.67136L10.6074 4.33637L10.5868 4.30033C10.5367 4.12882 10.5098 3.94742 10.5098 3.75976C10.5098 2.69546 11.3743 1.83268 12.4407 1.83268C13.5071 1.83268 14.3716 2.69546 14.3716 3.75976ZM9.86468 6.08839L8.52743 6.84772L6.54587 7.9729L6.25889 8.13586C6.24913 8.35956 6.21548 8.57707 6.16043 8.78593L6.20732 8.82671L6.95041 9.47297L7.69349 10.1192L9.0836 11.3282C9.39636 11.1711 9.74966 11.0827 10.1237 11.0827C11.4033 11.0827 12.4407 12.118 12.4407 13.3952C12.4407 14.6723 11.4033 15.7077 10.1237 15.7077C8.84397 15.7077 7.80659 14.6723 7.80659 13.3952C7.80659 13.2015 7.83045 13.0133 7.8754 12.8335L6.42495 11.5721L5.68186 10.9258L5.09356 10.4142C4.56616 10.8326 3.89856 11.0827 3.17244 11.0827C1.46619 11.0827 0.0830078 9.7022 0.0830078 7.99933C0.0830078 6.29645 1.46619 4.916 3.17244 4.916C4.22042 4.916 5.14652 5.43677 5.70512 6.23315L7.57257 5.17276L9.0158 4.35326C8.98248 4.1604 8.96512 3.9621 8.96512 3.75976C8.96512 1.84402 10.5212 0.291016 12.4407 0.291016C14.3603 0.291016 15.9163 1.84402 15.9163 3.75976C15.9163 5.67549 14.3603 7.2285 12.4407 7.2285C11.4192 7.2285 10.5006 6.78866 9.86468 6.08839ZM9.62608 12.8224L9.44089 13.0345C9.3837 13.1421 9.3513 13.2649 9.3513 13.3952C9.3513 13.8209 9.6971 14.166 10.1237 14.166C10.5502 14.166 10.896 13.8209 10.896 13.3952C10.896 12.9695 10.5502 12.6244 10.1237 12.6244C9.95502 12.6244 9.79901 12.6783 9.67199 12.7698L9.62608 12.8224ZM4.71715 7.99933C4.71715 8.85076 4.02556 9.54099 3.17244 9.54099C2.31932 9.54099 1.62772 8.85076 1.62772 7.99933C1.62772 7.14789 2.31932 6.45766 3.17244 6.45766C4.02556 6.45766 4.71715 7.14789 4.71715 7.99933Z"
              fill="#494F57"
            />
          </svg>
        </Qfdiv>
      </PopoverQf>
    </div>
  )
}
export default ShareText
