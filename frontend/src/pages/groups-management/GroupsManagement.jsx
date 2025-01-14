import LayoutLoader from '@/components/loaders/LayoutLoader'
import GroupDetails from '@/components/specific/GroupDetails'
import GroupList from '@/components/specific/GroupList'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useErrors } from '@/hooks/hooks'
import { useMyGroupsQuery } from '@/redux/api/api'
import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { MdMenu } from 'react-icons/md'
import { useNavigate, useSearchParams } from 'react-router-dom'

const GroupsManagement = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group");

  const navigateBack = () => {
    navigate("/")
  }

  const myGroups = useMyGroupsQuery("");

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
  ];

  useErrors(errors);

  console.log("myGroups",myGroups);  

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  return (
    myGroups.isLoading ? (
      <LayoutLoader />
    ) :
      <div className='h-screen'>
        <Sheet open={isMobileMenuOpen} onOpenChange={handleMobile}>
          <SheetContent side="left" className="p-4 w-full">
            <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
          </SheetContent>
        </Sheet>
        <div className='h-screen grid grid-cols-1 md:grid-cols-[30%_70%]'>
          <div className='hidden md:flex flex-col'>
            <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
          </div>
          <div className='bg-gray-50 py-4 px-12'>
            <div className='flex justify-between items-center'>
              <Button onClick={navigateBack} variant="outline" size="sm" className="rounded-full">
                <FaArrowLeftLong />
              </Button>
              <Button onClick={handleMobile} variant="ghost" size="sm" className="rounded-full block md:hidden">
                <MdMenu size={24} />
              </Button>
            </div>
            <GroupDetails />
          </div>
        </div>
      </div>
  )
}

export default GroupsManagement