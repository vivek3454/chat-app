import useGetApiReq from '@/hooks/useGetApiReq';
import { changeAdminState } from '@/redux/reducers/auth';
import { readCookie } from '@/utils/readCookie';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const AdminProtectedRoute = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isReturn, setIsReturn] = useState(true);

    const adminInfo = readCookie("chat-admin-token")
    console.log("adminInfo",adminInfo);
    

    // Render the protected route content or nothing based on admin status
    // return adminInfo ? <Outlet /> : <Navigate to="/admin/" />;

    useEffect(() => {
        if (adminInfo) {
            setIsReturn(false);
        } else {
            setIsReturn(true);
            navigate("/admin/");
        }
    }, [adminInfo]);


    if (!isReturn) {
        return <Outlet />;
    }
};

export default AdminProtectedRoute;
