import {useMutation, useQuery} from "react-query";
import Loader from "../commons/loader";
import {useState} from "react";
import {toast} from "react-toastify";
import axios from 'axios'
import ShowEvent from "./showEvent";

const fetchAddEvent = async () => {
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

const deleteAddEvent = async (id) => {
  try{
    const res = await fetch(`http://localhost:4532/AddEvent/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();
    return data;
  } catch (e){
    return
  }
}

const AddAdminEvent = async (formData) => {
console.log(formData,'in AddEvent')
  try{
  
    const res = await axios.post("http://localhost:4532/members/event/admin",formData);
          console.log(res.status === 201,'eresere')
    if (!res.status === 201){
      throw new Error("An error occurred while adding AddEvent")
    }

    // const data = await res.json();
    return res.data;
  } catch (e) {
    throw new Error(e)
  }

}


const AddEvent= () => {

  const [formData, setFormData] = useState({
    name: '',
    description:'',
    date:'',
    place:"",
  });
  const [formAppear, setFormAppear] = useState(false);

  const { data: AddEvent, isLoading, error } = useQuery("AddEvent", fetchAddEvent);

  const deleteMutation = useMutation(deleteAddEvent);
  const addMutation = useMutation(AddAdminEvent);
  const handleDelete = async (id) => {
    try{
      await deleteMutation.mutateAsync(id);
      toast.success("AddEvent deleted successfully")
    }catch (e) {
      toast.error("An error occurred while deleting AddEvent")
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

    if (formData.name === '' || formData.description === ''|| formData.date === ''){
      toast.error("Please provide the required information")
      return
    }

    const newFormData = new FormData()

    newFormData.append("name", formData.name);
    newFormData.append("description", formData.description);
    newFormData.append("date", formData.date);
    newFormData.append("place", formData.place);

    try{
      console.log(formData,'new form data')

      await addMutation.mutateAsync(formData)
      toast.success("AddEvent added successfully");
      setFormAppear(false);
    } catch (e){
      toast.error("An error occurred while adding AddEvent")
    }
  }

  return (
    <section className="w-full -mt-14 grid place-items-center gap-5">

      {/* <h1 className="text-5xl pb-4 border-b-2 w-fit">
        AddEvents
      </h1> */}
      <button
        onClick={()=>{setFormAppear(true)}}
        className="w-fit bg-green-500 hover:bg-green-700 text-white font-bold -mt-10 py-2 px-4 rounded flex items-center justify-center"
      >
        Add Event
      </button>
        <ShowEvent/>
      <div
        style={{
          display: formAppear ? "grid" : "none"
        }}
        className="absolute top-0 h-screen bg-black/20 w-screen grid place-items-center">
  
        <form className="w-full max-w-[400px] bg-white shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md">
          <div className="flex flex-col items-start w-full">
            <label>
               Event Name
             </label>
            <input
              value={formData.name}
              onChange={handleChange}
              type="text"
              name="name"  className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>
              Description
            </label>
            <input
             value={formData.description}
              onChange={handleChange}
              name="description"
              type="text"
              className="p-2 rounded-md w-full border-input border-2" />
          </div>
          <div className="flex flex-col items-start w-full">
            <label>
              Place
            </label>
            <input
             value={formData.place}
              onChange={handleChange}
              name="place"
              type="text"
              className="p-2 rounded-md w-full border-input border-2" />
          </div>
          <div className="flex flex-col items-start w-full">
            <label>
              Date
            </label>
            <input
             value={formData.date}
              onChange={handleChange}
              name="date"
              type="text"
              className="p-2 rounded-md w-full border-input border-2" />
          </div>
          <div className="flex flex-col items-start w-full">
            <label>
              Image
            </label>
            <input
             value={formData.date}
              onChange={handleChange}
              name=""
              type="file"
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

export default AddEvent;