import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";


export default function AdminPage() {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      navigate("/admin-login");
    }
  }, []);

  return (
    <section className="w-full min-h-[70vh] flex flex-col items-center gap-32 px-14">

      <h1 className="text-5xl pb-4 border-b-2 w-fit text-nowrap">
        Admin Dashboard
      </h1>
      <nav className="w-2/3">
        <ul className="flex items-center gap-10 justify-center w-full">
          <li className="w-fit text-nowrap flex flex-col hover:text-green-500">
            <Link to={"/admin/blogs"}>
              Blogs
            </Link>
            {
              location.pathname === "/admin/blogs"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
          <li  className="w-fit text-nowrap flex flex-col hover:text-green-500">
            <Link to={"/admin/gallery"}>
              Gallery
            </Link>
            {
              location.pathname === "/admin/gallery"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
          <li className="w-fit text-nowrap flex flex-col hover:text-green-500">
            <Link to="/admin/members">
              Members
            </Link>
            {
              location.pathname === "/admin/members"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
          <li className="w-fit text-nowrap flex flex-col hover:text-green-500">
              <Link to="/admin/uploaded">
                  User Uploaded Files
              </Link>
              {
                  location.pathname === "/admin/uploaded"
                      ?
                      <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                      :
                      ""
              }
          </li>
          <li className="w-fit text-nowrap flex flex-col hover:text-green-500">
              <Link to="/admin/admins">
                  Admins
              </Link>
              {
                  location.pathname === "/admin/admins"
                      ?
                      <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                      :
                      ""
              }
          </li>
          <li className="w-fit text-nowrap flex flex-col hover:text-green-500">
              <Link to="/admin/add-event">
                  PE's Event 
              </Link>
              {
                  location.pathname === "/admin/admins"
                      ?
                      <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                      :
                      ""
              }
          </li>
          <li className="w-fit text-nowrap flex flex-col hover:text-green-500">
              <Link to="/admin/event">
                  Subscribed Event
              </Link>
              {
                  location.pathname === "/admin/event"
                      ?
                      <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                      :
                      ""
              }
          </li>
          <li className="w-fit text-nowrap flex flex-col hover:text-green-500">
              <Link to="/admin/sub">
                  Subscribers
              </Link>
              {
                  location.pathname === "/admin/sub"
                      ?
                      <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                      :
                      ""
              }
          </li>
        </ul>
      </nav>

      <Outlet />

    </section>
  );
}