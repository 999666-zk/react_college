import { FC } from 'react'

const Home: FC = () => (
  <div className="w-[100%] h-[calc(100vh-64px)] overflow-hidden">
    <iframe
      width="100%"
      height="100%"
      style={{ border: 'none' }}
      src="https://qingflow.com/dashboard/f666dcda/view"
    ></iframe>
  </div>
)

export default Home
