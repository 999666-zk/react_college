import { FC, useContext, useMemo, useState } from 'react'

import Help from './Help'
import { QfPagination } from './Pagination'

import { DocContext } from '@/contexts/DocContext'
import { BrotherNode } from '@/pages/help-docs/convert'

function findNode(node: Array<BrotherNode>, targetKey: string): BrotherNode | undefined {
  if (Array.isArray(node)) {
    for (const item of node) {
      if (item.key === targetKey) {
        return item
      }
      const resultNode = searchNode(item, targetKey)
      if (resultNode) return resultNode
    }
  }
  function searchNode(node: BrotherNode, targetKey: string): BrotherNode | undefined {
    if (node.key === targetKey) {
      return node
    }
    if (node.children) {
      for (const child of node.children) {
        const result = searchNode(child, targetKey)
        if (result) {
          return result
        }
      }
    }
  }
}
export const QfReactMarkdownBottom: FC<{ tocState?: { showToc: boolean; style?: string } }> = (props) => {
  const { tocState } = props;
  const { selectedDoc, treeData } = useContext(DocContext)
  const [node, setNode] = useState<BrotherNode | undefined>()
  useMemo(() => {
    setNode(findNode(treeData, selectedDoc.id))
  }, [selectedDoc.id])

  return node ? (
    <div className={` max-w-[784px] min-w-[440px] mt-32  ${tocState?.showToc ? 'mr-[276px]' : 'mr-[0]'}`}>
      <QfPagination node={node} />
      <Help node={node} />
    </ div>
  ) : (
    <></>
  )
}

