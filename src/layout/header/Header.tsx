import { FC, useEffect } from 'react'

import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, MenuProps } from 'antd'

import { SelectEventHandler } from 'rc-menu/lib/interface'

import ToolBar from './ToolBar'


const menuItems: MenuProps['items'] = [
  { label: '首页', key: 'home' },
  { label: '帮助文档', key: 'help-docs' },
  { label: '最佳实践', key: 'best-practices' },
  { label: '最近更新', key: 'recent-update' },
  { label: '视频中心', key: 'qflow-college' },
]

const CustomizeMenu = styled(Menu)`
  flex: 1;
  margin-left: 40px;
  font-size: 16px;
  font-weight: 400;
  line-height: 60px;
  border-bottom: unset;

  .ant-menu-item-selected {
    font-weight: 600 !important;
  }
`

const Header: FC = () => {
  const navigate = useNavigate()
  const onSelect: SelectEventHandler = ({ key }) => {
    if (key === 'qflow-college') {
      window.open('https://learn.qingflow.com/')
    } else {
      navigate(key)
    }
  }

  const location = useLocation()
  const selectedKeys = [location.pathname.split('/')[1]]

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('home')
    }
  }, [])

  return (
    <header className="flex justify-between h-[60px] border-0 border-b border-solid border-[#E6EAF0] px-20 bg-white min-w-[768px] ">
      <div className="flex items-center w-[143px] h-full">
        <img className="w-[143px] h-[32px] ml-4 mt-[14px] mb-[14px]" src='https://file.qingflow.com/assets/study-center/qflow-college.png' />
      </div>
      <CustomizeMenu
        mode="horizontal"
        items={menuItems}
        selectedKeys={selectedKeys}
        onSelect={onSelect}
      ></CustomizeMenu>
      <div className="w-[450px]">
        <ToolBar></ToolBar>
      </div>
    </header>
  )
}

export default Header
