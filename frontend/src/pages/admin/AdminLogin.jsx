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
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import usePostApiReq from "@/hooks/usePostApiReq"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeAdminState } from "@/redux/reducers/auth"
import useGetApiReq from "@/hooks/useGetApiReq"

// const isAdmin = false;
const AdminLogin = () => {
    const { isAdmin } = useSelector((state) => state.auth)
    const navigate = useNavigate();

    const LoginSignupSchema =
        z.object({
            secretKey: z.string().min(2, {
                message: "Secret Key is required.",
            }),
            // username: z.string().min(2, {
            //     message: "Username must be at least 5 characters.",
            // }),
            // password: z.string().min(2, {
            //     message: "Password is invalid. It must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).",
            // }),
        })

    const form = useForm({
        resolver: zodResolver(LoginSignupSchema),
        defaultValues: {
            username: "",
            password: "",
            secretKey: "",
        },
    })

    const { res: res1, fetchData: fetchData1, error: error1 } = useGetApiReq();

    useEffect(() => {
        (async () => {
            fetchData1("/admin/");
        })()
    }, []);


    useEffect(() => {
        if (res1?.status === 200 || res1?.status === 201) {
            console.log("get admin response", res1);

            dispatch(changeAdminState(res1?.data?.admin))
        }
        if (error1) {
            dispatch(changeAdminState(false));
        }
    }, [res1, error1])

    
    const dispatch = useDispatch();
    const { res, fetchData, isLoading } = usePostApiReq();

    const onSubmit = (data) => {
        console.log("data", data);
        fetchData("/admin/login", { secretKey: data.secretKey });
    }

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            dispatch(changeAdminState(true));
            navigate("/admin/dashboard");
        }
    }, [res])
    
    // if (isAdmin) return <Navigate to={"/admin/dashboard"} />

    return (
        <div className="flex items-start min-h-screen p-4 bg-gradient-to-r from-blue-500/55 to-green-500.55 ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-96 w-full shadow bg-white border rounded-lg p-4 m-auto">
                    <h1 className="text-3xl font-bold text-center mb-8">
                        Admin Login
                    </h1>

                    <FormField
                        control={form.control}
                        name="secretKey"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Secret Key</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Secret Key" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* <FormField
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
                    /> */}
                    <Button variant="chat" className="w-full mt-6" type="submit">
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default AdminLogin