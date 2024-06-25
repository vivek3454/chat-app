import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaPlus } from "react-icons/fa6"

const Search = ({ isSearchOpen, setIsSearchOpen }) => {
    return (
        <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <CommandInput onValueChange={(value)=>console.log("value",value)} placeholder="Search People..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandItem>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex gap-3 items-center">
                            <Avatar>
                                <AvatarImage className="relative z-10" src="https://github.com/shadcn.png" />
                                <AvatarFallback className="relative z-10">U</AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl">User 1</h2>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex justify-center items-center">
                            <FaPlus className="text-white" />
                        </div>
                    </div>
                </CommandItem>
                {/* <CommandSeparator /> */}
            </CommandList>
        </CommandDialog>

    )
}

export default Search