import { CgSpinner } from "react-icons/cg"

const BackDropLoader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center fixed top-0 left-0 bg-black/30">
        <CgSpinner size={40} className="mt-1 animate-spin" />
    </div>
  )
}

export default BackDropLoader