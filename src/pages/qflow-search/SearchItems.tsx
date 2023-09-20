import { FC, useContext } from 'react'
import { KeyWordContext } from '.'
import { Col, Row } from 'antd'

interface SearchItem {
  id: string
  type: 'timeline' | 'doc'
  docType?: string
  name: string
  content: string
}

const SearchItems: FC<{ searchProp: SearchItem }> = (props) => {
  const { name, content, id, type, docType } = props.searchProp
  const { keyWords } = useContext(KeyWordContext)!

  if (type === 'doc') {
  }

  if (content !== undefined && name !== undefined) {
    // 搜索内容高亮显示
    // 高亮处理
    const highlightKeyword = (text: string, keyword: string) => {
      return text.replaceAll(keyword, `<span style="color:red">${keyword}</span>`)
    }

    //长文章截取字符串
    const extractNearbyString = (str: string, keyword: string, distance: number) => {
      const index = str.indexOf(keyword)
      if (index === -1) {
        return str.substring(index, 200)
      }
      if (index > 200) {
        const start = Math.max(0, index - distance)
        const end = Math.min(str.length, index + keyword.length + distance)
        return str.substring(start, end)
      } else {
        return str.substring(index, 200)
      }
    }

    // 整理数据
    const newName = highlightKeyword(name, keyWords)
    const SubContent = extractNearbyString(content, keyWords, 200)
    const newSubContent = `${highlightKeyword(SubContent, keyWords)} ......`

    const hrefAddress =
      type === 'doc' ? `/help-docs?type=${docType ? docType : 'nocode'}&docId=${id}` : '/recent-update'

    return (
      <div className="w-[100%] mt-[28px] first-of-type:mt-[20px]">
        <Row>
          <Col span={24}>
            <a href={hrefAddress} className="text-[#121315] hover:text-[#FB9337]">
              <div
                className="leading-h4 font-sans font-semibold text-[16px]"
                dangerouslySetInnerHTML={{ __html: newName }}
              ></div>
            </a>
            <div
              className="font-sans text-[14px] overflow-hidden text-[#494F57]"
              dangerouslySetInnerHTML={{ __html: newSubContent }}
            ></div>
            <div className="flex mt-4">
              <span className="inline-block mr-4">来自</span>

              <span className="text-gray-80">{type === 'doc' ? '帮助文档' : '最近更新'}</span>
            </div>
          </Col>
        </Row>
      </div>
    )
  } else {
    return null
  }
}

export default SearchItems
