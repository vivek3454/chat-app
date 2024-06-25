import './App.css'

import { Toaster } from './components/ui/sonner'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import ProtectecRoute from './components/auth/ProtectecRoute';
import LayoutLoader from './components/loaders/LayoutLoader';

const Home = lazy(() => import('./pages/home/Home'))
const Login = lazy(() => import('./pages/login/Login'))
const Chat = lazy(() => import('./pages/chat/Chat'))
const GroupsManagement = lazy(() => import('./pages/groups-management/GroupsManagement'))
const NotFound = lazy(() => import('./pages/not-found/NotFound'))

const user = true;

function App() {

  return (
    <>
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

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>

      <Toaster
        position="top-center"
        expand={true}
        richColors
        closeButton
      />
    </>
  )
}

export default App
