import AppLayout from '@/components/layouts/AppLayout'

const Home = () => {
  return (
    <div className='h-full flex justify-center items-center'>
      <h1 className='text-lg text-gray-400'>Select friend to chat</h1>
    </div>
  )
}

export default AppLayout()(Home)