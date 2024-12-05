import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { handleErrorModal, handleUnautorizedModalOpen } from "@/redux/reducers/error";
import { handleLoading } from "@/redux/reducers/loading";
import { toast } from "react-toastify";

const usePostApiReq = () => {
    const [res, setRes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const fetchData = async (url, sendData, config = {}) => {
        try {
            setIsLoading(true);
            await dispatch(handleLoading(true));
            const response = await axiosInstance.post(url, sendData, { ...config, withCredentials: true });
            console.log("res", response);
            if (response.status === 200 || response.status === 201) {
                setRes(response);
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log("post api error =>", error);
            console.log("post api error status =>", error.response);
            if (error?.response?.status === 403) {
                await dispatch(handleUnautorizedModalOpen({ isUnautorizedModalOpen: true }));
            }
            else {
                await dispatch(handleErrorModal({ isOpen: true, message: error.response?.data?.message || "An error occurred.", isLogoutBtn: true }));
            }
        } finally {
            setIsLoading(false);
            await dispatch(handleLoading(false));
        }
    };

    return { res, isLoading, fetchData };


};

export default usePostApiReq;