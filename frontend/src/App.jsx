import './App.css'

import { Toaster } from './components/ui/sonner'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from 'react';
import ProtectecRoute from './components/auth/ProtectecRoute';
import LayoutLoader from './components/loaders/LayoutLoader';
import { axiosInstance } from './utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { userExists, userNotExists } from './redux/reducers/auth';
import { handleErrorModal } from './redux/reducers/error';
import ErrorModal from './components/specific/ErrorModal';
import useGetApiReq from './hooks/useGetApiReq';
import { ToastContainer } from 'react-toastify';

const Home = lazy(() => import('./pages/home/Home'))
const Login = lazy(() => import('./pages/login/Login'))
const Chat = lazy(() => import('./pages/chat/Chat'))
const GroupsManagement = lazy(() => import('./pages/groups-management/GroupsManagement'))
const NotFound = lazy(() => import('./pages/not-found/NotFound'))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement'))
const UserManagement = lazy(() => import('./pages/admin/UserManagement'))
const Messages = lazy(() => import('./pages/admin/Messages'))
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state?.loading);
  const { res, fetchData } = useGetApiReq();

  useEffect(() => {
    (async () => {
      fetchData("/user/me");
    })()
  }, []);


  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      dispatch(userExists(res?.data?.user))
    }
    else {
      dispatch(userNotExists());
    }
  }, [res])


  return loader ? (
    <LayoutLoader />
  ) : (
    <>

      {/* {isLoading && <LayoutLoader />} */}
      <ErrorModal />

      <Router>
        <Suspense fallback={<LayoutLoader />}>
          <Routes>
            <Route element={<ProtectecRoute user={user} />}>
              <Route path='/' element={<Home />} />
              <Route path='/chat/:chatId' element={<Chat />} />
              <Route path='/groups-management' element={<GroupsManagement />} />
            </Route>

            <Route path='/login' element={
              <ProtectecRoute user={!user} redirect='/'>
                <Login />
              </ProtectecRoute>
            } />

            {/* Admin Routes */}
            <Route path='/admin' element={<AdminLogin />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/users-management' element={<UserManagement />} />
            <Route path='/admin/chats-management' element={<ChatManagement />} />
            <Route path='/admin/messages' element={<Messages />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>

      {/* <Toaster
        position="top-center"
        expand={true}
        richColors
        closeButton
      /> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
    </>
  )
}

export default App
