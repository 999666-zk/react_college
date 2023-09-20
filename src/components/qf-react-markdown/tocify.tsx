import { Anchor } from 'antd'
import { last } from 'lodash'
import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'

export interface TocItem {
  anchor: string
  level: number
  text: string
  children?: TocItem[]
}

export interface AnchorItem {
  key: string
  title: ReactNode
  href: string
  children: AnchorItem[]
}

export type TocItems = TocItem[] // TOC目录树结构
const TocifyWrapper = styled.div`
  && .ant-anchor-wrapper {
    .ant-anchor {
      &::before {
        transform: translateY(5px);
      }
      .ant-anchor-ink {
        width: 4px;
      }
      .ant-anchor-link-active > .ant-anchor-link-title {
        color: #fb9337;
      }
      .ant-anchor-link-title {
        color: #494f67;
      }
    }
    &.hidden-line {
      .ant-anchor {
        &::before,
        .ant-anchor-ink {
          display: none;
        }
      }
    }
  }
`

export default class Tocify {
  anchors: string[]
  tocItems: TocItems = []
  constructor() {
    this.anchors = []
    this.tocItems = []
  }

  add(text: string, level: number, id = '') {
    text = text.replace(/<\/?.+?\/?>/gm, '')

    const count = this.anchors.filter((anchor) => anchor === text).length
    let anchor = id || (count ? `${text}${count}` : text)
    anchor = encodeURI(anchor)
    anchor = anchor.replace(/%/g, "");
    this.anchors.push(anchor)

    const item = { anchor, level, text }
    const items = this.tocItems

    if (items.length === 0) {
      // 第一个 item 直接 push
      items.push(item)
    } else {
      let lastItem = last(items) as TocItem // 最后一个 item

      if (item.level > lastItem.level) {
        // item 是 lastItem 的 children
        for (let i = lastItem.level + 1; i <= 6; i++) {
          const { children } = lastItem
          if (!children) {
            // 如果 children 不存在
            lastItem.children = [item]
            break
          }

          lastItem = last(children) as TocItem // 重置 lastItem 为 children 的最后一个 item

          if (item.level <= lastItem.level) {
            // item level 小于或等于 lastItem level 都视为与 children 同级
            children.push(item)
            break
          }
        }
      } else {
        // 置于最顶级
        items.push(item)
      }
    }
    return anchor
  }

  reset = () => {
    this.tocItems = []
    this.anchors = []
  }

  isItemsSingle = (items: AnchorItem[]) => {
    return items.length <= 1 && (items.length === 0 || items[0].children.length === 0)
  }

  render() {
    const getItems = (tocItems: TocItems): AnchorItem[] => {
      if (tocItems.length === 0) {
        return []
      }

      return tocItems.map((tocItem) => ({
        key: tocItem.anchor,
        href: `${location.search}#${tocItem.anchor}`,
        title: <span>{tocItem.text}</span>,
        children: getItems(tocItem.children || []),
      }))
    }

    useEffect(() => {
      setTimeout(scrollToTarget, 100); // 在组件挂载后，立即调用一次 scrollToTarget()，确保正确滚动到锚点位置。因为异步加载有些组件可能没完全加载完就滚动了，需要延迟执行
    }, []);
    const scrollToTarget = () => {
      const hash = decodeURIComponent(window.location.hash);
      const targetElement = document.querySelector(`a[href='${location.search}${hash}']`);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const targetTop = rect.top + window.scrollY - 127;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    }

    const items = getItems(this.tocItems)
    const isSingle = this.isItemsSingle(items)

    return (
      <TocifyWrapper>
        <Anchor
          className={isSingle ? 'hidden-line' : ''}
          affix={false}
          showInkInFixed
          targetOffset={208}
          items={items}
          onClick={scrollToTarget}
        ></Anchor>
      </TocifyWrapper>
    )
  }
}
