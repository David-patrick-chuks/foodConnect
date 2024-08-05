import { Button, Carousel, IconButton } from "@material-tailwind/react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaHandHoldingHeart,
  FaRegEdit,
  FaRocket,
  FaUserPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export function CarouselCustomNavigation({ scrollToClaim }) {
  const HeroData = [
    {
      imageUrl: "images/car1.jpeg",
      Headline: "Share Fresh Food, Spread Joy",
      Description:
        "Post your surplus fresh produce and help others access nutritious food items.",
      Button: "Post Food Items",
      icon: <FaRegEdit />,
      href: "/signup",
    },
    {
      imageUrl: "images/car2.jpeg",
      Headline: "Connect with Fresh Supplies",
      Description:
        "Find fresh, uncooked  food items from generous donors in your community.",
      Button: "Claim Food",
      icon: <FaHandHoldingHeart />,
      href: "#",
    },
    {
      imageUrl: "images/car3.jpeg",
      Headline: "Reduce Waste, Feed the Community",
      Description:
        "Join us in minimizing food waste by donating or claiming fresh food items.",
      Button: "Get Started",
      icon: <FaRocket />,
      href: "/signup",
    },
    {
      imageUrl: "images/car2.jpeg",
      Headline: "Connect Through Food",
      Description:
        "Join a network that bridges the gap between donors and those in need of fresh food.",
      Button: "Join Us",
      icon: <FaUserPlus />,
      href: "/contact-us",
    },
  ];

  return (
    <div className=" lg:max-w-full  lg:px-[140px]">
      <Carousel
        loop={true}
        autoplay={true}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute hidden sm:inline-block hover:bg-gray-100 transition-all duration-300 rounded-full hover:bg-opacity-10 text-2xl text-white top-2/4 left-2 -translate-y-2/4"
          >
            <FaChevronLeft />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute hidden  text-2xl sm:inline-block hover:bg-gray-100 transition-all duration-300  hover:bg-opacity-10 rounded-full text-white  top-2/4 !right-2 -translate-y-2/4"
          >
            <FaChevronRight />
          </IconButton>
        )}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-10 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {HeroData.map((data, id) => (
          <div
            key={id}
            className="lg:h-[446px] h-[280px] relative w-full bg-[#07270e]"
          >
            <img
              src={data.imageUrl}
              alt={data.imageUrl}
              className=" w-full object-cover h-[100%] opacity-65"
            />
            <div className="lg:w-[50%] pl-1 w-[60%] flex flex-col gap-2 absolute top-1/2 left-1/2 -translate-y-1/2  text-white -translate-x-[80%] pop ">
              <h1 className="lg:text-4xl text-md font-bold w-[80%]">{data.Headline}</h1>
              <p className="w-[80%] text-xs lg:text-sm">{data.Description}</p>
              <Link to={data.href}>
                {data.Button && "Claim Food" ? (
                  <Button
                    className="flex gap-1 items-center lg:py-2 py-1 bg-white text-dark rounded lg:rounded-md text-[8px] px-2 lg:px-3 lg:text-sm font-semibold"
                    onClick={scrollToClaim}
                  >
                    {data.Button}
                    {data.icon}
                  </Button>
                ) : (
                  <Button className="flex gap-1 items-center py-1 bg-white text-dark rounded lg:rounded-md lg:py-2 text-[8px] px-2 lg:px-3 lg:text-sm font-semibold">
                    {data.Button}
                    {data.icon}
                  </Button>
                )}
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
