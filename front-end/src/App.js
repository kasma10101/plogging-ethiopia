import './App.css';
import Landing from "./components/pages/landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/pages/layout";
import Membership from "./components/pages/membership";
import Blog from "./components/pages/blog";
import Gallery from "./components/pages/gallery";
import Contactus from "./components/pages/contactus";
import AdminPage from "./components/pages/admin-page";
import AdminBlogs from "./components/admin-pages/blogs";
import Members from "./components/admin-pages/members";
import AdminGallery from "./components/admin-pages/gallery";
import {QueryClient, QueryClientProvider} from "react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserUploaded from "./components/admin-pages/userUploadedDatas";
import Profile from "./components/pages/profile";
import Login from "./components/pages/login";
import BlogDetail from './components/pages/BlogDetail';
import Admins from './components/admin-pages/Admins';
import ShowAdmin from './components/admin-pages/ShowAdmin';
import SubscribedEvent from './components/admin-pages/SubscribedEvent';
import AddEvent from './components/admin-pages/AddEvent';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';
import ShowEvent from './components/admin-pages/showEvent';
import ShowSub from './components/admin-pages/Subscribers';

function App() {

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
          <Route index path={"/detail"} element={<BlogDetail />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path={"/membership"} element={<Membership />} />
              <Route path={"/blog"} element={<Blog />} />
              <Route path={"/gallery"} element={<Gallery />} />
              <Route path={"/contact"} element={<Contactus />} />
              <Route path={"/profile"} element={<Profile />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/forgot"} element={<ForgotPassword />} />
              <Route path={"/reset-password"} element={<ResetPassword />} />
              <Route path={"/admin"} element={<AdminPage />} >
                <Route index path={"/admin/blogs"} element={<AdminBlogs />} />
                <Route index path={"/admin/members"} element={<Members />} />
                <Route index path={"/admin/gallery"} element={<AdminGallery />} />
                <Route index path={"/admin/uploaded"} element={<UserUploaded />} />
                <Route index path={"/admin/admins"} element={<Admins />} />
                <Route index path={"/admin/show"} element={<ShowAdmin />} />
                <Route index path={"/admin/event"} element={<SubscribedEvent />} />
                <Route index path={"/admin/add-event"} element={<AddEvent />} />
                <Route index path={"/admin/admin-event"} element={<ShowEvent />} />
                <Route index path={"/admin/sub"} element={<ShowSub />} />
              </Route>
              <Route path={"*"} element={<h1>Not Found</h1>} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
