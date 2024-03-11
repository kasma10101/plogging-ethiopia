import {useMutation, useQuery} from "react-query";
import Loader from "../commons/loader";
import {useState} from "react";
import {toast} from "react-toastify";

const fetchGallery = async () => {
  try{
    const res = await fetch("http://localhost:4532/galleries");
    const data = await res.json();
    return data;
  } catch (e){
    return
  }

}

const deleteGallery = async (id) => {
  try{
    const res = await fetch(`http://localhost:4532/galleries/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();
    return data;
  } catch (e){
    return
  }
}

const addGallery = async (gallery) => {

  try{
    const res = await fetch(`http://localhost:4532/galleries`, {
      method: "POST",
      body: gallery
    });

    if (!res.ok){
      throw new Error("An error occurred while adding gallery")
    }

    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e)
  }

}


const AdminGallery = () => {

  const [formData, setFormData] = useState({
    name: '',
    email:'',
    password:'',
    role:"",
  });
  const [formAppear, setFormAppear] = useState(false);

  const { data: gallery, isLoading, error } = useQuery("gallery", fetchGallery);

  const deleteMutation = useMutation(deleteGallery);
  const addMutation = useMutation(addGallery);
  const handleDelete = async (id) => {
    try{
      await deleteMutation.mutateAsync(id);
      toast.success("Admin deleted successfully")
    }catch (e) {
      toast.error("An error occurred while deleting Admin")
    }
  }

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    // Update the form data based on the input type
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async () => {

    if (formData.name === "" || formData.email === ''|| formData.password === ''){
      toast.error("Please provide the required information")
      return
    }

    const newFormData = new FormData()

    newFormData.append("name", formData.name);
    newFormData.append("email", formData.email);
    newFormData.append("password", formData.password);

    try{
      await addMutation.mutateAsync(newFormData)
      toast.success("Gallery added successfully");
      setFormAppear(false);
    } catch (e){
      toast.error("An error occurred while adding gallery")
    }
  }

  return (
    <section className="w-full grid place-items-center gap-5">

      {/* <h1 className="text-5xl pb-4 border-b-2 w-fit">
        Admins
      </h1> */}
      <button
        onClick={()=>{setFormAppear(true)}}
        className="w-fit bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
      >
        Add Admins
      </button>

      <div
        style={{
          display: formAppear ? "grid" : "none"
        }}
        className="absolute top-0 h-screen bg-black/20 w-screen grid place-items-center">
        <form className="w-full max-w-[400px] bg-white shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md">
          <div className="flex flex-col items-start w-full">
            <label>
               Name
             </label>
            <input
              value={formData.name}
              onChange={handleChange}
              name="description" rows={5} className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>
              Email
            </label>
            <input
             value={formData.password}
              onChange={handleChange}
              name="email"
              type="email"
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
              type="text"
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

export default AdminGallery;