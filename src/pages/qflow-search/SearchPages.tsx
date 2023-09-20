import React, { FC, useContext } from 'react'
import { Pagination } from 'antd'
import styled from 'styled-components'
import { KeyWordContext } from '.'
import { tagPageNums } from './SearchBar'

const PaginationQf = styled(Pagination)`
  width: max-content;
  .ant-pagination-prev,
  .ant-pagination-next {
    border: 1px solid #ccd4e0;
    border-radius: 4px;
  }
  .ant-pagination-item {
    border: 1px solid #ccd4e0;
    border-radius: 4px;
  }
  .ant-pagination-item-active {
    border: 1px solid #fb9337;
    border-radius: 4px;
  }
  .anticon svg {
    display: inline-block;
    height: 30px !important;
  }
  .ant-pagination-total-text {
    /* float: right;
    margin-right: 60%; */
  }
`

const SearchPages: FC<{ getPageMsg: any }> = (props) => {
  const { getPageMsg } = props
  const { pageNum, pageSize } = useContext(KeyWordContext)!.pageSet
  const { resultAll, resultTimeline, totals } = useContext(KeyWordContext)!
  const { defaultkey } = useContext(tagPageNums)!

  let totalspage: number

  if (defaultkey === '/search-doc') {
    totalspage = totals
  } else if (defaultkey === '/help-doc') {
    totalspage = resultAll.data.data.total
  } else {
    totalspage = resultTimeline.data.data.total
  }

  return (
    <div className="flex justify-start mt-[28px]">
      <PaginationQf
        total={totalspage}
        defaultPageSize={pageSize}
        defaultCurrent={pageNum}
        // showSizeChanger
        onChange={(pageNum, pageSize) => {
          getPageMsg(pageNum, pageSize)
        }}
      />
      <div className="h-[32px] ml-[10px] leading-[32px] text-[14px] font-sans text-[#494F57]">共 {totalspage} 条</div>
    </div>
  )
}
export default SearchPages
