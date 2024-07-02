import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import UserComp from "../shared/UserComp"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const AddMember = ({ isAddMemberOpen, handleClose }) => {
    return (
        <Dialog open={isAddMemberOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Add Member</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                    <div className="input-container">
                        <Label htmlFor="">
                            Members
                        </Label>
                        <div className="mt-2">
                            <UserComp />
                        </div>
                    </div>
                    <DialogFooter className="mt-5">
                        <Button variant="chat" type="submit">
                            Add
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddMember