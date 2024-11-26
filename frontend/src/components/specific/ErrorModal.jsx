import { BiSolidError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { handleErrorModal } from "../store/slices/errorSlice";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "./ui/button";

const ErrorModal = () => {
    const dispatch = useDispatch();

    const { isErrorModalOpen, message } = useSelector((state) => state.error);

    return (
        <Dialog open={isErrorModalOpen} onOpenChange={() => dispatch(handleErrorModal({ isOpen: false, message: "" }))}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <div className="flex justify-center">
                        <BiSolidError color="red" size={70} />
                    </div>
                </DialogHeader>
                <DialogDescription></DialogDescription>
                <div className="grid gap-4 text-center">
                    <p>{message}</p>
                    <div className="flex items-center justify-end gap-2">
                        <Button onClick={() => dispatch(handleErrorModal({ isOpen: false, message: "" }))} type="submit">Ok</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ErrorModal;
