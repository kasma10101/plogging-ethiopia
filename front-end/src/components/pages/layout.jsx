import Navbar from "../commons/navbar";
import { Outlet, useLocation} from "react-router-dom";
import Footer from "../commons/footer";

const Layout = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  return (
    <div id="app" className="relative font-Poppins flex flex-col items-center">
      {!isAdminRoute && <Navbar />
}
      <Outlet />
      <Footer />
    </div>

  )
}

export default Layout;