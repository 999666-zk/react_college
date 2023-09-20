import { TreeMenuData, SelectedDocument, SuggestionDocument } from '@/pages/help-docs/interface'
import { createContext } from 'react'

interface DocumentContext {
  treeData: Array<TreeMenuData>
  selectDoc: (docId: string, parentId: string, parentNode: any) => void
  selectedDoc: SelectedDocument
  isLoading: boolean
  /** 左侧导航栏状态 */
  navStatusState?: [boolean, (value: boolean) => void]
}
export const DocContext = createContext<DocumentContext>({
  treeData: [],
  selectedDoc: { id: '', type: '', parentId: '', parentNode: null },
  isLoading: true,
  selectDoc: () => {},
})
