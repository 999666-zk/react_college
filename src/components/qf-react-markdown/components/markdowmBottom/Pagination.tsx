import { useContext } from 'react'

import Icon from '@ant-design/icons'
import exLeftOutlined from '@/assets/icons/ex-left-outlined'
import exRightOutlined from '@/assets/icons/ex-right-outlined'

import { DocContext } from '@/contexts/DocContext'

export function QfPagination(props: any) {
  const node = props.node
  const { selectDoc } = useContext(DocContext)

  return (
    <div className="flex justify-between pb-20  text-gray-90">
      <div className="cursor-pointer" onClick={() => selectDoc(node.pre?.key, '', '')}>
        {node.pre ? (
          <span className="flex items-center">
            <Icon component={exLeftOutlined} />
            {'上一篇：' + node.pre.title}
          </span>
        ) : (
          ''
        )}
      </div>

      <div className="cursor-pointer" onClick={() => selectDoc(node.next?.key, '', '')}>
        {node.next ? (
          <span className="flex items-center">
            {'下一篇：' + node.next.title}
            <Icon component={exRightOutlined} />
          </span>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
