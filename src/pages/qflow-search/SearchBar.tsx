import { FC, createContext, useContext, useState } from 'react'
import { Tabs } from 'antd'
import styled from 'styled-components'

import SearchNoneData from './SearchNoneData'
import SearchLoading from './SearchLoading'
import SearchPages from './SearchPages'
import SearchItems from './SearchItems'
import { KeyWordContext } from '.'

const TabQf = styled(Tabs)`
  background-color: white;
  .ant-tabs-nav {
    margin: 0px !important;
  }
  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: start;
  }
  .ant-tabs-tab {
    width: 148px !important;
    height: 60px;
    text-align: center;
    justify-content: center;

    &:hover {
      color: #fb9337;
    }
  }

  .ant-tabs-ink-bar {
    background: #fb9337;
  }
`

export const tagPageNums = createContext<{
  defaultkey: string
} | null>(null)

const SearchBar: FC<{ resetPageNum: any; getPageSetting: any }> = (props) => {
  const [defaultkey, setdefaultkey] = useState<string>('/search-doc')

  const { resultAll, resultTimeline, pageSet } = useContext(KeyWordContext)!

  const { getPageSetting, resetPageNum } = props

  // tab切换
  let result,
    timeline = { data: { data: { data: [] } } }

  switch (defaultkey) {
    case '/search-doc':
      result = resultAll
      timeline = resultTimeline
      break
    case '/search-timeline':
      result = resultTimeline
      break
    default:
      result = resultAll
  }

  const { isLoading, isError, isSuccess, data } = result

  // timeline 数据体整理成 search_doc结构
  const newTimeline = (arr: any) => {
    const newTime = arr.map((item: any) => {
      return { name: item.update_tittle, content_markdown: item.update_doc_markdown, type: 'timeline' }
    })
    return newTime
  }

  let res: any = []
  if (isSuccess) {
    if (resultTimeline.isSuccess && resultTimeline.data != undefined) {
      res = [
        ...data?.data.data.map((item: any) => ({
          ...item,
          type: defaultkey === '/search-timeline' ? 'timeline' : 'doc',
        })),
        ...newTimeline(timeline.data.data.data),
      ]
    }
  }

  const updatePageMse = (pageNum: number, pageSize: number) => {
    getPageSetting({ pageNum, pageSize })
  }

  const changTab = (key: string) => {
    setdefaultkey(key)
    resetPageNum(1)
  }

  const renderSearchItems = (item: any, index: number) => {
    const { name, content_markdown, type, docType } = item

    if (defaultkey == '/search-timeline') {
      const { update_tittle, update_doc_markdown, _id: id } = item

      return <SearchItems key={index} searchProp={{ id, name: update_tittle, content: update_doc_markdown, type }} />
    }

    if (defaultkey == '/search-doc' && !('content_markdown' in item)) {
      return null
    }

    return <SearchItems key={index} searchProp={{ id: item._id, name, content: content_markdown, type, docType }} />
  }

  const childStatus = (() => {
    switch (true) {
      case isLoading:
        return <SearchLoading />
      case isError:
        return <SearchNoneData />
      case isSuccess && res.length === 0:
        return <SearchNoneData />
      case isSuccess:
        return (
          <div>
            {res.map(renderSearchItems)}
            <SearchPages getPageMsg={updatePageMse} />
          </div>
        )
      default:
        return <SearchNoneData />
    }
  })()

  // 待优化
  const item = [
    {
      label: '全部',
      key: '/search-doc',
      children: childStatus,
    },
    {
      label: '帮助文档',
      key: '/help-doc',
      children: childStatus,
    },
    {
      label: '最近更新',
      key: '/search-timeline',
      children: childStatus,
    },
  ]

  return (
    <tagPageNums.Provider value={{ defaultkey }}>
      <div className="bg-white m-auto w-full min-w-[768px] search-content:px-40 px-[10%] pb-[80px]">
        <TabQf defaultActiveKey={defaultkey} items={item} onTabClick={changTab} />
      </div>
    </tagPageNums.Provider>
  )
}

export default SearchBar
