import Hero from "../landing/hero";
import FAQ from "../commons/FAQ";
import story1 from "../../assets/story-1.png";
import story2 from "../../assets/story-2.png";
import story3 from "../../assets/story-3.png";
import story4 from "../../assets/story-4.png";
import story5 from "../../assets/about-5.png"
import story6 from "../../assets/about-6.png"
import founder from "../../assets/founder-photo.png"
import Footer from "../commons/footer";
import Navbar from "../commons/navbar";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import shareIcon from "../../assets/share-icon.svg";
import { useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import Event from "./Event";
import { useEffect } from "react";
import Aos from 'aos'

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


const Landing = () => {
  const {data: blogs, isLoading, error} = useQuery("blogsUser", fetchBlogs)
  const [data,setData] = useState([{
    name:'',
    agreement:false,
    email:'',
    who:'',
    date:''

  }])
    
  useEffect(() => {
    Aos.init({
      duration: 2000, // Global duration of animations in milliseconds
      once: false, // Whether animation should happen only once - while scrolling down
    });
    Aos.refresh();

  }, []);
  
  const handleChange = (event) => {
    const { name, value} = event.target;

    // Update the form data based on the input onChange={handleChange} type
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) =>{
          e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4532/members/event',data);
      if(response.status === 201){
        toast.success("Successfully sent")
        setData({
          name:"",
          date:'',
          who:"",
          email:'',
          agreement:false
        })
      }else{
        toast.error("error occured")
      }
      // setData(response.data);
    } catch (error) {
      toast.error("error occured")
      console.error("Error fetching admins:", error);
    }
  }
  return (
    <main className="w-full flex flex-col items-center gap-20 pb-20">
      <Hero />

      <section className="flex flex-col justify-between w-[90%] text-left gap-10">
        <div className="flex md:flex-row flex-col justify-between items-center w-full">

          <div className="flex flex-col items-center gap-10 md:w-[60%] w-full md:order-1 order-2">
            <h1 className="text-5xl font-bold text-center">
              Our Story
            </h1>
            <p className="">
              Plogging-Ethiopia traces its origins back to a family excursion that spanned more than five years before officially launching in January 2021 at Entoto Park, Addis Ababa. The individuals behind this initiative are Firew Kefyalew, a father, and his three sons – Yeab, Lihiq, and Amnen. Plogging-Ethiopia goes beyond simply collecting trash; it represents a dynamic movement that combines physical fitness, community involvement, and environmental responsibility. The concept,originating from Sweden, quickly gained momentum as Firew and a growing community of volunteers realized its potential to make a meaningful impact in Ethiopia. Our dedicated volunteers, comprising students and professionals alike, unite under a shared objective:fostering a healthier Ethiopia by tackling plastic pollution and advocating for an active way of life.
            </p>
          </div>

          <img
            className="order-1 md:order-2"
            alt="Plogging Ethiopia"
            src={story1}
          />
        </div>
        <div className="flex md:flex-row flex-col justify-between items-center w-full">
          <img
            className=""
            alt="Plogging Ethiopia"
            src={story2}
          />

          <div className="flex flex-col items-center md:w-[50%] w-[90%] gap-10">
            <h1 className="text-5xl font-bold text-center">
              What is Plogging?
            </h1>
            <p className="">
              Plogging is more than an exercise routine; it's a revolutionary approach to environmental stewardship. Participants jog or walk, intermittently stopping to pick up litter along their route. This simple act not only beautifies our surroundings but also raises awareness about the impact of plastic pollution on our communities and ecosystems.
            </p>
          </div>

        </div>
        <div className="flex justify-between items-center w-full md:flex-row flex-col">
          <div className="flex flex-col items-start md:w-[50%] w-[90%] gap-10 md:order-1 order-2">
            <h1 className="text-5xl font-bold text-center">
              Mission
            </h1>
            <p className="">
              At the core of Plogging-Ethiopia is a mission to create a cleaner, greenerEthiopia through community-led action. We believe that collectiveefforts, no matter how small, can pave the way for substantialchange. By encouraging plogging, we aim to inspire people to takeresponsibility for their environment while promoting an active andhealthy lifestyle.
            </p>
          </div>

          <img
            className="rounded-full order-1 md:order-2"
            alt="Plogging Ethiopia"
            src={story3}
          />
        </div>
        <div className="flex justify-between items-center w-full md:flex-row flex-col">
          <img
            className="rounded-full"
            alt="Plogging Ethiopia"
            src={story4}
          />

          <div className="flex flex-col items-start md:w-[50%] w-[90%] gap-10">
            <h1 className="text-5xl font-bold text-center">
              Our Impact
            </h1>
            <p className="">
              Plogging-Ethiopia'sremarkable achievements have gained both national and internationalacclaim, being highlighted in more than 30 media outlets andcommended by Ethiopia's Prime Minister for their exceptionalcommunity service. Despite starting from humble beginnings without anofficial office, staff, or budget, we have successfully showcased thetransformative power of collective action and the positive energythat drives social change. Our movement has become a symbol ofgrassroots environmentalism, demonstrating the profound impact thatcollective positive energy can have.
            </p>
          </div>
        </div>
      </section>

      <section id="aboutus" className="relative grid md:grid-cols-2  w-[90%] md:h-[85vh]">
        <img src={story5} alt={"story"} />

        <div className="flex flex-col h-full">
          <h1 className="text-xl font-bold text-center">
            About us
          </h1>
          <h1 className="text-5xl text-left font-semibold">
            Welcome to Plogging-Ethiopia:
          </h1>
        </div>

        <div className="md:absolute right-0 top-1/3 md:w-4/5 w-full flex flex-col md:flex-row justify-around gap-5">
          <img src={story6} className="" alt={"story"} />

          <div className="flex flex-col items-end md:w-3/4 w-[90%] gap-10 text-left">
            <p>
              Embark on ajourney of impact and sustainability with Plogging-Ethiopia! Astrailblazers in the movement for a greener Ethiopia, we are more thana voluntary initiative — we are a community dedicated totransforming lives and our environment, one stride at a time.
            </p>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              <Link to={"/membership"} >
                Read More +
              </Link>
            </button>
          </div>
        </div>
      </section>

      <section
        className="w-full grid place-items-center mt-20 landing-form"
      >

        <div className="flex flex-col justify-between items-center w-[90%]">
          <h1 className="text-2xl">
            Get Involved
          </h1>

          <p>
            Ready to make a difference? Explore ways to engage, support, or collaborate with Plogging-Ethiopia.
          </p>

          <form onSubmit={handleSubmit} className="md:w-[80%] w-full shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md">

            <div className="flex flex-col items-start w-full">
              <label id='name'>
                Full Name
              </label>
              <input onChange={handleChange}  value={data.name} type="text" name="name" className="p-2 rounded-md w-full border-input onChange={handleChange} border-2" />
            </div>

            <div className="flex flex-col items-start w-full">
              <label id="email">
                Email
              </label>
              <input onChange={handleChange}  value={data.email} type="text" name="email" className="p-2 rounded-md w-full border-input onChange={handleChange} border-2" />
            </div>

            <div className="flex flex-col items-start w-full">
              <label id="who">
                Who held the event
              </label>
              <input onChange={handleChange}  value={data.who} type="text" name="who" className="p-2 rounded-md w-full border-input onChange={handleChange} border-2" />
            </div>

            <div className="flex flex-col items-start w-full">
              <label>
                Date of Event
              </label>
              <input onChange={handleChange}  value={data.date} type="text" name="date" className="p-2 rounded-md w-full border-input onChange={handleChange} border-2" />
            </div>

            <div className="flex items-center gap-3">
              <input onChange={handleChange} name="agreement"  checked={data.agreement} type="checkbox" />
              <label>
                I agree to the terms and policy
              </label>
            </div>

            <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center gap-3">

          <h3>
            Join the Movement
          </h3>

          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <Link to={"/membership"} >
              Being Member ->
            </Link>
          </button>
        </div>
      </section>

      <section
        className="founder-message place-items-center w-[90%] gap-3"
      >
        <div className="flex flex-col text-left gap-10">
          <h1 className="text-2xl font-semibold">
            Message From Founder of Plogging Ethiopia
          </h1>
          <p>
            Welcome, Esteemed Visitors!
          </p>
          <p>
            Step into the world of Plogging-Ethiopia's website, where passion and purpose unite to create a cleaner and healthier Ethiopia. As the founder, I am absolutely thrilled to have you explore our website and witness the incredible efforts of individuals who are dedicated to the well-being of our environment through plogging.
          </p>
          <p>
            We are a young and vibrant organization, constantly striving to inspire change one eco-friendly stride at a time. By harnessing the power of positive energy expressed through volunteerism, we aim to bring about organic social change driven by individuals like yourself. Take a deep dive into our pages to discover our initiatives, join our events, and find valuable resources to embrace sustainable living. Together, we can make a lasting impact on our environment.
          </p>
          <p>
            Thank you for embarking on this journey with us towards a more vibrant and greener Ethiopia. Your support is truly invaluable.
          </p>
          <p>
            With warm regards,
          </p>
          <p>
            Firew Kefyalew
          </p>
          <p>
            Founder, Plogging-Ethiopia.
          </p>
        </div>

        <img src={founder} className="w-full h-full object-cover" alt={"Mr. Firew kefyalew"} />
      </section>
       <Event />
      <section className="w-[90%] my-10 flex flex-col gap-10">

        <h1 className="text-3xl">
          Featured Blogs
        </h1>

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
                          <span className="flex items-center hover:text-green-600 text-green-400">
                            Read More ->
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

      </section>

      <section className="w-full flex flex-col items-center">
        <FAQ />
      </section>
    </main>
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

export default Landing;