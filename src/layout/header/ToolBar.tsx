import { FC, SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button } from 'antd'
import Icon from '@ant-design/icons'
import SearchIcon from '@/assets/icons/search-icon'
import HomeIcon from '@/assets/icons/home'

const ToolBar: FC = () => {
  const pathName = location.pathname
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState('')

  const onSearch = (event: SyntheticEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    setInputValue('')
    navigate('qflow-search', { state: { keyWord: value } })
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Input
        size="large"
        placeholder="输入关键词搜索"
        onPressEnter={onSearch}
        prefix={<Icon component={SearchIcon}></Icon>}
        addonAfter={null}
        style={{ visibility: pathName == '/qflow-search' ? 'hidden' : 'visible', marginRight: '8px', minWidth: '120px' }}
        value={inputValue}
        onInput={(e) => setInputValue(e.currentTarget.value)}
      />

      <Button
        size="large"
        type="text"
        icon={<Icon component={HomeIcon} />}
        onClick={() => window.open('https://accounts.qingflow.com/acc/passport/login?utm_source=helpcenter')}
        className="font-sans"
      >
        进入工作台
      </Button>
    </div>
  )
}
export default ToolBar
