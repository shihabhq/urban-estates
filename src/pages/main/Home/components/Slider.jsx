import { Typewriter } from "react-simple-typewriter";
import ButtonCovered from "../../../../shared/ButtonCovered";
import img1 from "../../../../assets/home/slider1.png";
import img2 from "../../../../assets/home/slider2.png";
import img3 from "../../../../assets/home/slider3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import SingleSlider from "./SingleSlider";
import { Link } from "react-router";
import ButtonOutlined from "../../../../shared/ButtonOutlined";

const AnimateText = () => {
  return (
    <Typewriter
      words={["Luxurious", "Elegant", "Amazing"]}
      typeSpeed={100}
      deleteSpeed={80}
      delaySpeed={4000}
      loop={true}
    />
  );
};

const Slider = () => {
  return (
    <div className="home-banner relative flex h-[70vh]  justify-center items-center flex-col-reverse xsm:flex-row gap-3 bg-cover bg-center">
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="mySwiper h-full"
      >
        <SwiperSlide>
          <SingleSlider src={img1} />
        </SwiperSlide>
        <SwiperSlide>
          <SingleSlider src={img2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="Food 1" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
      <div className=" absolute top-[20%] z-40 max-w-2xl h-[25vh] md:h-[30vh] left-[10%] flex items-start flex-col pr-4 gap-4">
        <p className="bg-btnhov font-semibold px-2 text-white text-base rounded-full">
          Welcome to Urban Estate
        </p>
        <h1 className="text-4xl md:text-6xl font-bold flex-grow text-[#ffffff] z-50 font-poppins">
          We have the Homes That are{" "}
          <span className="text-btncol">
            <AnimateText />
          </span>
        </h1>
        <div className="relative w-full h-fit max-w-xl">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full py-6"
            aria-label="Search input"
          />
          <div className="absolute top-0 right-0 h-full">
            <Link
              to="/"
              className=" flex h-full text-white items-center 
              text-base justify-center rounded-r-md gap-3 font-poppins font-semibold
               bg-btncol hover:bg-btnhov px-3 transition-all duration-200"
              aria-label="Search button"
            >
              Search
            </Link>
          </div>
        </div>
        <div>
          <ButtonCovered to={"/all-properties"}>
            {" "}
            See All Properties <FaArrowRight />{" "}
          </ButtonCovered>
        </div>
      </div>
    </div>
  );
};

export default Slider;
{
  /* <div className="absolute top-4 z-50 left-3 flex items-start flex-col gap-4">
        <p className="bg-btnhov text-white text-base rounded-full">
          Welcome to Urban Estate
        </p>
        <h1 className="text-4xl font-poppins">
          We have the Homes That <br /> are{" "}
          <span className="text-btncol">
            <AnimateText />
          </span>
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <div>
            <ButtonCovered to={"/"}>Search</ButtonCovered>
          </div>
        </div>
      </div> */
}
