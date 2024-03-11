import story1 from "../../assets/story-1.png"
import FAQ from "../commons/FAQ";
import {useMutation} from "react-query";
import {toast} from "react-toastify";
import Loader from "../commons/loader";
import {useState} from "react";
import {Link} from "react-router-dom";

const createMember = async (member) => {
  try{
    // console.log(member)
    const res = await fetch("http://localhost:4532/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member)});

    if (!res.ok){
      throw new Error("An error occurred while creating member")
    }
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e)
  }
}

const Membership = ()=>{

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        agree: false,
        role: "user"
    });

  const mutation = useMutation(createMember);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password || !formData.agree){
      toast.error("Please fill all the fields")
      return
    }

    try{
      await mutation.mutateAsync(formData);
      toast.success("Member created successfully")
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        agree: false,
        role: "user"
      })
    } catch (e) {
      toast.error("An error occurred while creating member")
    }
  }

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        // Update the form data based on the input type
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? !prevFormData.agree : value,
        }));
    };

  return (
    <section id={"start"} className="flex flex-col items-center gap-20 w-[90%] pb-10" >

      <div className="w-full flex flex-col gap-5 items-center">
        <h1 className="text-5xl pb-4 border-b-2 w-fit">
          Membership
        </h1>
        <p className="text-xl">
          Join our community of passionate individuals dedicated to fostering ahealthier environment through plogging.
        </p>
      </div>

      <div
        className="grid md:grid-cols-2 grid-cols-1 w-full gap-10"
      >
        <img src={story1} className="w-full" alt={"member"} />

        <form className="w-full shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md">

          <div className="flex flex-col items-start w-full">
            <label>
              Full Name
            </label>
            <input
              value={formData.name}
                onChange={handleChange}
                name={"name"}
                type="text" className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>
              Email
            </label>
            <input
              value={formData.email}
                onChange={handleChange}
                name={"email"}
                type="email" className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>
              Phone Number
            </label>
            <input
              value={formData.phoneNumber}
                onChange={handleChange}
                name={"phoneNumber"}
                type="text" className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>
              Password
            </label>
            <input
              value={formData.password}
                onChange={handleChange}
                name={"password"}
                type="password" className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <button
            onClick={(e)=>{
              e.preventDefault()
              handleSubmit()
            }}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
            {
              mutation.isLoading &&
              <Loader />
            }
            Sign up
          </button>

          <div className="flex items-center gap-3">
            <input name="agree" checked={formData.agree} onChange={handleChange} type="checkbox" />
            <label>
              I agree to the terms and policy
            </label>
          </div>

          <p className="w-full flex justify-center gap-2">
            Already have an account?
            <Link to={"/login"}>
              <span className="text-green-500">
                Login
              </span>
            </Link>
          </p>

        </form>
      </div>

      <FAQ />

    </section>
  )
}

export default Membership;