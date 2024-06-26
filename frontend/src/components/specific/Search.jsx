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

const Search = ({ isSearchOpen, setIsSearchOpen }) => {
    return (
        <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <CommandInput onValueChange={(value) => console.log("value", value)} placeholder="Search People..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandItem>
                    <UserComp />
                </CommandItem>
                {/* <CommandSeparator /> */}
            </CommandList>
        </CommandDialog>

    )
}

export default Search