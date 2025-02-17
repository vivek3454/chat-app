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
import { useEffect, useState } from "react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { FaCamera } from "react-icons/fa";
import user from "@/assets/user-img.jpeg"
import { axiosInstance } from "@/utils/axiosInstance"
import { userExists } from "@/redux/reducers/auth"
import { useDispatch } from "react-redux"
import usePostApiReq from "@/hooks/usePostApiReq"


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
            userImg: z.any().refine(file => file && file.length > 0, "User Image is required"),
            // preview: z.optional()
        })

    const form = useForm({
        resolver: zodResolver(LoginSignupSchema),
        defaultValues: {
            name: "",
            bio: "",
            username: "",
            password: "",
            userImg: null,
            preview: ""
        },
    })
    const fileRef = form.register("userImg");
    const userImg = form.watch("userImg");
    console.log("userImg", userImg);


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
    const dispatch = useDispatch();

    const { res, fetchData, isLoading } = usePostApiReq();    

    const onSubmit = async (apiData) => {

        if (isLogin) {
            fetchData("/user/login", apiData);
        }
        else {
            console.log("onSubmit", apiData);
            const formData = new FormData();
            formData.append("avatar", apiData.userImg[0]);
            formData.append("name", apiData.name);
            formData.append("bio", apiData.bio);
            formData.append("username", apiData.username);
            formData.append("password", apiData.password);

            fetchData("/user/signup", formData);
        }
    }

    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            dispatch(userExists(res?.data?.user))
        }
    }, [res])

    return (
        <div className="flex items-start min-h-screen p-4 bg-gradient-to-r from-blue-500/55 to-green-500.55 ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-96 w-full shadow bg-white border rounded-lg p-4 m-auto">
                    <h1 className="text-4xl font-bold text-center mb-8">
                        {isLogin ? "Login" : "Signup"}
                    </h1>

                    {!isLogin && <>
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
                    <Button className="w-full mt-6" type="submit">
                        {isLogin ? "Login" : "Signup"}
                    </Button>
                    {/* <Button variant="chat" className="w-full mt-6" type="submit">
                        {isLogin ? "Login" : "Signup"}
                    </Button> */}
                    <Button
                        disabled={isLoading}
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