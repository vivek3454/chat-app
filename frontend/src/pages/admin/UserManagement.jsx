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
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>
                            <Avatar>
                                <AvatarImage className="relative z-10" src="https://github.com/shadcn.png" />
                                <AvatarFallback className="relative z-10">U</AvatarFallback>
                            </Avatar>
                            </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Friends</TableCell>
                            <TableCell>Groups</TableCell>
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

export default UserManagement