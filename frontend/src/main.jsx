import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Cards from '../components/post/Cards.jsx';
import Createpost from '../components/Createpost.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Readmore from '../components/post/Readmore.jsx';
import Login from '../components/Login.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import Signup from '../components/Signup.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';
import Profile from '../components/profile/Profile.jsx';
import  Settings  from '../components/profile/Settings.jsx';
import EditProfile from '../components/profile/EditProfile.jsx';
import ProfilePage from '../components/profile/ProfilePage.jsx';
import NotFound from '../components/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Cards /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        path: "/createpost",
        element: <ProtectedRoute>
          <Createpost />
        </ProtectedRoute>
      },
      {
        path: "/readmore",
        element: <ProtectedRoute>
          <Readmore />
        </ProtectedRoute>
      },
      { path: "/profile", element: <Profile /> },
      { path: "/editprofile", element: <EditProfile /> },
      { path:"/profile/:userId", element: <ProfilePage /> },
      { path: "/settings", element: <Settings /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
