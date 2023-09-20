import { FC, useContext, useEffect, useState } from 'react'

import { Layout } from 'antd'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import TreeMenu from './TreeMenu'
import { debounce } from 'lodash'
import { DocContext } from '@/contexts/DocContext'

const { Sider } = Layout

const QfSider = styled(Sider)`
  height: 100vh;
  border-right: 1px solid #e6eaf0;
  background-color: #f9fafc;
  box-sizing: border-box;
  z-index: 20;
  .ant-layout-sider-children {
    height: calc(100% - 108px);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .ant-layout-sider-zero-width-trigger-left {
    top: 120px;
    width: 16px;
    height: 40px;
  }
  && .ant-layout-sider-zero-width-trigger {
    left: ${(props) => (props.collapsed ? '1px' : 'none')};
    width: 14px;
    height: 40px;
    border-radius: 4px;
    border-bottom-left-radius: ${(props) => (props.collapsed ? '0' : '4px')};
    border-top-left-radius: ${(props) => (props.collapsed ? '0' : '4px')};
    background: #ffffff;
    inset-inline-end: -8px;
    box-shadow: 0px 0px 0px 1px #e6eaf0, 0px 4px 6px rgba(12, 31, 80, 0.04);
    border: none;
    &:hover {
      box-shadow: 0px 0px 0px 1px #e6eaf0, 0px 4px 6px rgba(12, 31, 80, 0.04);
      svg {
        fill: #494f57;
      }
    }

    &:active {
      svg {
        fill: #494f57;
      }
    }
  }
`

const Navigation: FC<{ onChange: (value: boolean) => void }> = ({ onChange = () => {} }) => {
  const { navStatusState } = useContext(DocContext)

  const [navStatus, setNavStatus] = navStatusState!

  const [collapsed, setCollapsed] = useState(false)

  const renderArrow = collapsed ? (
    <CaretRightOutlined style={{ width: '.6em', height: '1.2em', color: '#767E89' }} />
  ) : (
    <CaretLeftOutlined style={{ width: '.6em', height: '1.2em', color: '#767E89' }} />
  )

  const onCollapse = (value: boolean) => {
    setCollapsed(value)
    setNavStatus(!value)
  }

  useEffect(() => {
    const handleResize = debounce(() => {
      setCollapsed(window.innerWidth < 916)
      setNavStatus(window.innerWidth >= 916)
    }, 300)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <QfSider
      width={256}
      theme="light"
      style={{
        position: 'fixed',
        height: '100vh',
        background: '#f9fafc',
        transition: 'all .2s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      onCollapse={onCollapse}
      trigger={renderArrow}
    >
      <TreeMenu />
    </QfSider>
  )
}

export default Navigation
