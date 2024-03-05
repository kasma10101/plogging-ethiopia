import {useMutation, useQuery} from "react-query";
import Loader from "../commons/loader";
import {useState} from "react";
import {toast} from "react-toastify";

const fetchBlogs = async () => {
  try{
    const res = await fetch("https://backend.ploggingethiopia.org/blogs");
    if (!res.ok){
      throw new Error("An error occurred while fetching blogs")
    }
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e)
  }

}

const deleteBlog = async (id) => {
  try{
    const res = await fetch(`https://backend.ploggingethiopia.org/blogs/${id}`, {
      method: "DELETE"
    });

    if (!res.ok){
      throw new Error("An error occurred while deleting blog")
    }

    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }

}

const AddBlog = async (blog) => {

  try{
    const res = await fetch(`https://backend.ploggingethiopia.org/blogs`, {
      method: "POST",
      body: blog,
    });

    if (!res.ok){
      throw new Error("Error while adding blog")
    }
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e)
  }

}

const UpdateBlog = async (blog) => {

  try{
    const res = await fetch(`https://backend.ploggingethiopia.org/blogs/${blog._id}`, {
      method: "PUT",
      body: JSON.stringify(blog)
    });

    const data = await res.json();
    return data;
  } catch (e) {
    return
  }

}

const AdminBlogs = () => {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null, // Use null or an initial value based on your needs
  });
  const [formAppear, setFormAppear] = useState(false);

  const { data: blogs, isLoading, error } = useQuery("blogs", fetchBlogs);
  const mutation = useMutation(deleteBlog);
  const addMutation = useMutation(AddBlog);
  const updateMutation = useMutation(UpdateBlog);

  const handleDelete = async (id) => {
    try{
      await mutation.mutateAsync(id);
      toast.success("blog deleted successfully")
    } catch (e) {
      toast.error("error ocured while deleting blog")
    }
  }

  const handleUpdate = async (blog) => {
    await updateMutation.mutateAsync(blog)
  }

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    // Update the form data based on the input type
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formData.description === "" || formData.title === "" || formData.image === null){
      toast.error("Please provide the required information")
      return
    }
    const newFormData = new FormData()

    newFormData.append("description", formData.description);
    newFormData.append("image", formData.image);
    newFormData.append("title", formData.title);

    try{
      addMutation.mutateAsync(newFormData)
      toast.success("Blog added successfully");
      setFormAppear(false);
    } catch (e) {
      toast.error("An error occurred while adding blog");
    }
  }



  return (
    <section className="w-full flex flex-col items-center gap-10">

      <h1 className="text-5xl border-b-2 pb-4">
        Blogs
      </h1>

      <button
          onClick={()=>{setFormAppear(true)}}
          className="w-fit bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
      >
          Add Blog
      </button>

      <div
        style={{
          display: formAppear ? "grid" : "none"
        }}
        className="absolute h-screen top-0 bg-black/20 w-screen grid place-items-center">
        <form className="w-full max-w-[400px] bg-white shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md">

          <div className="flex flex-col items-start w-full">
            <label>
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 rounded-md w-full border-input border-2" />
          </div>

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
            onClick={handleSubmit}
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
        <div className="flex flex-col">
          <Loader />
          <h1 className="text-4xl">
            Loading...
          </h1>
        </div>

      }

      {
        error &&
        <h1 className="text-4xl">
          Error occurred while fetching data
        </h1>
      }

      {
        !isLoading && error === null && blogs != null && blogs.blogs.map((blog, index) => (
          <div
            key={index}
            className="grid grid-cols-2 w-full place-items-center"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 3fr"
            }}
          >
            <div className="flex flex-col gap-2">
              <img src={`https://backend.ploggingethiopia.org/${blog.imageUrl}`} alt={"blog"} />
              <div className="flex justify-between">
                <button
                  onClick={()=>handleDelete(blog._id)}
                  className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-around h-full">
              <h1 className="text-3xl font-semibold">
                {blog.title}
              </h1>
              <p>
                {
                  blog.description
                }
              </p>
            </div>
          </div>
        ))
      }
    </section>
  )
}

export default AdminBlogs;