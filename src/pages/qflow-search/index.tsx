import { FC, useState, createContext, useEffect } from 'react'

import SearchTop from './SearchTop'
import SearchBar from './SearchBar'
import { useMutation } from 'react-query'
import { postSearchAll, postSearchTimeline } from '@/requests/index'
import { useLocation } from 'react-router-dom'
import { filterSpecialCharacter } from '@/pages/qflow-search/util'

export const KeyWordContext = createContext<{
  keyWords: string
  resultAll: any
  resultTimeline: any
  pageSet: KeyWords
  totals: number
} | null>(null)

interface KeyWords {
  queryStr: string
  pageSize: number
  pageNum: number
}

const Search: FC = () => {
  const location = useLocation()
  const { keyWord = '' } = location.state || {}

  // 过滤特殊字符
  const endFilterFromTop = filterSpecialCharacter(keyWord)

  const [keywords, setKeyWords] = useState<string>(endFilterFromTop)
  const [pageSize, setPageSize] = useState<number>(20)
  const [pageNum, setPageNum] = useState<number>(1)

  const getChildCount = (val: string) => {
    setKeyWords(val)
  }

  const mutationall = useMutation((data: KeyWords) => postSearchAll(data))
  const mutationtimeline = useMutation((data: KeyWords) => postSearchTimeline(data))

  const resall = mutationall
  const restimeline = mutationtimeline

  // 过滤特殊字符
  const endFilterString = filterSpecialCharacter(keywords)
  const SearchStartAll = () => {
    const params: any = { queryStr: `${endFilterString}`, pageSize: pageSize, pageNum: pageNum }
    mutationall.mutate(params)
  }
  const SearchStartTimeline = () => {
    const params: any = { queryStr: `${endFilterString}`, pageSize: pageSize, pageNum: pageNum }
    mutationtimeline.mutate(params)
  }

  useEffect(() => {
    if (keywords == ' ') {
      return
    }
    SearchStartAll()
    SearchStartTimeline()
  }, [keywords, pageSize, pageNum])

  // 文章总数量
  let allcount = 0
  if (resall.isSuccess && restimeline.isSuccess) {
    const resultAll = resall.data?.data
    const resultTimeline = restimeline.data?.data
    allcount = resultAll.total + resultTimeline.total
  }

  // 页面设置
  const getPageSet = (value: any) => {
    const { pageNum, pageSize } = value
    setPageNum(pageNum)
    setPageSize(pageSize)
  }
  const resetPageNums = (value: number) => {
    setPageNum(value)
  }

  return (
    <div className="overflow-hidden overflow-x-auto">
      <KeyWordContext.Provider
        value={{
          keyWords: keywords,
          resultAll: resall,
          resultTimeline: restimeline,
          totals: allcount,
          pageSet: { queryStr: endFilterString, pageSize, pageNum },
        }}
      >
        <SearchTop getKeyWords={getChildCount} />
        <SearchBar getPageSetting={getPageSet} resetPageNum={resetPageNums} />
      </KeyWordContext.Provider>
    </div>
  )
}

export default Search
