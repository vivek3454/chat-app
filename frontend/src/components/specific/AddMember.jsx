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
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from "@/redux/api/api"
import { useAsyncMutation, useErrors } from "@/hooks/hooks"
import { Skeleton } from "../ui/skeleton"
import { useState } from "react"
import { toast } from "react-toastify"

const AddMember = ({ isAddMemberOpen, handleClose, chatId }) => {
    const [selectedMembers, setSelectedMembers] = useState([]);

    const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

    const [addMembers, isLoadingAddMembers] = useAsyncMutation(
        useAddGroupMembersMutation
    );

    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) =>
            prev.includes(id)
                ? prev.filter((currElement) => currElement !== id)
                : [...prev, id]
        );
    };

    const handleAddMember = (e) => {
        e.preventDefault();

        if (selectedMembers.length === 0)
            return toast.error("Please Select Atleast 1 Member");

        addMembers("Adding Members...", { members: selectedMembers, chatId });
        handleClose();
    }

    useErrors([{ isError, error }]);

    return (
        <Dialog open={isAddMemberOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Add Member</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddMember} className="grid gap-4 py-4">
                    <div className="input-container">
                        <Label htmlFor="">
                            Members
                        </Label>
                        <div className="flex flex-col gap-4 mt-5">
                            {isLoading ? (
                                <Skeleton />
                            ) : (
                                data?.friends?.map((friend) => (
                                    <UserComp
                                        user={friend}
                                        key={friend._id}
                                        handler={selectMemberHandler}
                                        isAdded={selectedMembers.includes(friend._id)}
                                    />
                                ))
                            )}
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