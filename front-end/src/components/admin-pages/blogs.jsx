import { useMutation, useQuery } from "react-query";
import Loader from "../commons/loader";
import { useState } from "react";
import { toast } from "react-toastify";

const fetchBlogs = async () => {
  try {
    const res = await fetch("http://localhost:4532/blogs");
    if (!res.ok) {
      throw new Error("An error occurred while fetching blogs");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteBlog = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:4532/blogs/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("An error occurred while deleting blog");
    }

    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

const AddBlog = async (blog) => {
  try {
    const res = await fetch(`http://localhost:4532/blogs`, {
      method: "POST",
      body: blog,
    });

    if (!res.ok) {
      throw new Error("Error while adding blog");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
let updateId = ''
const UpdateBlog = async (blog) => {
  try {
    const res = await fetch(
      `http://localhost:4532/blogs/${updateId}}`,
      {
        method: "PUT",
        body: JSON.stringify(blog),
      }
    );

    const data = await res.json();
    return data;
  } catch (e) {
    return;
  }
};

const AdminBlogs = () => {
  const { data: blogs, isLoading, error } = useQuery("blogs", fetchBlogs);
  const mutation = useMutation(deleteBlog);
  const addMutation = useMutation(AddBlog);
  const updateMutation = useMutation(UpdateBlog);
  // console.log(blogs,' here is my blog')
  const [formData, setFormData] = useState({
    title: "",
    description:  "",
    image: null, // Assuming you handle images through a file input, so it's okay to initialize as null
    link:  "",
});
  const [formAppear, setFormAppear] = useState(false);
  const [update,setUpdate] = useState(false)



  const handleDelete = async (id) => {
    try {
      await mutation.mutateAsync(id);
      toast.success("blog deleted successfully");
    } catch (e) {
      toast.error("error ocured while deleting blog");
    }
  };

  const handleUpdate = async (blog) => {
    try {
      await updateMutation.mutateAsync(blog);
      toast.success("blog updated successfully!");
    } catch (error) {
      toast.error("error occurred while updating");
    }
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    // Update the form data based on the input type
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      formData.description === "" ||
      formData.title === "") {
      toast.error("Please provide the required information");
      return;
    }
    const newFormData = new FormData();

    newFormData.append("description", formData.description);
    newFormData.append("image", formData.image);
    newFormData.append("title", formData.title);
    newFormData.append("link", formData.link);
    console.log(formData,'new formdata')

    try {
      if(update){
        updateMutation.mutateAsync(newFormData);
        toast.success("Blog updated successfully");
        setFormAppear(false);
      }else{
        addMutation.mutateAsync(newFormData);
        toast.success("Blog added successfully");
        setFormAppear(false);
      }
     
    } catch (e) {
      if(update){
        toast.error("An error occurred while updating blog");
      }else{
        toast.error("An error occurred while adding blog");

      }
    }
  };

  return (
    <section className="w-full -mt-24 flex flex-col items-center gap-10">
      {/* <h1 className="text-5xl border-b-2 pb-4">Blogs</h1> */}

      <button
        onClick={() => {
          setFormAppear(true);
        }}
        className="w-fit bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
      >
        Add Blog
      </button>

      <div
        style={{
          display: formAppear ? "grid" : "none",
        }}
        className="absolute h-screen top-0 bg-black/20 w-screen grid place-items-center"
      >
        <form className="w-full max-w-[400px] bg-white shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md">
          <div className="flex flex-col items-start w-full">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 rounded-md w-full border-input border-2"
            />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>Link</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="p-2 rounded-md w-full border-input border-2"
            />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={handleChange}
              name="description"
              rows={5}
              className="p-2 rounded-md w-full border-input border-2"
            />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>image</label>
            <input
              onChange={handleChange}
              name="image"
              type="file"
              className="p-2 rounded-md w-full border-input border-2"
            />
          </div>

          <button
            
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            {addMutation.isLoading && <Loader />}
            Submit
          </button>
          <button
            onClick={() => {
              setFormAppear(false);
            }}
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            Close Form
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="flex flex-col">
          <Loader />
          <h1 className="text-4xl">Loading...</h1>
        </div>
      )}

      {error && (
        <h1 className="text-4xl">Error occurred while fetching data</h1>
      )}

         <div  className="relative  overflow-x-auto w-full h-full">
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Link
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && error === null && blogs?.blogs?.map((blog, index) => (
              <tr key={index} className="bg-white  dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {blog.title}
                </td>
                <td className="px-6 py-4">
                  {blog.description}
                </td>
                <td className="px-6 py-4">
                  {blog.link}
                </td>
                <td className="px-6 py-4">
                <img className='max-h-20 min-h-20 '
                src={`http://localhost:4532/${blog.imageUrl}`}
                alt={"member"}
              />                    </td>
                <td>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="w-1/3 mr-2  bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Del
                </button>
                <button
                  onClick={() => {
                    updateId = blog._id
                    setFormData({
                      title: blog.title || "",
                      description: blog.description || "",
                      image: null, // Assuming you handle images through a file input, so it's okay to initialize as null
                      link: blog.link || "",
                    })
                    setFormAppear(true);
                    setUpdate(true)
                    console.log(blog._id,'from update button')

                  }}
                  className="w-1/3 pr-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                </td>
                <td>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminBlogs;
