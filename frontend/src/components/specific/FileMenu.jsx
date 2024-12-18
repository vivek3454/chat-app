import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MdAudioFile, MdOutlineAttachFile } from 'react-icons/md';
import { Button } from '../ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { BsImageFill } from "react-icons/bs";
import { Input } from "../ui/input";
import { FaFile, FaFileVideo } from "react-icons/fa";
import { useRef } from "react";
import { toast } from "react-toastify";


const FileMenu = () => {
    const imageRef = useRef(null);
    const audioRef = useRef(null);
    const videoRef = useRef(null);
    const fileRef = useRef(null);

    const selectImage = () => imageRef.current?.click();
    const selectAudio = () => audioRef.current?.click();
    const selectVideo = () => videoRef.current?.click();
    const selectFile = () => fileRef.current?.click();

    const fileChangeHandler = async (e, key) => {
        const files = Array.from(e.target.files);

        if (files.length <= 0) return;

        if (files.length > 5)
            return toast.error(`You can only send 5 ${key} at a time`);

        // setUploadingLoader(true);

        const toastId = toast.loading(`Sending ${key}...`);

        try {
            const myForm = new FormData();

            myForm.append("chatId", chatId);
            files.forEach((file) => myForm.append("files", file));

            const res = await sendAttachments(myForm);

            if (res.data) toast.success(`${key} sent successfully`, { toastId });
            else toast.error(`Failed to send ${key}`, { toastId });

            // Fetching Here
        } catch (error) {
            toast.error(error, { toastId });
        } finally {
            // setUploadingLoader(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="secondary">
                    <MdOutlineAttachFile />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={selectImage}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="w-full">
                                <div className="flex items-center gap-3">
                                    <BsImageFill className="text-base" />
                                    Photo
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Upload Photo</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Input
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/png,image/jpeg,image/gif"
                        onChange={(e) => fileChangeHandler(e, "Images")}
                        ref={imageRef}
                    />
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={selectAudio}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="w-full">
                                <div className="flex items-center gap-3">
                                    <MdAudioFile className="text-base" />
                                    Audio
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Upload Audio</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Input
                        type="file"
                        className="hidden"
                        multiple
                        accept="audio/mpeg, audio/wav"
                        onChange={(e) => fileChangeHandler(e, "Audios")}
                        ref={audioRef}
                    />
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={selectVideo}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="w-full">
                                <div className="flex items-center gap-3">
                                    <FaFileVideo className="text-base" />
                                    Video
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Upload Video</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Input
                        type="file"
                        className="hidden"
                        multiple
                        accept="video/mp4, video/webm"
                        onChange={(e) => fileChangeHandler(e, "Videos")}
                        ref={videoRef}
                    />
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={selectFile}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="w-full">
                                <div className="flex items-center gap-3">
                                    <FaFile className="text-base" />
                                    File
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Upload File</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Input
                        type="file"
                        className="hidden"
                        multiple
                        accept="*"
                        onChange={(e) => fileChangeHandler(e, "Files")}
                        ref={fileRef}
                    />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default FileMenu