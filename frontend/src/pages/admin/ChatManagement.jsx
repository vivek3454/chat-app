import AdminLayout from '@/components/layouts/AdminLayout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"


const ChatManagement = () => {
    return (
        <AdminLayout>
            <div className='shadow-md rounded-md p-4 mt-8 bg-white'>
                <h1 className='text-2xl font-semibold'>Chats</h1>
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Total Members</TableHead>
                            <TableHead>Members</TableHead>
                            <TableHead>Total Messages</TableHead>
                            <TableHead>Created By</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage className="relative z-10" src="https://github.com/shadcn.png" />
                                    <AvatarFallback className="relative z-10">U</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>120</TableCell>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage className="relative z-10" src="https://github.com/shadcn.png" />
                                    <AvatarFallback className="relative z-10">U</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>30</TableCell>
                            <TableCell>Created By</TableCell>
                        </TableRow>
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <Pagination>
                                    <PaginationContent className="ml-auto">
                                        <PaginationItem>
                                            <PaginationPrevious href="#" />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext href="#" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>

                            </TableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>
            </div>
        </AdminLayout>
    )
}

export default ChatManagement