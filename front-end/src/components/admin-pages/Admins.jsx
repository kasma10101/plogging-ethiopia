import {useMutation, useQuery} from "react-query";
import Loader from "../commons/loader";
import {useState} from "react";
import {toast} from "react-toastify";
import axios from 'axios'
import ShowAdmin from "./ShowAdmin";

const fetchadmins = async () => {
  try{
    const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  };
    const res = await axios.get("http://localhost:4532/members/admin",config);
    const data = await res.json();
    return data;
  } catch (e){
    return
  }

}

const deleteadmins = async (id) => {
  try{
    const res = await fetch(`http://localhost:4532/admins/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();
    return data;
  } catch (e){
    return
  }
}

const addAdmins = async (formData) => {
console.log(formData,'in admins')
  try{
  
    const res = await axios.post("http://localhost:4532/members/admin/create",formData);
          console.log(res.status === 201,'eresere')
    if (!res.status === 201){
      throw new Error("An error occurred while adding admins")
    }

    // const data = await res.json();
    return res.data;
  } catch (e) {
    throw new Error(e)
  }

}


const Admins= () => {

  const [formData, setFormData] = useState({
    name: '',
    email:'',
    password:'',
    role:"",
  });
  const [formAppear, setFormAppear] = useState(false);

  const { data: admins, isLoading, error } = useQuery("admins", fetchadmins);

  const deleteMutation = useMutation(deleteadmins);
  const addMutation = useMutation(addAdmins);
  const handleDelete = async (id) => {
    try{
      await deleteMutation.mutateAsync(id);
      toast.success("Admins deleted successfully")
    }catch (e) {
      toast.error("An error occurred while deleting Admins")
    }
  }

  const handleChange = (event) => {
    const { name, value} = event.target;

    // Update the form data based on the input type
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {

    if (formData.name === '' || formData.email === ''|| formData.password === ''){
      toast.error("Please provide the required information")
      return
    }

    const newFormData = new FormData()

    newFormData.append("name", formData.name);
    newFormData.append("email", formData.email);
    newFormData.append("password", formData.password);
    newFormData.append("role", formData.role);

    try{
      console.log(formData,'new form data')

      await addMutation.mutateAsync(formData)
      toast.success("admins added successfully");
      setFormAppear(false);
    } catch (e){
      toast.error("An error occurred while adding admins")
    }
  }

  return (
    <section className="w-full grid place-items-center gap-5">

      {/* <h1 className="text-5xl pb-4 border-b-2 w-fit">
        Adminss
      </h1> */}
      <button
        onClick={()=>{setFormAppear(true)}}
        className="w-fit bg-green-500 hover:bg-green-700 text-white font-bold -mt-10 py-2 px-4 rounded flex items-center justify-center"
      >
        Add Admin
      </button>
        <ShowAdmin />
      <div
        style={{
          display: formAppear ? "grid" : "none"
        }}
        className="absolute top-0 h-screen bg-black/20 w-screen grid place-items-center">
                <div className="relative overflow-x-auto w-full h-full">
        <table className="w-full - text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && error === null && admins?.admins?.map((admin, index) => (
              <tr key={index} className="bg-white  dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {admin.name}
                </td>
                <td className="px-6 py-4">
                  {admin.email}
                </td>
                <td className="px-6 py-4">
                  {admin.phoneNumber}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(admin._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        <form className="w-full max-w-[400px] bg-white shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md">
          <div className="flex flex-col items-start w-full">
            <label>
               Name
             </label>
            <input
              value={formData.name}
              onChange={handleChange}
              type="text"
              name="name"  className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>
              Email
            </label>
            <input
             value={formData.email}
              onChange={handleChange}
              name="email"
              type="email"
              className="p-2 rounded-md w-full border-input border-2" />
          </div>
          <div className="flex flex-col items-start w-full">
            <label>
              Role
            </label>
            <input
             value={formData.role}
              onChange={handleChange}
              name="role"
              type="text"
              className="p-2 rounded-md w-full border-input border-2" />
          </div>
          <div className="flex flex-col items-start w-full">
            <label>
              Password
            </label>
            <input
             value={formData.password}
              onChange={handleChange}
              name="password"
              type="password"
              className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <button
            onClick={(e)=>{
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
            {
              addMutation.isLoading &&
              <Loader />
            }
            Submit
          </button>
          <button
            onClick={()=>{setFormAppear(false)}}
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
              Close Form
          </button>
        </form>
      </div>
    </section>
  )
}

export default Admins;