import React from 'react'

const Widget = ({ title, value, icon }) => {
    return (
        <div className="bg-white p-8 w-60 rounded-md shadow-md text-center">
            <div className='w-20 h-20 rounded-full border-[5px] border-black flex justify-center items-center text-xl font-medium mx-auto'>{value}</div>
            <div className='flex items-center justify-center mt-3 gap-4'>
                {icon}
                <h2 className='text-lg'>{title}</h2>
            </div>
        </div>
    )
}

export default Widget