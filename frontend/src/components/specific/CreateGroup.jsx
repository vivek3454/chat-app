import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FaPlus } from "react-icons/fa6"
import UserComp from "../shared/UserComp"


const CreateGroup = ({ isCreateGroupOpen, setIsCreateGroupOpen }) => {
  return (
    <Dialog open={isCreateGroupOpen} onOpenChange={() => setIsCreateGroupOpen(!isCreateGroupOpen)}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="input-container">
            <Label htmlFor="">
              Group Name
            </Label>
            <Input placeholder="Enter Group Name" value={""} name="" id="" className="col-span-3 mt-2" />
          </div>

          <div className="input-container mt-4">
            <Label htmlFor="">
              Members
            </Label>
            <UserComp />
          </div>
          <DialogFooter className="mt-3">
            <Button variant="chat" type="submit">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateGroup