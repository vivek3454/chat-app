import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { MdMenu } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const GroupsManagement = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigateBack = () => {
    navigate("/")
  }

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }
  return (
    <div className='h-screen'>
      <Sheet open={isMobileMenuOpen} onOpenChange={handleMobile}>
        <SheetContent side="left" className="p-4 w-full">
        </SheetContent>
      </Sheet>
      <div className='h-screen grid grid-cols-1 md:grid-cols-[30%_70%]'>
        <div className='hidden md:flex flex-col'>Group List</div>
        <div className='bg-gray-50 py-4 px-12'>
          <div className='flex justify-between items-center'>
            <Button onClick={navigateBack} variant="outline" size="sm" className="rounded-full">
              <FaArrowLeftLong />
            </Button>
            <Button onClick={handleMobile} variant="ghost" size="sm" className="rounded-full block md:hidden">
              <MdMenu size={24} />
            </Button>
          </div>
          <h1>Group Details</h1>
        </div>
      </div>
    </div>
  )
}

export default GroupsManagement