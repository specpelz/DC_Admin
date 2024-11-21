import { Spin } from 'antd'

const Spinner = () => {
  return (
    <div className='h-screen w-[100%] flex justify-center items-center'>

        <Spin size="large" />
    </div>
  )
}

export default Spinner