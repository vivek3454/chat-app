import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"

const isAdmin = true;
const AdminLogin = () => {

    const LoginSignupSchema =
        z.object({
            username: z.string().min(2, {
                message: "Username must be at least 5 characters.",
            }),
            password: z.string().min(2, {
                message: "Password is invalid. It must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).",
            }),
        })

    const form = useForm({
        resolver: zodResolver(LoginSignupSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    if (isAdmin) return <Navigate to={"/admin/dashboard"} />

    const onSubmit = (data) => {
        console.log("data", data);
        toast.success("Login successful.");
    }

    return (
        <div className="flex items-start min-h-screen p-4 bg-gradient-to-r from-blue-500/55 to-green-500.55 ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-96 w-full shadow bg-white border rounded-lg p-4 m-auto">
                    <h1 className="text-4xl font-bold text-center mb-8">
                        Admin Login
                    </h1>

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant="chat" className="w-full mt-6" type="submit">
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default AdminLogin