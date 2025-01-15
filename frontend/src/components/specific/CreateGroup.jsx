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
import { useDispatch } from "react-redux"
import { useAvailableFriendsQuery, useNewGroupMutation } from "@/redux/api/api"
import { useAsyncMutation, useErrors } from "@/hooks/hooks"
import { Skeleton } from "../ui/skeleton"
import { useState } from "react"
import { toast } from "react-toastify"


const CreateGroup = ({ isCreateGroupOpen, setIsCreateGroupOpen }) => {
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!groupName) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName,
      members: selectedMembers,
    });
    setIsCreateGroupOpen(false);

  }

  return (
    <Dialog open={isCreateGroupOpen} onOpenChange={() => setIsCreateGroupOpen(!isCreateGroupOpen)}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateGroup} className="grid gap-4 py-4">
          <div className="input-container">
            <Label htmlFor="">
              Group Name
            </Label>
            <Input placeholder="Enter Group Name" onChange={(e) => setGroupName(e.target.value)} value={groupName} name="groupName" id="groupName" className="col-span-3 mt-2" />
          </div>

          <div className="input-container mt-4">
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