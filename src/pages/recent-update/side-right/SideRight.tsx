import { FC, useContext, useEffect } from 'react'
import { Layout } from 'antd'
const { Content } = Layout
import TextHeader from '@/components/qf-react-markdown/components/TextHeader'
import { Context } from '..'
import SearchLoading from '../../qflow-search/SearchLoading'
import QfReactMarkdown from '@/components/qf-react-markdown/index'
import { throttle } from 'lodash'
import './index.css'

const SideRight: FC = () => {
  const { checkIndex, data = [], isLoading } = useContext(Context)!

  const { update_tittle, update_doc_markdown, _updateTime } = data[checkIndex] || {}

  const isShow = !isLoading && update_tittle != undefined && _updateTime != undefined && data != undefined

  return (
    <Layout className="site-layout overflow-auto recent-content-wrapper inline-flex justify-center flex-row bg-white w-[100vw] gap-24 min-w-[610px]">
      <div className="h-[100vh] w-[22.2%] min-w-[248px] max-w-[400px]"></div>
      <Content>
        {isShow ? (
          <>
            <QfReactMarkdown
              titleContent={update_tittle}
              textHeader={<TextHeader data={{ title: update_tittle, updateTime: _updateTime }}></TextHeader>}
              content={update_doc_markdown}
              tocState={{ showToc: true }}
            />
          </>
        ) : (
          <SearchLoading />
        )}
      </Content>
    </Layout>
  )
}
export default SideRight
