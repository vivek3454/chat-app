import React, { useState } from 'react'
import { MdDashboard, MdGroups, MdLogout, MdManageAccounts, MdMessage } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import LogoutModal from './LogoutModal'

const Sidebar = () => {
    const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

    const adminTabs = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: <MdDashboard size={22} />
        },
        {
            name: "Users",
            path: "/admin/users-management",
            icon: <MdManageAccounts size={22} />
        },
        {
            name: "Chats",
            path: "/admin/chats-management",
            icon: <MdGroups size={22} />
        },
        {
            name: "Messages",
            path: "/admin/messages",
            icon: <MdMessage size={22} />
        },
    ]

    const { pathname } = useLocation();

    return (
        <div className='py-4 sticky top-0 h-screen'>
            <div className='flex flex-col gap-2'>
                {adminTabs.map((tab) => (
                    <Link className='mx-7' key={tab.name} to={tab.path}>
                        <Button variant="ghost" className={`flex gap-2 justify-start w-full text-base ${pathname.includes(tab.path) && "bg-gray-400 text-white"}`}>
                            {tab.icon}
                            {tab.name}
                        </Button>
                    </Link>
                ))}
                <Link className='mx-7'>
                    <Button onClick={() => setIsLogOutModalOpen(true)} variant="ghost" className={`flex gap-2 text-base justify-start w-full`}>
                        <MdLogout size={22} />
                        Logout
                    </Button>
                </Link>

                {isLogOutModalOpen &&
                    <LogoutModal
                        isLogOutModalOpen={isLogOutModalOpen}
                        setIsLogOutModalOpen={setIsLogOutModalOpen}
                    />
                }
            </div>
        </div>
    )
}

export default Sidebar