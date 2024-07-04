import React from 'react'
import Sidebar from '../specific/Sidebar'
import { Navigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    const isAdmin = true;

    if(!isAdmin) return <Navigate to={"/admin"} />
    return (
        <div className='grid grid-cols-[15%_85%] min-h-screen'>
            <Sidebar />
            <div className='bg-gray-50 p-5'>{children}</div>
        </div>
    )
}

export default AdminLayout