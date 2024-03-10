import FAQ from "../commons/FAQ";
import locationIcon from "../../assets/location-icon.svg";
import mailIcon from "../../assets/mail-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg";
import facebook from "../../assets/social-media/facebook.png";
import instagram from "../../assets/social-media/instagram.png";
import whatsup from "../../assets/social-media/whatsup.png";
import telegram from "../../assets/social-media/telegram.png";
import youtube from "../../assets/social-media/youtube.png";
import {useState} from "react";
import {useMutation} from "react-query";
import {toast} from "react-toastify";
import Loader from "../commons/loader";
import {Link} from "react-router-dom";

const createMember = async (form) => {
  try{
    const res = await fetch("https://backend.ploggingethiopia.org/members/contactus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)});

    if (!res.ok){
      throw new Error("An error while sending message")
    }
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e)
  }
}


const Contactus = ()=>{

  const socialMediaIcons = [
    {
      icon: facebook,
      link: "https://www.facebook.com/profile.php?id=100078976189435&mibextid=ZbWKwL"
    },
    {
      icon: instagram,
      link: "https://www.instagram.com/ploggingethiopia?igsh=MXRua2kzcXdsZnZraA==",
    },
    {
      icon: whatsup,
      link: "+251911647424"
    },
    {
      icon: telegram,
      link: "https://t.me/ploggingethiopia"
    },
    {
      icon: youtube,
      link: "https://www.youtube.com/@plogging-ethiopia6643"
    }
  ];


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const mutation = useMutation(createMember);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message){
      toast.error("Please fill all the fields")
      return
    }

    try{
      await mutation.mutateAsync(formData);
      toast.success("Message Delivered successfully")
      setFormData({
        name: '',
        email: '',
        message: ''
      })
    } catch (e) {
      toast.error("An error occurred while delivering message")
    }
  }

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    // Update the form data based on the input type
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:  value,
    }));
  };

  return (
    <section className="flex flex-col items-center gap-20 w-[90%] pb-10" >
      <h1 className="text-5xl pb-4 border-b-2 w-fit">
        Contact
      </h1>
      <section className="grid md:grid-cols-2 place-items-center w-full">
        <div className="flex flex-col justify-between items-center w-full">
        <h1 className="text-3xl">
          Get In Touch
        </h1>

        <form className="w-full shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md items-center">

          <div className="flex flex-col items-start w-full">
            <label>
              Full Name
            </label>
            <input name="name" value={formData.name} onChange={handleChange} type="text" className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>
              Email
            </label>
            <input name={"email"} value={formData.email} onChange={handleChange} type="text" className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>
              Message
            </label>
            <textarea name={'message'} value={formData.message} onChange={handleChange} rows={5} className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <button onClick={(e)=>{
            e.preventDefault()
            handleSubmit()
          }} className="bg-green-500 w-fit hover:bg-green-700 text-white font-bold py-2 px-6 rounded">
            {
              mutation.isLoading &&
              <Loader />
            }
            Send
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center gap-3 md:mt-0 mt-20">

        <h3 className="font-semibold">
          Join the Movement
        </h3>

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          <Link to={"/membership"}>
            Being Member ->
          </Link>
        </button>
      </div>
      </section>

      <section className="grid md:grid-cols-2 w-full">
        <div className="flex flex-col gap-10">

          <div className="flex gap-10">
            <img src={locationIcon} alt={"location"} />

            <div className="flex flex-col">
              <p>
                Location
              </p>
              <p>
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>

          <div className="flex gap-10">
            <img src={phoneIcon} alt={"phone"} />

            <div className="flex flex-col">
              <p>
                +251911647424
              </p>

            </div>
          </div>

          <div className="flex gap-10">
            <img src={mailIcon} alt={"mail"} />

            <div className="flex flex-col">
              <p>
                info@ploggingethiopia.org
              </p>
            </div>
          </div>
        </div>

        <div className="flex place-self-center items-center gap-10">

          <p>
            Social Media
          </p>
          {
            socialMediaIcons.map((icon, index)=>(
              <a key={index} href={icon.link}>
                <img  src={icon.icon} alt={"icon"}/>
              </a>
            ))
          }

        </div>
      </section>

      <FAQ />
    </section>
  )
}

export default Contactus;