import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const useErrors = (errors = []) => {
    useEffect(() => {
        errors.forEach(({ isError, error, fallback }) => {
            if (isError) {
                if (fallback) fallback();
                else toast.error(error?.data?.message || "Something went wrong");
            }
        });
    }, [errors]);
};

const useAsyncMutation = (mutatationHook) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);

    const [mutate] = mutatationHook();

    const executeMutation = async (toastMessage, ...args) => {
        setIsLoading(true);
        const toastId = toast.loading(toastMessage || "Updating data...");

        try {
            const res = await mutate(...args);

            if (res.data) {
                toast.update(toastId, { render: res.data.message || "Updated data successfully", type: "success", isLoading: false });
                // toast.success(res.data.message || "Updated data successfully", {
                //     toastId: toastId,
                // });
                setData(res.data);
            } else {
                toast.update(toastId, { render: res?.error?.data?.message || "Something went wrong", type: "error", isLoading: false });
                // toast.error(res?.error?.data?.message || "Something went wrong", {
                //     toastId: toastId,
                // });
            }
        } catch (error) {
            console.log(error);
            // toast.error("Something went wrong", { toastId: toastId });
            toast.update(toastId, { render: "Something went wrong", type: "error", isLoading: false });
        } finally {
            setIsLoading(false);
        }
    };

    return [executeMutation, isLoading, data];
};

const useSocketEvents = (socket, handlers) => {
    useEffect(() => {
        Object.entries(handlers).forEach(([event, handler]) => {
            socket.on(event, handler);
        });

        return () => {
            Object.entries(handlers).forEach(([event, handler]) => {
                socket.off(event, handler);
            });
        };
    }, [socket, handlers]);
};

export { useErrors, useAsyncMutation, useSocketEvents };