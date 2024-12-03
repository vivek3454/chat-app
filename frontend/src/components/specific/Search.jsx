import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    CommandDialog,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"
import { FaPlus } from "react-icons/fa6"
import UserComp from "../shared/UserComp"
import useGetApiReq from "@/hooks/useGetApiReq"
import { useEffect, useState } from "react"
import { useLazySearchUserQuery } from "@/redux/api/api"
import { Input } from "../ui/input"
import { BsSearch } from 'react-icons/bs'
import Spinner from "../shared/Spinner"

const Search = ({ isSearchOpen, setIsSearchOpen }) => {
    const [searchInput, setSearchInput] = useState("");
    const [users, setUsers] = useState([]);

    const [searchUser, { isLoading,isUninitialized }] = useLazySearchUserQuery();

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            searchUser(searchInput)
                .then(({ data }) => setUsers(data.users))
                .catch((e) => console.log(e));
        }, 1000);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [searchInput])

    console.log("isloading", isLoading);
    console.log("isUninitialized", isUninitialized);



    return (
        <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            {/* <CommandInput onValueChange={(value) => setSearchInput(value)} placeholder="Search People..." /> */}
            <div className='flex justify-start items-center -ml-4'>
                <BsSearch className='relative left-8' />
                <Input onChange={(e) => setSearchInput(e.target.value)} className="focus-visible:ring-0 pl-12 py-6 focus-visible:ring-ring focus-visible:ring-offset-0" placeholder="Search People..." />
            </div>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {isLoading && <Spinner />}
                {users.length > 0 && users.map((user) => (
                    <CommandItem key={user?._id}>
                        <UserComp user={user} />
                    </CommandItem>
                ))}
                {/* <CommandSeparator /> */}
            </CommandList>
        </CommandDialog>

    )
}

export default Search