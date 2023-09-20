import { FC } from 'react'
import { marked } from 'marked'

import { QfReactMarkdownBottom } from './components/markdowmBottom/QfReactMarkdownBottom'

import Tocify from './tocify'
import './index.css'

const QfReactMarkdown: FC<{
  content: string
  titleContent?: string
  tocState?: { showToc: boolean; style?: string }
  textHeader?: JSX.Element
  isHelpDoc?: boolean
}> = (props) => {
  const { content, titleContent, tocState, textHeader, isHelpDoc } = props
  const tocify = new Tocify()

  if (tocState?.showToc) {
    const renderer = new marked.Renderer()

    renderer.heading = function (text, level) {
      const anchor = tocify.add(text, level)
      return `<a id="${anchor}" href="${location.search}#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
    }

    renderer.list = (body, ordered, start) => {
      let listType = 'ul',
        className = 'un-ordered'
      ordered && ((listType = 'ol'), (className = 'ordered'))
      return `<${listType} class="${className}">${body}</${listType}>\n`
    }

    renderer.paragraph = (text) => {
      return `<p class="paragraph">${text}</p>\n`
    }
    marked.setOptions({ renderer })
  }

  return (
    <div className="flex justify-center">
      <div className={isHelpDoc ? "w-[1076px]" : ""}>
        {textHeader}
        <div
          id={'markdown-content'}
          className={`customize-markdown flex-1 md-toc:mr-20 max-w-[784px] ${tocState?.showToc ? 'mr-[292px]' : 'mr-[0]'
            }`}
          dangerouslySetInnerHTML={{
            __html: marked(content || '', {
              pedantic: false,
              gfm: true,
              breaks: true,
              headerIds: false,
              sanitize: false,
              smartLists: true,
              smartypants: false,
              xhtml: false,
            }),
          }}
        ></div>
        <QfReactMarkdownBottom tocState={tocState} />
      </div>
      {
        tocState?.showToc && (
          <div
            className={`z-10 toc fixed  right-[0] w-[292px] h-[calc(100%-108px)] px-16 pt-20 overflow-y-auto bg-white ${tocState.style ?? ''
              } md-toc:hidden`}
          >
            <div className={`text-h3 mb-16 ${tocify.tocItems.length === 0 ? 'hidden' : ''}`}>{titleContent}</div>
            {tocify.render()}
          </div>
        )
      }
    </div >
  )
}
export default QfReactMarkdown
