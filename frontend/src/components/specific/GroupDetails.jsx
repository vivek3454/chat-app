import { Suspense, lazy, useEffect, useState } from "react"
import { MdClose, MdEdit } from "react-icons/md"
import { Input } from "../ui/input";
import UserComp from "../shared/UserComp";
import { Button } from "../ui/button";
import BackDropLoader from "../loaders/BackDropLoader";
import { useChatDetailsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from "@/redux/api/api";
import { useAsyncMutation, useErrors } from "@/hooks/hooks";
const AddMember = lazy(() => import("./AddMember"))
const ConfirmDeleteAlert = lazy(() => import("../shared/ConfirmDeleteAlert"))
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";


const GroupDetails = ({ chatId }) => {
    const [isNameEdit, setIsNameEdit] = useState(false);
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupMembers, setGroupMembers] = useState([]);

    const groupDetails = useChatDetailsQuery(
        { chatId, populate: true },
        { skip: !chatId }
    );

    const [updateGroup, isLoadingGroupName] = useAsyncMutation(
        useRenameGroupMutation
    );

    const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
        useRemoveGroupMemberMutation
    );

    console.log("groupDetails", groupDetails.data);

    useEffect(() => {
        setGroupName(groupDetails?.data?.chat?.name);
        setGroupMembers(groupDetails?.data?.chat?.members || []);
        setIsNameEdit(false);
    }, [groupDetails?.data])


    const errors = [
        {
            isError: groupDetails.isError,
            error: groupDetails.error,
        },
    ];

    useErrors(errors);

    const openEdit = () => {
        setIsNameEdit((prev) => !prev);
    }

    const handleDeleteAlertCloseOpen = () => {
        setIsDeleteAlertOpen((prev) => !prev);
    }

    const handleAddMemberCloseOpen = () => {
        setIsAddMemberOpen((prev) => !prev);
    }

    const handleDelete = () => { }

    const handleRemoveMember = (userId) => {
        removeMember("Removing Member...", { chatId, userId });
    };

    const handleGroupNameUpdate = () => {
        if (!groupName) return toast.error("Group name is required");
        updateGroup("Updating Group Name...", {
            chatId,
            name: groupName,
        });
    }

    return (
        <div className="mt-5">
            <div className="flex justify-center gap-2 items-center">
                {isNameEdit ?
                    <>
                        <Input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Enter Group Name" className="max-w-52 w-full" />
                        <Button disabled={isLoadingGroupName} onClick={handleGroupNameUpdate} className="cursor-pointer">Update</Button>
                    </>
                    : <>
                        <h1 className="text-center font-bold text-3xl">{groupName}</h1>
                        <MdEdit disabled={isLoadingGroupName} onClick={openEdit} size={22} className="cursor-pointer" />
                    </>
                }
            </div>
            <div className="flex justify-between items-center gap-4 mt-10">
                <h2 className="text-lg font-semibold">Members</h2>
                <div className="flex gap-2">
                    <Button onClick={handleAddMemberCloseOpen} size="sm" variant="chat">Add Member</Button>
                    <Button onClick={handleDeleteAlertCloseOpen} size="sm" variant="destructive">Delete Group</Button>
                </div>
            </div>

            <Table className="mt-6">
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Bio</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {groupMembers?.map((member) => (
                        <TableRow key={member._id}>
                            <TableCell>
                                <img className="w-12 h-12 rounded-full" src={member?.avatar?.url} alt="" />
                            </TableCell>
                            <TableCell>{member?.name}</TableCell>
                            <TableCell>{member?.username}</TableCell>
                            <TableCell>{member?.bio} </TableCell>
                            <TableCell>
                                <button onClick={() => handleRemoveMember(member?._id)} type="button" className={`w-10 h-10 rounded-full bg-destructive flex justify-center cursor-pointer items-center`}>
                                    <FaMinus className="text-white" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            {/* <div className="flex flex-col gap-3 mt-6">
                {groupMembers?.map((member) => (
                    <UserComp
                        key={member._id}
                        user={member}
                        isAdded
                        handler={() => console.log("removing member")}
                    />
                ))}
            </div> */}

            {isAddMemberOpen &&
                <Suspense fallback={<BackDropLoader />}>
                    <AddMember
                        isAddMemberOpen={isAddMemberOpen}
                        handleClose={handleAddMemberCloseOpen}
                        chatId={chatId}
                    />
                </Suspense>
            }

            {isDeleteAlertOpen &&
                <Suspense fallback={<BackDropLoader />}>
                    <ConfirmDeleteAlert
                        handleClose={handleDeleteAlertCloseOpen}
                        handleDelete={handleDelete}
                        isDeleteAlertOpen={isDeleteAlertOpen}
                    />
                </Suspense>
            }
        </div>
    )
}

export default GroupDetails