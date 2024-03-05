import FAQ from "../commons/FAQ";
import locationIcon from "../../assets/location-icon.svg";
import mailIcon from "../../assets/mail-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg";
import facebook from "../../assets/social-media/facebook.png";
import instagram from "../../assets/social-media/instagram.png";
import whatsup from "../../assets/social-media/whatsup.png";
import telegram from "../../assets/social-media/telegram.png";

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
    }
  ];

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
            <input type="text" className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>
              Email
            </label>
            <input type="text" className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <div className="flex flex-col items-start w-full">
            <label>
              Message
            </label>
            <textarea rows={5} className="p-2 rounded-md w-full border-input border-2" />
          </div>

          <button className="bg-green-500 w-fit hover:bg-green-700 text-white font-bold py-2 px-6 rounded">
            Send
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center gap-3 md:mt-0 mt-20">

        <h3 className="font-semibold">
          Join the Movement
        </h3>

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Being Member ->
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
                admin@ploggingethiopia.org
              </p>
            </div>
          </div>
        </div>

        <div className="flex place-self-center gap-10">

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