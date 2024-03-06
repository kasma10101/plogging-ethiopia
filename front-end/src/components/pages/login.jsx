import { useNavigate} from "react-router-dom";
import {useState} from "react";
import {useMutation} from "react-query";
import {toast} from "react-toastify";
import Loader from "../commons/loader";

const loginRequest = async (data) => {
  try{
    const res = await fetch("https://backend.ploggingethiopia.org/members/login", {
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

const Login = ()=> {

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
      if (mutation.isSuccess && mutation.data.role === "admin"){
        localStorage.setItem("admin", "true");
        toast.success("You are now logged in as admin");
        navigate("/admin/blogs");
      } else if (mutation.data && mutation.data.role === "user"){
        localStorage.setItem("user", "true");
        toast.success("You are now logged in as user");
        navigate(`/profile?id=${mutation.data._id}&name=${mutation.data.name}&email=${mutation.data.email}&phoneNumber=${mutation.data.phoneNumber}&password=${mutation.data.password}`);
      } else {
        toast.error("An error occurred while logging in")
      }
    } catch (e) {
      toast.error("An error occurred while logging in");
    }

  }

  return (
    <section className="grid place-items-center w-full h-screen">
      <form className="w-full max-w-[500px] shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md items-center">

        <h1 className="text-3xl pb-4 border-b-2">
          Login Page
        </h1>

        <div className="flex flex-col items-start w-full">
          <label>
            Email
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

export default Login;