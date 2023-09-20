import { CheckboxOptionType } from 'antd/es/checkbox'

export interface treePropsinner {
  children: any
  doc: object
  name: string
  ordinal: number
  treeKey: string
  treekey: number
  _createTime: number
  _id: string
  _updateTime: number
}
export interface treeProps {
  [index: number]: treeProps
}

export interface TreeMenuData {
  key: string
  title: string
  selectable: boolean
  children: TreeMenuData[] | undefined
}

export interface SelectedDocument {
  id: string
  type: string
  parentId: string
  parentNode: (TreeMenuData & SelectedDocument) | null
}
export interface SuggestionDocument {
  _id: string
  whether_have_help: boolean
  more_suggest: string
  questions: string
  questionsArr: string[]
  _updateTime: number
}
