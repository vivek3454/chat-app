import { CgSpinner } from 'react-icons/cg'

const LayoutLoader = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <CgSpinner size={40} className="mt-1 animate-spin" />
        </div>
    )
}

export default LayoutLoader