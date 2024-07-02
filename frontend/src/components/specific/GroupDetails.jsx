import { Suspense, lazy, useState } from "react"
import { MdClose, MdEdit } from "react-icons/md"
import { Input } from "../ui/input";
import UserComp from "../shared/UserComp";
import { Button } from "../ui/button";
import BackDropLoader from "../loaders/BackDropLoader";
const AddMember = lazy(() => import("./AddMember"))
const ConfirmDeleteAlert = lazy(() => import("../shared/ConfirmDeleteAlert"))

const GroupDetails = () => {
    const [isNameEdit, setIsNameEdit] = useState(false);
    const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

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

    return (
        <div className="mt-5">
            <div className="flex justify-center gap-2 items-center">
                {isNameEdit ?
                    <>
                        <Input placeholder="Enter Group Name" className="max-w-52 w-full" />
                        <MdClose onClick={openEdit} size={22} className="cursor-pointer" />
                    </>
                    : <>
                        <h1 className="text-center font-bold text-3xl">Group Name</h1>
                        <MdEdit onClick={openEdit} size={22} className="cursor-pointer" />
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
            <div className="flex flex-col gap-3 mt-6">
                <UserComp />
            </div>

            {isAddMemberOpen &&
                <Suspense fallback={<BackDropLoader />}>
                    <AddMember
                        isAddMemberOpen={isAddMemberOpen}
                        handleClose={handleAddMemberCloseOpen}
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