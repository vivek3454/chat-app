import { CgSpinner } from 'react-icons/cg'

const Spinner = ({ size = 20 }) => {
  return (
    <div className='flex justify-center w-full'>
      <CgSpinner size={size} className="mt-1 animate-spin" />
    </div>
  )
}

export default Spinner