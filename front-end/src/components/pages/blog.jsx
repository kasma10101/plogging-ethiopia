import blogHeader from "../../assets/Blog-header.png"
import story1 from "../../assets/story-1.png"
import shareIcon from "../../assets/share-icon.svg"
import FAQ from "../commons/FAQ";
import {useQuery} from "react-query";
import {useState} from "react";
import ReactPaginate from "react-paginate";

const fetchBlogs = async () => {
  try{
    const response = await fetch("http://localhost:3001/blogs");
    if (!response.ok) {
      throw new Error('Failed to update task completion');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to update task completion');
  }
}


const Blog = ()=>{

  const {data: blogs, isLoading, error} = useQuery("blogsUser", fetchBlogs)

  return (
    <section className="flex flex-col items-center gap-20 w-[90%] pb-10">

      <div
        className="w-full relative flex md:justify-end md:flex-row flex-col"
      >
        <div className="flex flex-col gap-5 md:w-1/2 md:absolute left-0 md:top-1/3 md:-translate-y-1/2">
          <h1 className="text-5xl pb-4 border-b-2 md:self-end self-center w-fit">
            Blog
          </h1>
          <p className="text-xl">
            Welcome to the Plogging-Ethiopia Blog!
          </p>
          <p className="text-xl">
            Discover our thought-provoking and motivational posts about preserving the environment, embracing sustainable lifestyles, and the remarkableinfluence of plogging. Keep yourself informed about the most recentdevelopments, upcoming events, and inspiring achievements as westrive to build a greener and more pristine Ethiopia.
          </p>
        </div>

        <img src={blogHeader} alt={"blog header"} className="order-1" />
      </div>

      {
        isLoading &&

        <h1 className="text-2xl">

          Loading Blogs...
        </h1>
      }

      {
        error != null &&
        <h1 className="text-2xl">
          Error while fetching blogs
        </h1>
      }
      {
        !isLoading && error === null && blogs != null &&
        <>
          {
            blogs.blogs.map((blog, index)=>{
              return (
                <div
                  key={index}
                  className="grid grid-cols-2 w-full place-items-center"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 3fr"
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <img src={`http://localhost:3001/${blog.imageUrl}`} alt={"blog"} />
                    <div className="flex justify-between">
                      <p>
                        {
                          blog.createdAt
                        }
                      </p>
                      <span className="flex gap-2">
              <img src={shareIcon} alt={"share-icon"} />
              share
            </span>
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
              )
            })
          }
        </>
      }

      <section className="w-full flex flex-col items-center">
        <FAQ />
      </section>

    </section>
  )
}

export default Blog;