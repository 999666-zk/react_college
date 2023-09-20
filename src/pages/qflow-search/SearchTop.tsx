import { FC, useContext } from 'react'
import { Input } from 'antd'
import Icon from '@ant-design/icons'
import styled from 'styled-components'
import { KeyWordContext } from '.'
import { filterSpecialCharacter } from '@/pages/qflow-search/util'
import searchIcon from '@/assets/icons/search-icon'

const { Search } = Input

const SearchQf = styled(Search)`
  .ant-input-group-addon {
    display: none;
  }
  .ant-input-affix-wrapper {
    height: 48px !important;
    margin-top: 16px !important;
    border-radius: 8px !important;
  }
  .ant-input-prefix {
    padding-left: 4px;
    margin-right: 14px;
  }
  .ant-image {
    top: -2px;
  }

  .ant-input-affix-wrapper:hover {
    border-color: #fb9337 !important;
  }
  .ant-input-affix-wrapper:focus {
    border-color: #fb9337 !important;
    box-shadow: none !important;
  }
  .ant-input {
    font-size: 16px !important;
  }
`

type keyword = {
  getKeyWords: any
}

const SearchTop: FC<keyword> = (props) => {
  const { totals, keyWords } = useContext(KeyWordContext)!

  const { getKeyWords } = props
  // 关键词搜索
  const onSearch = (value: string) => {
    // 将关键词进行传递
    const endFilterString = filterSpecialCharacter(value)
    getKeyWords(endFilterString)
  }

  return (
    <div className="bg-search-background w-full min-w-[768px] h-[200px] search-content:px-40 px-[10%] bg-cover overflow-hidden">
      <div className="w-full m-auto">
        <div className="w-full h-[28px] mt-40 text-[20px] leading-[28px] font-[600]">共搜索到 {totals} 个结果</div>
        <div className="w-full h-[48px]">
          <SearchQf
            prefix={<Icon component={searchIcon}></Icon>}
            defaultValue={keyWords}
            placeholder="请输入关键词搜索"
            onSearch={onSearch}
            enterButton={false}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchTop
