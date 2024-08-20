import Carousel from "react-multi-carousel";
import { testimonials } from "../utils/testimonials";
import "react-multi-carousel/lib/styles.css";

export const TestimonialsSection = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="py-12 lg:px-28 overflow-hidden relative">
      <img
        src="/images/test4.jpeg"
        className=" z-10 absolute opacity-60 w-[2500px] -bottom-10 md:-bottom-28 lg:-bottom-52 "
      />
      <div className=" mx-auto container px-4 z-20">
        <h2 className="lg:text-3xl text-xl font-bold pop text-center relative text-black z-20 mb-10">
          What Our Users Say
        </h2>
        <Carousel
          // showDots={true}
          keyBoardControl={true}
          infinite={true}
          autoPlaySpeed={3000}
          // customTransition="all .5"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          autoPlay={true}
          arrows={false}
          itemClass=" p-2 "
          className="z-20"
          // centerMode={true}
          responsive={responsive}
        >
          {testimonials.map(({ id, name, role, image, quote }) => (
            <div
              key={id}
              className="flex justify-between  items-center h-full w-full"
            >
              <div className="bg-gray-50 p-4  rounded-lg shadow-md flex flex-col justify-center w-full h-full items-center">
                <img
                  src={image}
                  alt={`${name}'s profile`}
                  className="w-16 h-16 rounded-full "
                />
                <h3 className="text-lg font-semibold text-center">{name}</h3>
                <p className="text-sm text-center text-gray-500 mb-2">{role}</p>
                <p className="text-center text-xs pop font-medium text-black">
                  "{quote}"
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};
