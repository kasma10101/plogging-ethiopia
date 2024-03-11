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
    description: '',
    image: null, // Use null or an initial value based on your needs
  });
  const [formAppear, setFormAppear] = useState(false);

  const { data: gallery, isLoading, error } = useQuery("gallery", fetchGallery);

  const deleteMutation = useMutation(deleteGallery);
  const addMutation = useMutation(addGallery);
  const handleDelete = async (id) => {
    try{
      await deleteMutation.mutateAsync(id);
      toast.success("Gallery deleted successfully")
    }catch (e) {
      toast.error("An error occurred while deleting gallery")
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

    if (formData.description === "" || formData.image === null){
      toast.error("Please provide the required information")
      return
    }

    const newFormData = new FormData()

    newFormData.append("description", formData.description);
    newFormData.append("image", formData.image);

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

      <h1 className="text-5xl pb-4 border-b-2 w-fit">
        Gallery
      </h1>
      <button
        onClick={()=>{setFormAppear(true)}}
        className="w-fit bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
      >
        Add Gallery
      </button>

      <div
        style={{
          display: formAppear ? "grid" : "none"
        }}
        className="absolute top-0 h-screen bg-black/20 w-screen grid place-items-center">
        <form className="w-full max-w-[400px] bg-white shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md">
          <div className="flex flex-col items-start w-full">
            <label>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={handleChange}
              name="description" rows={5} className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>
              image
            </label>
            <input
              onChange={handleChange}
              name="image"
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

      {
        isLoading &&

        <div className={"w-fit"}>
          <h1 className="text-2xl">
            Loading...
          </h1>
        </div>
      }

      {
        error != null &&

        <div className={"w-fit"}>
          <h1 className="text-xl">
            Currently there are no images
          </h1>
        </div>
      }

      {
        !isLoading && error === null && gallery != null &&
        gallery.gallery.map((image, index)=> {
          return (
            <div className="grid grid-cols-2 place-items-center">
              <img className="w-[150px]" key={index} src={`http://localhost:4532/${image.imageUrl}`} alt="garbage" />
              <button
                onClick={() => handleDelete(image._id)}
                className=" h-fit w-fit bg-red-500 w-fit hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          )
        })
      }
    </section>
  )
}

export default AdminGallery;