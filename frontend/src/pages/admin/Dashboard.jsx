import AppBar from '@/components/admin/AppBar'
import { DoughnutChart, LineChart } from '@/components/admin/Charts'
import Widget from '@/components/admin/Widget'
import AdminLayout from '@/components/layouts/AdminLayout'
import { FaUser } from 'react-icons/fa'
import { MdGroups, MdMessage } from 'react-icons/md'


const Dashboard = () => {
    return (
        <AdminLayout>
            <div className=''>
                <AppBar />
                <div className='grid grid-cols-[64%_34%] mt-8 gap-5'>
                    <div className="bg-white p-6 rounded-md h-[500px] shadow-md">
                        <h2 className='text-3xl font-semibold my-4'>Last Messages</h2>
                        <LineChart value={[2, 2, 4, 55, 7, 2]} />
                    </div>
                    <div className="bg-white p-6 rounded-md h-[500px] shadow-md">
                        <h2 className='text-3xl font-semibold my-4'>Users</h2>
                        <DoughnutChart value={[2, 8]} />
                    </div>
                </div>
                <div className='flex justify-between mt-5'>
                    <Widget
                        title={"Users"}
                        value={20}
                        icon={<FaUser />}
                    />
                    <Widget
                        title={"Chats"}
                        value={20}
                        icon={<MdGroups size={26} />}
                    />
                    <Widget
                        title={"Messages"}
                        value={20}
                        icon={<MdMessage size={22} />}
                    />
                </div>
            </div>
        </AdminLayout>
    )
}

export default Dashboard