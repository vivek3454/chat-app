import AppBar from '@/components/admin/AppBar'
import { DoughnutChart, LineChart } from '@/components/admin/Charts'
import Widget from '@/components/admin/Widget'
import AdminLayout from '@/components/layouts/AdminLayout'
import useGetApiReq from '@/hooks/useGetApiReq'
import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'
import { MdGroups, MdMessage } from 'react-icons/md'

const Dashboard = () => {
    const { res, fetchData, isLoading } = useGetApiReq();
    const [stats, setStats] = useState("");

    const { messagesChart = [], usersCount = 0, groupsCount = 0, totalChatsCount = 0, messagesCount = 0 } = stats || {};

    const getStats = () => {
        fetchData(`/admin/stats`);
    };

    useEffect(() => {
        getStats();
    }, [])

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("stats response", res);
            setStats(res?.data.stats)
        }
    }, [res])

    return (
        <AdminLayout>
            <div className=''>
                <AppBar />
                <div className='grid grid-cols-[64%_34%] mt-8 gap-5'>
                    <div className="bg-white p-6 rounded-md h-[500px] shadow-md">
                        <h2 className='text-3xl font-semibold my-4'>Last Messages</h2>
                        <LineChart value={messagesChart} />
                    </div>
                    <div className="bg-white p-6 rounded-md h-[500px] shadow-md">
                        <h2 className='text-3xl font-semibold my-4'>Users</h2>
                        <DoughnutChart value={[(totalChatsCount - groupsCount), groupsCount]} />
                    </div>
                </div>
                <div className='flex justify-between mt-5'>
                    <Widget
                        title={"Users"}
                        value={usersCount}
                        icon={<FaUser />}
                    />
                    <Widget
                        title={"Groups"}
                        value={groupsCount}
                        icon={<FaUserGroup />}
                    />
                    <Widget
                        title={"Chats"}
                        value={totalChatsCount}
                        icon={<MdGroups size={26} />}
                    />
                    <Widget
                        title={"Messages"}
                        value={messagesCount}
                        icon={<MdMessage size={22} />}
                    />
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard