import './App.css';

import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectRoute from './components/auth/ProtectRoute';
import LayoutLoader from './components/loaders/LayoutLoader';
import ErrorModal from './components/specific/ErrorModal';
import useGetApiReq from './hooks/useGetApiReq';
import { userExists, userNotExists } from './redux/reducers/auth';
import { SocketProvider } from './socket';

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

function App() {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state?.loading);
  const { res, fetchData, error } = useGetApiReq();

  useEffect(() => {
    (async () => {
      fetchData("/user/me");
    })()
  }, []);


  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      dispatch(userExists(res?.data?.user))
    }
    if (error) {
      dispatch(userNotExists());
    }
  }, [res, error])


  return loader ? (
    <LayoutLoader />
  ) : (
    <>

      {isLoading && <LayoutLoader />}
      <ErrorModal />

      <Router>
        <Suspense fallback={<LayoutLoader />}>
          <Routes>
            <Route element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }>
              <Route path='/' element={<Home />} />
              <Route path='/chat/:chatId' element={<Chat />} />
              <Route path='/groups-management' element={<GroupsManagement />} />
            </Route>

            <Route path='/login' element={
              <ProtectRoute user={!user} redirect='/'>
                <Login />
              </ProtectRoute>
            } />

            {/* Admin Routes */}
            <Route path='/admin' element={<AdminLogin />} />
            {/* <Route element={<AdminProtectedRoute />}> */}
              <Route path='/admin/dashboard' element={<Dashboard />} />
              <Route path='/admin/users-management' element={<UserManagement />} />
              <Route path='/admin/chats-management' element={<ChatManagement />} />
              <Route path='/admin/messages' element={<Messages />} />
            {/* </Route> */}

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
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
