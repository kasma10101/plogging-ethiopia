import blogHeader from "../../assets/Blog-header.png"
import shareIcon from "../../assets/share-icon.svg"
import FAQ from "../commons/FAQ";
import {useQuery} from "react-query";


const fetchBlogs = async () => {
  try{
    const response = await fetch("https://backend.ploggingethiopia.org/blogs");
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
        <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {
            blogs.blogs.map((blog, index)=>{
              return (
                <a href={blog.link ? blog.link : ""}>
                  <div
                    key={index}
                    className="felx flexcol w-full place-items-center cursor-pointer"
                  >
                    <div className="flex flex-col gap-2 w-full max-w-[340px]">
                      <img className="w-full" src={`https://backend.ploggingethiopia.org/${blog.imageUrl}`} alt={"blog"} />
                      <div className="flex justify-between w-full">
                        <p>
                          {
                            timeAgo(blog.createdAt)
                          }
                        </p>
                        <span className="flex gap-2">
                        <img src={shareIcon} alt={"share-icon"} />
                        share
                      </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-around h-fit py-4 gap-4">
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
                </a>
              )
            })
          }
        </div>
      }

      <section className="w-full flex flex-col items-center">
        <FAQ />
      </section>

    </section>
  )
}

function timeAgo(timestamp) {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);
  const timeDifference = currentDate - inputDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
}

export default Blog;