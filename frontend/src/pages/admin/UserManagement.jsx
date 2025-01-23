import AdminLayout from '@/components/layouts/AdminLayout'
import { PaginationWithLinks } from '@/components/PaginationWithLinks'
import DataNotFound from '@/components/shared/DataNotFound'
import Spinner from '@/components/shared/Spinner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import useGetApiReq from '@/hooks/useGetApiReq'
import { useEffect, useState } from 'react'

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

const UserManagement = () => {
    const { res, fetchData, isLoading } = useGetApiReq();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const getStats = () => {
        fetchData(`/admin/users?page=${page}`);
    };

    useEffect(() => {
        getStats();
    }, [page])

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("users response", res);
            setUsers(res?.data.users)
            setPageCount(res?.data.totalPages);
            setTotalCount(res?.data.totalMessages)
        }
    }, [res])

    return (
        <AdminLayout>
            <div className='shadow-md rounded-md p-4 mt-8 bg-white'>
                <h1 className='text-2xl font-semibold'>Users</h1>
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Friends</TableHead>
                            <TableHead>Groups</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user?._id}>
                                <TableCell>{user?._id}</TableCell>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage className="relative z-10" src={user?.avatar} />
                                        <AvatarFallback className="relative z-10">U</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{user?.name}</TableCell>
                                <TableCell>{user?.username}</TableCell>
                                <TableCell>{user?.friends}</TableCell>
                                <TableCell>{user?.groups}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {users.length === 0 &&
                    isLoading &&
                    <Spinner />
                }

                {users.length === 0 &&
                    !isLoading &&
                    <DataNotFound name="User" />
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

export default UserManagement