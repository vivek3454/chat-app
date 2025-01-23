import OverlappingImages from '@/components/admin/OverlappingImages';
import AdminLayout from '@/components/layouts/AdminLayout';
import { PaginationWithLinks } from '@/components/PaginationWithLinks';
import DataNotFound from '@/components/shared/DataNotFound';
import Spinner from '@/components/shared/Spinner';


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import useGetApiReq from '@/hooks/useGetApiReq';
import { useEffect, useState } from 'react';


const ChatManagement = () => {
    const { res, fetchData, isLoading } = useGetApiReq();
    const [chats, setChats] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const getChats = () => {
        fetchData(`/admin/chats?page=${page}`);
    };

    useEffect(() => {
        getChats();
    }, [page])

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("chats response", res);
            setChats(res?.data.chats)
            setPageCount(res?.data.totalPages)
            setTotalCount(res?.data.totalChats)
        }
    }, [res])

    return (
        <AdminLayout>
            <div className='shadow-md rounded-md p-4 mt-8 bg-white'>
                <h1 className='text-2xl font-semibold'>Chats</h1>
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            {/* <TableHead>Avatar</TableHead> */}
                            <TableHead>Name</TableHead>
                            <TableHead>Total Members</TableHead>
                            <TableHead>Members</TableHead>
                            <TableHead>Group Chat</TableHead>
                            <TableHead>Total Messages</TableHead>
                            <TableHead>Created By</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {chats.map((chat) => (
                            <TableRow key={chat?._id}>
                                <TableCell>{chat?._id}</TableCell>
                                <TableCell>{chat?.name}</TableCell>
                                <TableCell>{chat?.totalMembers}</TableCell>
                                <TableCell>
                                    <OverlappingImages
                                        images={chat?.avatar}
                                    />
                                </TableCell>
                                {/* <TableCell>
                                    <OverlappingImages
                                        images={chat?.members.map((member) => member.avatar)}
                                    />
                                </TableCell> */}
                                <TableCell>{chat?.groupChat ? "Yes" : "No"}</TableCell>
                                <TableCell>{chat?.totalMessages}</TableCell>
                                <TableCell>{chat?.creator?.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {chats.length === 0 &&
                    isLoading &&
                    <Spinner />
                }

                {chats.length === 0 &&
                    !isLoading &&
                    <DataNotFound name="Chat" />
                }

                <PaginationWithLinks
                    page={page}
                    pageCount={pageCount}
                    setPage={setPage}
                    totalCount={totalCount}
                />
            </div>
        </AdminLayout>
    )
}

export default ChatManagement