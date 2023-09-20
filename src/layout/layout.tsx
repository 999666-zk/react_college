import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'
import { FC } from 'react'
const { Content } = Layout

const AppLayout: FC = () => {
  return (
    <>
      <Layout className="bg-white">
        <div className="h-[60px]">
          <div className="w-[100vw] fixed z-[999]">
            <Header></Header>
          </div>
        </div>
        <Content>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </>
  )
}

export default AppLayout
