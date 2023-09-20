import { FC, Key, useContext, useEffect, useState } from 'react'

import { Skeleton, Tree } from 'antd'
import { debounce } from 'lodash'
import styled from 'styled-components'

import { DocContext } from '@/contexts/DocContext'

import { TreeProps } from 'antd/es/tree'
import { matchHash } from '../../convert'
const QfTree = styled(Tree)`
  padding-top: 8px;
  font-size: 14px;
  line-height: 22px;
  color: #494f57;
  background: #f9fafc;

  .ant-tree-indent-unit {
    width: 20px;
  }

  .ant-tree-treenode {
    width: 240px;
    height: 40px;
    overflow: hidden;
    &:hover {
      background: #e6eaf0;
      border-radius: 4px;
    }

    .ant-tree-switcher {
      width: 20px;
      margin-left: 8px;
    }

    .ant-tree-title {
      display: inline-block;
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .ant-tree-treenode-selected {
    background: #ffebdb;
    border-radius: 4px;
    color: #fb9337;

    &:hover {
      background: #ffebdb;
    }
  }

  .ant-tree-node-content-wrapper {
    width: 100%;
    cursor: pointer;
    transition: all 0.1s;
    &,
    .ant-tree-switcher {
      line-height: 40px;
    }

    &:hover {
      background: none;
    }
  }

  .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background: none;
  }

  .ant-tree-list-holder-inner {
    align-items: center;
  }

  .ant-tree-node-content-wrapper-close {
  }

  .ant-tree-switcher {
    line-height: 40px;
  }
`

const TreeMenu: FC = () => {
  const { selectedDoc, selectDoc, treeData, isLoading } = useContext(DocContext)
  const [selectedKeys, setSelectedKeys] = useState([selectedDoc.id || treeData[0]?.key])
  const [expandedKeys, setExpandKeys] = useState<Key[]>([])
  const selectTreeNode = (ids: string[], parentId: string, node?: any, selected = true) => {
    if (selectedDoc.id === node?.key) {
      return
    }
    if (selected) {
      if (selectedDoc.id == ids[0]) {
        parentId = matchHash()
      }
      selectDoc(ids[0], parentId, node)

      const initExpandedKey = [...expandedKeys]
      // 有子节点,需要展开,同时检查元素是否有父节点,处理刷新页面时展开

      let curNode = node
      // 首次加载
      if (node?.children && node.children[0] === true) {
        Object.assign(curNode, {
          ...selectedDoc,
          parentKey: selectedDoc.parentId,
          parentNode: selectedDoc.parentNode,
        })
      }
      !initExpandedKey.includes(ids[0]) && curNode?.children?.length && initExpandedKey.push(ids[0])
      while (curNode?.parentKey) {
        if (!initExpandedKey.includes(curNode.parentKey)) {
          initExpandedKey.push(curNode.parentKey)
        }
        curNode = curNode.parentNode
      }
      setExpandKeys(initExpandedKey)
    }
    setSelectedKeys(ids)
  }

  function getAllChildren(node: any) {
    if (node.children) {
      return node.children.reduce((acc: any[], cur: any) => {
        return [...acc, cur.key, ...getAllChildren(cur)]
      }, [])
    }
    return []
  }

  const handleExpand: TreeProps<any>['onExpand'] = (newExpandedKeys: Key[], { node, expanded }) => {
    if (!expanded) {
      const childrens = getAllChildren(node)
      newExpandedKeys = newExpandedKeys.filter((item) => !childrens.includes(item))
      setExpandKeys(newExpandedKeys)
      return
    }
    setExpandKeys(newExpandedKeys)
  }

  useEffect(() => {
    if (!selectedDoc.id && treeData.length > 0) {
      selectTreeNode([treeData[0].key], '')
      setSelectedKeys([treeData[0].key])
    } else {
      // 刷新页面保留展开状态
      selectTreeNode([selectedDoc.id], '', { children: [true] })
    }
  }, [treeData.length, selectedDoc.id])

  if (isLoading || treeData.length <= 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Skeleton active style={{ width: '240px', marginTop: '10px' }} />
        <Skeleton active style={{ width: '240px', marginTop: '10px' }} />
        <Skeleton active style={{ width: '240px', marginTop: '10px' }} />
      </div>
    )
  }

  return (
    <>
      {treeData.length && (
        <QfTree
          key={selectedDoc.type}
          style={{ minWidth: '256px' }}
          autoExpandParent={true}
          expandedKeys={expandedKeys}
          treeData={treeData}
          selectedKeys={selectedKeys}
          onExpand={handleExpand}
          onSelect={debounce(
            (key, { selected, node: { parentKey }, node }) => selectTreeNode(key, parentKey, node, selected),
            300
          )}
        />
      )}
    </>
  )
}

export default TreeMenu
