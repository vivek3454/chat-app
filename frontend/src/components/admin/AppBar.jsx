import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'
import { MdAdminPanelSettings, MdNotifications } from 'react-icons/md'

const AppBar = () => {
    return (
        <div className="bg-white p-3 rounded-md shadow-md flex justify-between">
            <div className='flex items-center gap-4'>
                <MdAdminPanelSettings size={50} />
                <div className="flex gap-2">
                    <Input className="w-96" placeholder="Search..." />
                    <Button>Search</Button>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <span>{format(new Date(), "MMMM dd yyyy")}</span>
                <MdNotifications size={25} />
            </div>
        </div>
    )
}

export default AppBar