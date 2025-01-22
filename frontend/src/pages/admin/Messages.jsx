import AdminLayout from '@/components/layouts/AdminLayout'
import React, { useEffect, useState } from 'react'
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
import useGetApiReq from '@/hooks/useGetApiReq'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { FaEye } from 'react-icons/fa'
import DataNotFound from '@/components/shared/DataNotFound'
import Spinner from '@/components/shared/Spinner'
import PaginationComp from '@/components/Pagination'


const Messages = () => {
    const { res, fetchData, isLoading } = useGetApiReq();
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const getMessages = () => {
        fetchData(`/admin/messages?page=${page}`);
    };

    useEffect(() => {
        getMessages();
    }, [page])

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("messeages response", res);
            setMessages(res?.data.messages)
            setPageCount(res?.data.totalPages)
        }
    }, [res])

    return (
        <AdminLayout>
            <div className='shadow-md rounded-md p-4 mt-8 bg-white'>
                <h1 className='text-2xl font-semibold'>Messages</h1>
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Attachments</TableHead>
                            <TableHead className="w-60">Content</TableHead>
                            <TableHead>Sent by</TableHead>
                            <TableHead>Chat</TableHead>
                            <TableHead>Group Chat</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {messages.map((message) => (
                            <TableRow key={message?._id}>
                                <TableCell>{message?._id}</TableCell>
                                <TableCell>
                                    {message?.attachments.length === 0 ?
                                        "No attachments" :
                                        <Button size="icon">
                                            <FaEye />
                                        </Button>
                                    }
                                </TableCell>
                                <TableCell>{message?.content || "No content"}</TableCell>
                                <TableCell>{message?.sender?.name || "None"}</TableCell>
                                <TableCell>{message?.chat?.name}</TableCell>
                                <TableCell>{message?.chat?.groupChat ? "Yes" : "No"}</TableCell>
                                <TableCell>{message?.createdAt && format(new Date(message?.createdAt), "dd, MMMM, yyyy")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {messages.length === 0 &&
                    isLoading &&
                    <Spinner />
                }

                {messages.length === 0 &&
                    !isLoading &&
                    <DataNotFound name="Messages" />
                }

                <PaginationComp
                    page={page}
                    pageCount={pageCount}
                    setPage={setPage}
                />
            </div>
        </AdminLayout>
    )
}

export default Messages