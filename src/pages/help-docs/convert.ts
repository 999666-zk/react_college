import { TreeDataNode } from 'antd'
import { TreeMenuData, SuggestionDocument } from './interface'

interface OriginMenuData {
  _id: string
  name: string
  children: OriginMenuData[]
  ordinal: number
  docType: string
  isFirstNav: boolean
  isSecondNav: boolean
  isThirdNav: boolean
  isFourthNav: boolean
}

interface OriginDoc {
  _id: string
  menu: OriginMenuData
  subMenu: OriginMenuData
  thirdMenu: OriginMenuData
  fourthMenu: OriginMenuData
  [key: string]: any
}

export interface BrotherNode extends TreeMenuData {
  pre?: TreeMenuData
  next?: TreeMenuData
}

export type OriginData = [OriginMenuData[], OriginDoc[]]

export interface QTreeDataNode extends TreeDataNode {
  docType: string
  parentKey: string | null
  parentNode: any
}

const sortMenu = (menu: OriginMenuData[]) => {
  if (!menu) {
    return []
  }

  const sort = (menu: OriginMenuData[], acc: OriginMenuData[]): OriginMenuData[] => {
    if (menu.length === 0) {
      return acc
    }
    const min = menu.reduce((prev, curr) => (prev.ordinal < curr.ordinal ? prev : curr))
    const rest = menu.filter((item) => item !== min)

    // Recursively sort the children arrays of each OriginMenuData object
    const sortedChildren = sort(min.children || [], [])
    const sortedMin = { ...min, children: sortedChildren }

    return sort(rest, [...acc, sortedMin])
  }

  return sort(menu, [])
}

const generateSourceMap = (docs: OriginDoc[], key: string) => {
  return new Map<string, string>(docs.filter((doc) => doc[key]?._id).map((doc) => [doc[key]._id, doc._id]))
}

export const getTreeMenuDataByType = (treeData: QTreeDataNode[], type: string): TreeDataNode[] => {
  if (!treeData) {
    return []
  }
  treeData.map((item) => {
    if (item?.children && item?.children.length >= 0) {
      getTreeMenuDataByType(item.children as QTreeDataNode[], type)
    }
  })
  return treeData.filter((item) => item.docType === type)
}

export const convertOriginDataToTree = (data: OriginData): Array<TreeMenuData> => {
  if (!data) {
    return []
  }

  // eslint-disable-next-line prefer-const
  let [menu, docs] = data

  menu = sortMenu(menu)

  const firstNavMap = generateSourceMap(docs, 'menu')
  const secondNavMap = generateSourceMap(docs, 'subMenu')
  const thirdNavMap = generateSourceMap(docs, 'thirdMenu')
  const fourthNavMap = generateSourceMap(docs, 'fourthMenu')

  let index = 0
  const getTreeData = (menu: OriginMenuData[], parent: OriginMenuData | null): QTreeDataNode[] => {
    return menu.map((item) => {
      const { name, _id, isFirstNav, isSecondNav, isThirdNav, isFourthNav } = item
      let sourceMap = fourthNavMap
      if (isFirstNav) {
        sourceMap = firstNavMap
      } else if (isSecondNav) {
        sourceMap = secondNavMap
      } else if (isThirdNav) {
        sourceMap = thirdNavMap
      }

      const node: QTreeDataNode = {
        title: name,
        key: (sourceMap?.get(_id) as string) ?? `${name}-${++index}`,
        selectable: true,
        docType: item.docType,
        parentKey: parent?._id ?? null,
        parentNode: parent,
      }
      if (item?.children?.length > 0) {
        node.children = getTreeData(item.children, node as unknown as OriginMenuData)
      }

      return node
    })
  }

  return getTreeData(menu, null) as Array<TreeMenuData>
}

//深度优先遍历给每一个节点添加pre和node，给”上一页”和“下一页”使用
export function addPreAndNext(menu: TreeMenuData[]) {
  let prevNode: null | BrotherNode = null

  function traverse(node: BrotherNode) {
    if (node) {
      const children = node.children || []
      if (prevNode) {
        prevNode.next = node
        node.pre = prevNode
      }
      prevNode = node
      for (let i = 0; i < children.length; i++) {
        traverse(children[i])
      }
    }
  }

  for (let i = 0; i < menu.length; i++) {
    traverse(menu[i])
  }
}

export const handleSuggestion = (data: SuggestionDocument[]): Array<SuggestionDocument> => {
  data.map((item) => {
    item.questionsArr = item.questions.split(',')
  })
  return data
}

export const matchHash = () => {
  const regex = /(#.+)/
  const match = window.location.href.match(regex)
  return match ? match[1] : ''
}
