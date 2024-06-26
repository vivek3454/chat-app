import AppLayout from "@/components/layouts/AppLayout"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdOutlineAttachFile, MdSend } from "react-icons/md";

const Chat = () => {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="h-[90%]"></div>
      <div className="mt-auto flex gap-3 bg-white p-2 h-[10%]">
        <Button variant="secondary">
          <MdOutlineAttachFile />
        </Button>
        <Input placeholder="Type Message Here..." />
        <Button variant="chat">
          <MdSend />
        </Button>
      </div>
    </div>
  )
}

export default AppLayout()(Chat);