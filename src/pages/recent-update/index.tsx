import { FC, useState, createContext, useEffect } from 'react'
import { Layout } from 'antd'
import { useQuery } from 'react-query'

import SideLeft from './side-left/SideLeft'
import SideRight from './side-right/SideRight'
import { timeLine } from '../../requests'
import { propsDataOut } from './interface'
import Header from '../help-docs/components/Header'
import { useNavigate } from 'react-router-dom'
import queryToStr from 'query-string'
import { matchHash } from '../help-docs/convert'

export const Context = createContext<{
  checkIndex: number
  data: propsDataOut
  isLoading: boolean
  funcStep: (value: number) => void
  recentSelectedDoc: { id: string; type: string }
} | null>(null)

const RecentUpdate: FC = () => {
  const docTypes = [
    {
      key: 'qingFlow',
      title: '轻流',
    },
    {
      key: 'proprietaryQingFlow',
      title: '专有轻流',
    },
    {
      key: 'announcement',
      title: '公告',
    },
  ]
  const { docId = '', type = 'qingFlow' } = queryToStr.parse(location.search)
  const navigate = useNavigate()
  const [stepindex, setstepindex] = useState<number>(0)
  const [selectedDoc, setselectedDoc] = useState({
    id: docId as string,
    type: docTypes.map(({ key }) => key).includes(type as string) ? (type as string) : 'qingFlow',
  })
  const [timeLineData, setTimeLineData] = useState([])
  const { data, isLoading } = useQuery('timeline', timeLine)
  const res = data?.data.data

  const getStepindex = (value: number) => {
    setstepindex(value)
    const regex = /(type=[^#]+)/
    const match = window.location.href.match(regex)
    navigate({
      pathname: '/recent-update',
      search: match ? match[1] : '',
    })
  }

  const selectDocsType = async (type: string) => {
    const timeLineFilterByType = res?.filter((item: { docType: string }) => item.docType === type)
    const queryString = `?type=${type}${res[0] ? `&docId=${res[0]._id}` : ''}`
    navigate({
      pathname: '/recent-update',
      search: queryString,
      hash: matchHash(),
    })
    if (timeLineFilterByType[0]) {
      setselectedDoc({ id: timeLineFilterByType[0]?.key, type })
    }
    setTimeLineData(timeLineFilterByType)
    setselectedDoc((pre) => ({ ...pre, type }))
    setstepindex(0)
  }

  useEffect(() => {
    if (res && res.length) {
      selectDocsType(selectedDoc.type)
    }
  }, [res?.length])
  return (
    <div>
      <Context.Provider
        value={{
          recentSelectedDoc: selectedDoc,
          checkIndex: stepindex,
          data: timeLineData,
          funcStep: getStepindex,
          isLoading,
        }}
      >
        <Header onSelect={selectDocsType} docs={docTypes} />
        <Layout
          hasSider
          className="ant-layout ant-layout-has-sider mt-[47px]
        bg-white overflow-hidden
        "
        >
          <div>
            <SideLeft></SideLeft>
            <SideRight></SideRight>
          </div>
        </Layout>
      </Context.Provider>
    </div>
  )
}

export default RecentUpdate
