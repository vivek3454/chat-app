import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { handleErrorModal } from "@/redux/reducers/error";
import { handleLoading } from "@/redux/reducers/loading";
import { toast } from "react-toastify";

const useGetApiReq = () => {
    const [res, setRes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const dispatch = useDispatch();

    const fetchData = async (url, config = {}) => {
        try {
            setIsLoading(true);
            await dispatch(handleLoading(true));
            const response = await axiosInstance.get(url, config);
            if (response.status === 200 || response.status === 201) {
                setRes(response);
            }
        } catch (error) {
            setError(error);
            console.log("error", error);
            
            toast.error(error.response?.data?.message || "An error occurred.")
            // await dispatch(handleErrorModal({ isOpen: true, message: error.response?.data?.message || "An error occurred.", isLogoutBtn: true }));
        } finally {
            setIsLoading(false);
            await dispatch(handleLoading(false));
        }
    };

    return { res, isLoading, fetchData ,error};


};

export default useGetApiReq;