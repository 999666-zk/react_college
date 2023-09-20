import { FC } from 'react'
import { Breadcrumb } from 'antd'

interface propsWays {
  [x: string]: any
  [index: number]: innerProps
}

interface innerProps {
  routeTitle: string
  url: string
}

const Bread: FC<{ propsData: propsWays }> = (props) => {
  const { propsData } = props
  if (propsData == undefined) {
    return null
  }
  return (
    <Breadcrumb>
      {propsData.map((item: any, index: number) => {
        return (
          <Breadcrumb.Item key={index}>
            <a href={item.url}>{item.routeTitle}</a>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

export default Bread
