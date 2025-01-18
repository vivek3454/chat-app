import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Suspense, lazy, useEffect, useState } from 'react';


import { FaPlus, FaSearch } from 'react-icons/fa';
import { FaUser, FaUserGroup } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import BackDropLoader from '../loaders/BackDropLoader';
import Profile from '../specific/Profile';
import useGetApiReq from "@/hooks/useGetApiReq";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "@/redux/reducers/auth";
import { toast } from "react-toastify";

const Search = lazy(() => import('../specific/Search'))
const Notifications = lazy(() => import('../specific/Notifications'))
const CreateGroup = lazy(() => import('../specific/CreateGroup'))


const Header = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notificationCount } = useSelector((state) => state.chat);
  const { res, fetchData, isLoading } = useGetApiReq();

  const handelLogout = async () => {
    fetchData("/user/logout");
  }

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      dispatch(userNotExists())
      toast.success(res?.data?.message)
    }
  }, [res])

  const toggleSheet = () => {
    setSheetOpen(!isSheetOpen);
  };

  const openGroup = () => {
    setIsCreateGroupOpen(!isCreateGroupOpen);
  };

  const openSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const openNotification = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const openProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const navigateToGroups = () => {
    navigate("/groups-management")
  };

  useEffect(() => {
    const down = (e) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])



  return (
    <header className="flex items-center z-20 justify-between h-[4rem] relative p-4 bg-blue-400 text-white">
      <div className="text-2xl font-bold">Logo</div>
      <nav className="flex space-x-4">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavMenuItem
              icon={<FaSearch className='text-lg sm:text-xl' />}
              title="Search (ctrl + s)"
              onClick={openSearch}
            />

            <NavMenuItem
              icon={<FaPlus className='text-lg sm:text-xl' />}
              title="Create Group"
              onClick={openGroup}
            />

            <NavMenuItem
              icon={<FaUserGroup className='text-lg sm:text-2xl' />}
              title="Manage Groups"
              onClick={navigateToGroups}
            />

            <Notifications>
              <NavMenuItem
                icon={<IoNotifications className='text-lg sm:text-2xl' />}
                title="Notifications"
                onClick={openNotification}
                count={notificationCount}
              />
            </Notifications>

            <NavMenuItem
              icon={<FaUser className='text-lg sm:text-xl' />}
              title="Profile"
              onClick={openProfile}
            />

            <NavMenuItem
              icon={<MdLogout className='text-lg sm:text-2xl' />}
              title="Logout"
              onClick={handelLogout}
            />
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      {/* <div className="md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
          <SheetTrigger asChild>
            <button onClick={toggleSheet} className="focus:outline-none">
              <MdMenu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-4 w-full">
            <NavigationMenu className="flex justify-center items-center">
              <NavigationMenuList className="flex flex-col gap-4 items-start">
                <NavMenuItem
                  name='Search'
                  icon={<FaSearch size={20} />}
                  title="Search (ctrl + s)"
                  onClick={openSearch}
                />

                <NavMenuItem
                  name="Create Group"
                  icon={<FaPlus size={20} />}
                  title="Create Group"
                  onClick={() => { }}
                />

                <NavMenuItem
                  icon={<FaUserGroup size={24} />}
                  title="Manage Groups"
                  onClick={navigateToGroups}
                />

                <NavMenuItem
                  icon={<IoNotifications size={24} />}
                  title="Notifications"
                  onClick={() => { }}
                />

                <NavMenuItem
                  icon={<FaUser size={20} />}
                  title="Profile"
                  onClick={openProfile}
                />

                <NavMenuItem
                  icon={<MdLogout size={24} />}
                  title="Logout"
                  onClick={() => { }}
                />
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </div> */}


      {isSearchOpen &&
        <Suspense fallback={<BackDropLoader />}>
          <Search
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
        </Suspense>
      }

      {isNotificationsOpen &&
        <Suspense fallback={<BackDropLoader />}>
          <Notifications
            isNotificationsOpen={isNotificationsOpen}
            setIsNotificationsOpen={setIsNotificationsOpen}
          />
        </Suspense>
      }

      {isCreateGroupOpen &&
        <Suspense fallback={<BackDropLoader />}>
          <CreateGroup
            isCreateGroupOpen={isCreateGroupOpen}
            setIsCreateGroupOpen={setIsCreateGroupOpen}
          />
        </Suspense>
      }

      {isProfileOpen &&
        <Suspense fallback={<BackDropLoader />}>
          <Profile
            isProfileOpen={isProfileOpen}
            setIsProfileOpen={setIsProfileOpen}
          />
        </Suspense>
      }
    </header>
  );
};


const NavMenuItem = ({ title, onClick, icon, name = "", count }) => {
  return (
    <NavigationMenuItem onClick={onClick}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='flex gap-2 relative'>
            {icon} {name}
            {count ? <div className="w-5 h-5 absolute -top-3 -right-2 rounded-full bg-red-400 text-white flex justify-center items-center">{count}</div> :""}
          </TooltipTrigger>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </NavigationMenuItem>
  )
}

export default Header;
