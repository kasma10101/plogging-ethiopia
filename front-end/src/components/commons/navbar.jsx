import logo from "../../assets/plogging-logo.png";
import {Link, useLocation} from "react-router-dom";
import {useState} from "react";

const Navbar = ()=>{

  const [show, setShow] = useState(false);
  const location = useLocation();
  console.log(location.pathname)

  return (
    <section
      className="flex justify-between w-full items-center md:px-10 px-5 py-4"
    >
      <img className="w-[100px] h-[100px] rounded-full" src={logo} alt={"plogging ethiopia logo"} />

      <nav className="md:grid hidden w-2/3">
        <ul className="flex gap-10 justify-center w-full">
          <li className="w-fit flex flex-col hover:text-green-500">
            <Link to={"/"}>
              Home
            </Link>
            {
              location.pathname === "/"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
          <li  className="w-fit flex flex-col hover:text-green-500">
            <a href={"/#aboutus"}>
              About us
            </a>
            {
              location.pathname === "/about"
              ?
              <span className="w-full rounded-full h-[5px] bg-green-500"></span>
              :
              ""
            }
          </li>
          <li className="w-fit flex flex-col hover:text-green-500">
            <Link to="/membership">
              Membership
            </Link>
            {
              location.pathname === "/membership"
              ?
              <span className="w-full rounded-full h-[5px] bg-green-500"></span>
              :
              ""
            }
          </li>
          <li className="w-fit flex flex-col hover:text-green-500">
            <Link to={"/gallery"}>
              Gallery
            </Link>
            {
              location.pathname === "/gallery"
              ?
              <span className="w-full rounded-full h-[5px] bg-green-500"></span>
              :
              ""
            }
          </li>
          <li  className="w-fit flex flex-col hover:text-green-500">
            <Link to={"/blog"}>
              Blog
            </Link>
            {
              location.pathname === "/blog"
              ?
              <span className="w-full rounded-full h-[5px] bg-green-500"></span>
              :
              ""
            }
          </li>
          <li  className="w-fit flex flex-col hover:text-green-500">
            <Link to={"/contact"}>
              Contact
            </Link>
              {
                location.pathname === "/contact"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
              }
          </li>
          <li  className="w-fit flex flex-col hover:text-green-500">
            <Link to={"/login"}>
              Login
            </Link>
              {
                location.pathname === "/login"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
              }
          </li>
        </ul>
      </nav>



      <nav
        style={{
          display: show ? "grid" : "none"
        }}
        className="md:hidden w-full absolute z-20 h-screen bg-white top-0 left-0 grid place-items-center">
        <ul className="flex md:flex-row flex-col items-center gap-10 justify-center w-full">
          <li className="w-fit flex flex-col hover:text-green-500">
            <Link
              to={"/"}
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
            >
              Home
            </Link>
            {
              location.pathname === "/"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
          <li  className="w-fit flex flex-col hover:text-green-500">
            <a
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
              href={"/#aboutus"}>
              About us
            </a>
            {
              location.pathname === "/about"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
          <li className="w-fit flex flex-col hover:text-green-500">
            <Link
              to="/membership"
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
            >
              Membership
            </Link>
            {
              location.pathname === "/membership"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
          <li className="w-fit flex flex-col hover:text-green-500">
            <Link
              to={"/gallery"}
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
            >
              Gallery
            </Link>
            {
              location.pathname === "/gallery"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
          <li  className="w-fit flex flex-col hover:text-green-500">
            <Link
              to={"/blog"}
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
            >
              Blog
            </Link>
            {
              location.pathname === "/blog"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
          <li  className="w-fit flex flex-col hover:text-green-500">
            <Link
              to={"/contact"}
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
            >
              Contacts
            </Link>
            {
              location.pathname === "/contact"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
          <li  className="w-fit flex flex-col hover:text-green-500">
            <Link
              to={"/login"}
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
            >
              Login
            </Link>
            {
              location.pathname === "/login"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
        </ul>
      </nav>

      <button
        onClick={
          ()=>{
            setShow(!show)
          }
        }
        className="flex flex-col gap-1 z-20 md:hidden">
        <span className="w-[40px] h-[8px] bg-green-500 rounded-full"></span>
        <span className="w-[40px] h-[8px] bg-green-500 rounded-full"></span>
        <span className="w-[40px] h-[8px] bg-green-500 rounded-full"></span>
      </button>

    </section>
  )
}

export default Navbar;