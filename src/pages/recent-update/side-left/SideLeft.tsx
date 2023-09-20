import { FC } from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import StepMessage from './StepMessage'
const SiderQf = styled(Layout.Sider)`
  height: 100vh;
  border-right: 1px solid #e6eaf0;
`

const SideLeft: FC = () => {
  return (
    <div className="w-[22.2%] min-w-[248px] max-w-[400px] fixed">
      <SiderQf width={'100%'}>
        <StepMessage></StepMessage>
      </SiderQf>
    </div>
  )
}
export default SideLeft
