import landingHero from "../../assets/header-bg.png";
import ploggingLogo from "../../assets/plogging-logo.png"
import headerRight from "../../assets/header-left.png";

const Hero = () => {
  return (
    <div className="grid md:grid-cols-2 w-full text-white font-Poppins py-10 pl-5"
      style={{
        backgroundImage: `url(${landingHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="flex flex-col items-center justify-around w-full gap-10">
        <h1 className="md:text-7xl text-4xl font-light text-left text-wrap">
          Welcome to Plogging Ethiopia
        </h1>
        <p className="italic text-2xl">
          Stride with purpose, and cleanse with passion!
        </p>

        <div className="flex items-center justify-between">
          <button className="bg-green-500 hover:bg-green-700 text-white h-fit font-light py-2 px-4 rounded self-start">
            <a href={"/#aboutus"}>
              Read More +
            </a>
          </button>

          <img
            className="w-1/2 rounded-full pl-2 pt-1 bg-green-500"
            alt="Plogging Ethiopia"
            src={ploggingLogo}
          />
        </div>
      </div>

      <img src={headerRight} />

    </div>
  )
}

export default Hero;