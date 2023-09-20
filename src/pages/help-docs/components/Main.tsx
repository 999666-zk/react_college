import { FC, useContext, useState, useEffect } from 'react'
import { Layout } from 'antd'
import SearchLoading from '../../qflow-search/SearchLoading'
import TextHeader from '@/components/qf-react-markdown/components/TextHeader'
import QfReactMarkdown from '@/components/qf-react-markdown'
import Icon from '@ant-design/icons/lib/components/Icon'
import exCross from '@/assets/icons/ex-cross'
import { DocContext } from '@/contexts/DocContext'
import { debounce } from 'lodash'

const { Content } = Layout

const Main: FC<{ docData: { content: string; title: string; updateTime: number } }> = (props) => {
  const { content, title, updateTime } = props.docData
  const [bannerStatus, setBannerStatus] = useState(false)

  const { navStatusState } = useContext(DocContext)
  const [navStatus] = navStatusState ?? [null]
  const [showToc, setShowToc] = useState(true)
  const [isHelpDoc, setIsHelpDoc] = useState(true)

  useEffect(() => {
    const regex = /help-docs/
    const match = window.location.href.match(regex)
    setIsHelpDoc(match ? true : false)
    setShowToc(window.innerWidth > 1024)
    // 防抖操作
    const handleResize = debounce(() => {
      setShowToc(window.innerWidth > 1024)
    }, 300)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Layout
      className={`site-layout w-[784px] ${navStatus ? 'pl-[280px]' : 'pl-[40px]'} pr-[24px] min-w-[500px] bg-[white]`}
    >
      <Content className="relative">
        {content ? (
          <>
            <QfReactMarkdown
              titleContent={title}
              textHeader={<TextHeader data={{ title, updateTime }} />}
              content={content}
              isHelpDoc={isHelpDoc}
              tocState={{ showToc, style: bannerStatus ? '' : 'top-[102px]' }}
            />
            <div
              className={`fixed top-[120px] right-[0] w-[356px] h-[98px] px-16 bg-white ${
                !bannerStatus ? 'hidden' : ''
              } `}
            >
              <img
                className={`w-full h-full rounded-medium`}
                src="https://img2.baidu.com/it/u=1972841310,4178062951&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=361"
                alt=""
              />
              <Icon
                component={exCross}
                style={{ color: '#ffffff', position: 'absolute', top: '8px', right: '24px', cursor: 'pointer' }}
                onClick={() => {
                  setBannerStatus(false)
                  localStorage.setItem('bannerStatus', 'hide')
                }}
              ></Icon>
            </div>
          </>
        ) : (
          <SearchLoading />
        )}
      </Content>
    </Layout>
  )
}

export default Main
