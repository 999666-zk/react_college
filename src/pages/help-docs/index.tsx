import { FC, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import queryToStr from 'query-string'
import { useQuery } from 'react-query'

import Main from './components/Main'
import Navigation from './components/navigation'
import Header from './components/Header'
import { getDoc, getDocsWithId, getNavigation } from '@/requests'
import {
  convertOriginDataToTree,
  getTreeMenuDataByType,
  OriginData,
  QTreeDataNode,
  addPreAndNext,
  matchHash,
} from './convert'
import { SelectedDocument, TreeMenuData } from './interface'
import { DocContext } from '@/contexts/DocContext'

const getNavigationAndDocsId = () => {
  return Promise.all([getNavigation().then((res) => res.data.data), getDocsWithId().then((res) => res.data.data)])
}

const HelpDocs: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { docId = '', type = 'nocode', parentId } = queryToStr.parse(location.search)
  const docInitData = { content: '', updateTime: 0, title: '' }
  const [docData, setDocData] = useState(docInitData)
  const [selectedDoc, setselectedDoc] = useState<SelectedDocument>({
    id: docId as string,
    type: type as string,
    parentId: parentId as string,
    parentNode: null,
  })
  const [treeData, setTreeData] = useState<TreeMenuData[]>([])
  const [navStatus, setNavStatus] = useState(true)
  const { data, isLoading } = useQuery('menu', getNavigationAndDocsId)
  const originData = convertOriginDataToTree(data as OriginData)

  /**
   * 根据 文档 id 设置文档显示内容
   * @param id 文档 id
   */
  const setDocContent = async (id: string) => {
    setDocData(docInitData)
    if (treeData.length > 0) {
      const data = (await getDoc(id).then((res) => res.data.data)) ?? {
        _updateTime: Date.now(),
        name: '',
        content_markdown: '',
      }
      const { content_markdown, _updateTime, name } = data
      setDocData({ content: content_markdown, updateTime: _updateTime, title: name })
    }
  }

  /**
   * 导航选中文档类型
   * @param type 文档类型 - [nocode, qingBI, qingCode]
   */
  const selectDocsType = async (type: string) => {
    const treeDataFilterByType = getTreeMenuDataByType(originData as QTreeDataNode[], type) as unknown as TreeMenuData[]

    const queryString = `?type=${type}${treeDataFilterByType[0] ? `&docId=${treeDataFilterByType[0].key}` : ''}`
    navigate({
      pathname: '/help-docs',
      search: queryString,
    })

    if (treeDataFilterByType[0]) {
      setDocContent(treeDataFilterByType[0]?.key)
      setselectedDoc({ id: treeDataFilterByType[0]?.key, type, parentId: '', parentNode: null })
    } else {
      setDocData(docInitData)
    }
    setTreeData(() => {
      addPreAndNext(treeDataFilterByType)
      return treeDataFilterByType
    })
  }

  /**
   * 侧边栏选中文档
   * @param docId 文档 id
   */
  const selectDoc = (docId: string, parentId: string, parentNode: any) => {
    setselectedDoc((prev) => ({ ...prev, ...{ id: docId, parentId, parentNode } }))
    const queryString = `?type=${selectedDoc.type}&docId=${docId}&parentId=`
    navigate({ pathname: '/help-docs', search: queryString, hash: parentId })
    setDocContent(docId)
  }

  useEffect(() => {
    // 判断当前喵点位置
    if (selectedDoc.id && originData.length > 0) {
      selectDoc(selectedDoc.id, matchHash(), null)
    }
    if (treeData.length <= 0) {
      setTreeData(() => {
        const treeMenuDataByType = getTreeMenuDataByType(
          originData as QTreeDataNode[],
          selectedDoc.type
        ) as unknown as TreeMenuData[]

        addPreAndNext(treeMenuDataByType)
        return treeMenuDataByType
      })
    }
  }, [originData.length])

  return (
    <>
      <DocContext.Provider
        value={{
          selectedDoc: selectedDoc,
          selectDoc,
          treeData,
          isLoading,
          navStatusState: [navStatus, setNavStatus],
        }}
      >
        <Header
          onSelect={selectDocsType}
          docs={[
            {
              key: 'nocode',
              title: '无代码',
            },
            {
              key: 'qingBI',
              title: '轻析',
            },
            {
              key: 'qingCode',
              title: '轻代码',
            },
          ]}
        />
        <Layout hasSider className="mt-[47px]">
          <Navigation onChange={(value) => setNavStatus(value)} />
          <Main docData={docData} />
        </Layout>
      </DocContext.Provider>
    </>
  )
}

export default HelpDocs
