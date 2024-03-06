import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FAQ from "../commons/FAQ";
import {useState} from "react";
import {useMutation, useQuery} from "react-query";
import {toast} from "react-toastify";
import Loader from "../commons/loader";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 760 },
    items: 3
  },
  largeMobile: {
    breakpoint: { max: 760, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const sendFile = async (formData)=>{
  try{
    const res = await fetch(
      "https://backend.ploggingethiopia.org/galleries/userUploadedFiles",
      {
        method: "POST",
        body: formData
      }
    )

    if(!res.ok){
      throw new Error("file couldn't be sent")
    }

    const data = res.json();
    return data
  } catch (e) {
    throw new Error("Error while connecting")
  }

}

const fetchGalleries = async () => {
  try{
    const response = await fetch('https://backend.ploggingethiopia.org/galleries', {
    });

    const data = await response.json();
    return data;
  } catch (e){
    throw e
  }

}


const Gallery = ()=>{

  const [file, setFile] = useState(null);
  const [textData, setTextData] = useState('');
  const {data: gallery, isLoading, error} = useQuery("userGallery", fetchGalleries)
  const mutation = useMutation(sendFile)
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setTextData(event.target.value);
  };

  const handleSubmit = async () => {

    if (file === null || textData === ''){
      toast.error("Please provide the required data");
      return
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', textData);
    try{
      await mutation.mutateAsync(formData);
      toast.success("We have recieved your file. Thank you!")

    } catch (e) {
      toast.error("Your file couldn't be sent. please try again!")
    }

  }



  return(
    <section className="flex flex-col items-center gap-20 w-[90%]">

      <div className="w-full flex flex-col justify-around items-center gap-2">
        <h1 className="text-5xl pb-4 border-b-2">
          Gallery
        </h1>

        <p className="text-xl">
          Visual journey capturing the spirit and impact of our plogging activities
        </p>
      </div>

      <div className="w-full flex items-center justify-around">
        <button className="bg-green-500 hover:bg-green-700 text-white h-fit font-light py-2 px-8 rounded-xl">
          Entoto
        </button>
      </div>

      <div className="flex justify-around w-full">
        {
          isLoading &&
          <h1 className="text-2xl">
            Loading...
          </h1>
        }
      </div>

      <div className="flex justify-around w-full">
        {
          error != null &&
          <h1 className="text-2xl">
            Error while loading gallery!
          </h1>
        }
      </div>

      <div className="w-full -mt-32">
        <Carousel containerClass="flex items-center" itemClass="mx-4" responsive={responsive}>
          {
            !isLoading && error === null && gallery != null &&
            gallery.gallery.map((image, index)=> {
              return <img className="w-full object-cover h-full" key={index} src={`https://backend.ploggingethiopia.org/${image.imageUrl}`} alt="garbage" />
            })
          }
        </Carousel>
      </div>

      <div className="flex flex-col w-full items-start gap-10">

        <h1 className="text-5xl font-semibold text-center">
          Feel Inspired?
        </h1>
        <p>
          Share your favorite images on social media to spread the word about Plogging-Ethiopia
        </p>

        <form className="w-full max-w-[500px] flex flex-col items-end gap-5">

          <div className="w-full flex flex-col gap-2">
            <label>
              Description
            </label>
            <textarea rows={5} onChange={handleTextChange} className="p-2 rounded-md w-full border-input border-2 bg-green-50"/>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label>
              image
            </label>
            <input onChange={handleFileChange} type="file" className="p-2 rounded-md w-full border-input border-2 bg-green-50" />
          </div>

          <button
            onClick={(e)=>{
              e.preventDefault()
              handleSubmit()
            }}
            className="bg-green-500 hover:bg-green-700 text-white h-fit font-light py-2 px-10 rounded">
            {
              mutation.isLoading &&
              <Loader />
            }
            Send
          </button>
        </form>
      </div>
      <section className="w-full flex flex-col items-center mb-10">
        <FAQ />
      </section>
    </section>
  )
}

export default Gallery;