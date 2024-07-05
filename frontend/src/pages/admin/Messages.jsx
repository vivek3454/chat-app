import AdminLayout from '@/components/layouts/AdminLayout'
import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"


const Messages = () => {
    return (
        <AdminLayout>
            <div className='shadow-md rounded-md p-4 mt-8 bg-white'>
                <h1 className='text-2xl font-semibold'>Messages</h1>
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Attachments</TableHead>
                            <TableHead>Content</TableHead>
                            <TableHead>Sent by</TableHead>
                            <TableHead>Chat</TableHead>
                            <TableHead>Group Chat</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Attachments</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Sent by</TableCell>
                            <TableCell>Chat</TableCell>
                            <TableCell>Group Chat</TableCell>
                            <TableCell>Time</TableCell>
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

export default Messages