import { FC, useContext } from 'react'
import { DocContext } from '@/contexts/DocContext'
import { Context as RecentContext } from '@/pages/recent-update/index'
const Header: FC<{ onSelect: (key: string) => void; docs: { key: string; title: string }[] }> = (props) => {
  const { onSelect, docs } = props

  const { selectedDoc } = useContext(DocContext)
  const recentContext = useContext(RecentContext)
  let type = selectedDoc.type
  if (!selectedDoc.type) {
    type = recentContext!.recentSelectedDoc.type
  }

  const handleClick = (key: string) => {
    onSelect(key)
  }

  return (
    <div className="fixed top-[60px] flex w-full min-w-[500px] h-[47px] border-0 border-b border-solid border-10 bg-white z-50">
      {docs.map((doc) => (
        <div
          key={doc.key}
          className={`px-16 leading-[47px] text-h4-regular ml-16 cursor-pointer ${
            doc.key === type ? 'text-qing-orange-60' : ''
          } hover:text-qing-orange-40`}
          onClick={() => handleClick(doc.key)}
        >
          {doc.title}
        </div>
      ))}
    </div>
  )
}

export default Header
