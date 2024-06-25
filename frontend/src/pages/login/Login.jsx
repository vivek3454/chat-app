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
import { toast } from "sonner"
import { useEffect, useState } from "react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { FaCamera } from "react-icons/fa";
import user from "@/assets/user-img.jpeg"


const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const LoginSignupSchema = isLogin ?
        z.object({
            username: z.string().min(2, {
                message: "Username must be at least 5 characters.",
            }),
            password: z.string().min(2, {
                message: "Password is invalid. It must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).",
            }),
        }) :
        z.object({
            name: z.string().min(2, {
                message: "Name must be at least 3 characters.",
            }),
            bio: z.string().min(2, {
                message: "Bio must be at least 10 characters.",
            }),
            username: z.string().min(2, {
                message: "Username must be at least 5 characters.",
            }),
            password: z.string().min(2, {
                message: "Password is invalid. It must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).",
            }),
            // userImg: z.instanceof(FileList).optional(),
            // preview: z.optional()
        })

    const form = useForm({
        resolver: zodResolver(LoginSignupSchema),
        defaultValues: {
            name: "",
            bio: "",
            username: "",
            password: "",
            userImg: "",
            preview: ""
        },
    })
    const fileRef = form.register("userImg");
    const userImg = form.watch("userImg");

    useEffect(() => {
        if (userImg && userImg.length > 0) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(userImg[0]);
            fileReader.addEventListener("load", function () {
                form.setValue("preview", this.result)
            });
        }
    }, [userImg, form]);


    const toggleLogin = () => setIsLogin((prev) => !prev);

    const onSubmit = (data) => {
        console.log("data", data);
        toast.success("Login successful.");
    }

    return (
        <div className="flex items-start min-h-screen p-4 bg-gradient-to-r from-blue-500/55 to-green-500.55 ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-96 w-full shadow bg-white border rounded-lg p-4 m-auto">
                    <h1 className="text-4xl font-bold text-center mb-8">
                        {isLogin ? "Login" : "Signup"}
                    </h1>

                    <div className="flex flex-col items-center justify-center">
                        <Avatar className="w-32 h-32 mb-3 z-10">
                            <AvatarImage src={form.watch("preview")} alt="@shadcn" />
                            <AvatarFallback>
                                <img src={user} alt="" />
                            </AvatarFallback>
                        </Avatar>
                        <FormField
                            control={form.control}
                            name="userImg"
                            render={({ field }) => (
                                <FormItem className="z-20 relative">
                                    <FormLabel className="cursor-pointer flex absolute -right-14 bg-gray-800/60 p-2 text-white rounded-full -top-12">
                                        <FaCamera size={16} />
                                    </FormLabel>
                                    <FormControl className="hidden">
                                        <Input type="file" {...fileRef} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {!isLogin && <>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter bio" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>}
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
                        {isLogin ? "Login" : "Signup"}
                    </Button>
                    <Button
                        className="text-blue-400 mx-auto flex"
                        onClick={toggleLogin}
                        variant="link"
                        type="button">
                        {isLogin ? "Signup" : "Login"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default Login