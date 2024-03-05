import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useMutation} from "react-query";
import {toast} from "react-toastify";
import Loader from "../commons/loader";

const loginRequest = async (data) => {
  try{
    const res = await fetch("https://backend.ploggingethiopia.org/members/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)});
    if (!res.ok) {
      throw new Error('Failed to login');
    }
    const resData = await res.json();
    return resData;
  } catch (e) {
    throw e
  }

}

const AdminLogin = ()=> {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const mutation = useMutation(loginRequest);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    if (formData.email === "" || formData.password === ""){
      toast.error("Please fill all the fields");
      return
    }

    try{
      await mutation.mutateAsync({email: formData.email, password: formData.password});
    } catch (e) {
      toast.error("An error occurred while logging in");
    }
    if (mutation.isSuccess){
      localStorage.setItem("admin", "true");
      toast.success("You are now logged in as admin");
      navigate("/admin/blogs");
    }
    if (mutation.isError){
      toast.error("An error occurred while logging in")
    }
  }

  return (
    <section className="grid place-items-center w-full h-screen">
      <form className="w-full max-w-[500px] shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md items-center">

        <div className="flex flex-col items-start w-full">
          <label>
            Admin email
          </label>
          <input name="email" value={formData.email} onChange={handleChange} type="email" className="p-2 rounded-md w-full border-input border-2" />
        </div>

        <div className="flex flex-col items-start w-full">
          <label>
            Password
          </label>
          <input name="password" value={formData.password} onChange={handleChange} type="password" className="p-2 rounded-md w-full border-input border-2" />
        </div>

        <button
          onClick={handleLogin}
          className="bg-green-500 w-fit hover:bg-green-700 text-white font-bold py-2 px-6 rounded">
          {
            mutation.isLoading &&
            <Loader />
          }
          Login
        </button>
      </form>
    </section>
  )
}

export default AdminLogin;