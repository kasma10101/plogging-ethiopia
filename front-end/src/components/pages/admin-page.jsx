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
    <section className="w-full min-h-[70vh] flex flex-col items-center gap-16 px-10">

      <h1 className="text-5xl pb-4 border-b-2 w-fit">
        Admin Dashboard
      </h1>


      <nav className="w-2/3">
        <ul className="flex items-center gap-10 justify-center w-full">
          <li className="w-fit flex flex-col hover:text-green-500">
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
          <li  className="w-fit flex flex-col hover:text-green-500">
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
          <li className="w-fit flex flex-col hover:text-green-500">
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
          <li className="w-fit flex flex-col hover:text-green-500">
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
        </ul>
      </nav>

      <Outlet />

    </section>
  );
}