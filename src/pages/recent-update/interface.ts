export interface propsData {
  _id: string
  creater: string
  upgradeTime: string
  update_content: string
  _createTime: number
  _updateTime: number
  update_doc_markdown: string
  update_tittle: string
}

export interface propsDataOut {
  length: any
  [index: number]: propsData
}
export interface dataProps {
  title: string
  updateTime: number
}
