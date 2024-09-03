import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";


export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);



  useEffect(() => {
    const fetchTestimonialsFromFirestore = async () => {
      try {
        const testimonialsCollection = collection(db, "FcTestimonials");
        const testimonialsSnapshot = await getDocs(testimonialsCollection);

        if (testimonialsSnapshot.empty) {
          console.log("not existt");
        } else {
          const testimonialsList = testimonialsSnapshot.docs.map((doc) =>
            doc.data()
          );
          setTestimonials(testimonialsList);
          console.log(testimonialsList);
        }
      } catch (error) {
        console.error("Error fetching testimonials: ", error);
        setError("Failed to fetch testimonials. Please try again later.");
      }
    };

    fetchTestimonialsFromFirestore();
  }, []);

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
        <h2 className="lg:text-xl text-base font-bold pop text-center relative text-black z-20 mb-10">
          Testimonials from Our Donors and Receiver
        </h2>
        <Carousel
          keyBoardControl={true}
          infinite={true}
          autoPlaySpeed={3000}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          autoPlay={true}
          arrows={false}
          itemClass=" p-2 "
          className="z-20"
          responsive={responsive}
        >
          {testimonials.map(({ id, name, role, image, quote }) => (
            <div
              key={id}
              className="flex justify-between  items-center h-full w-full"
            >
              <div className="bg-yellow-50 p-4  rounded-lg shadow-md flex flex-col justify-center w-full h-full items-center">
                <img
                  src={image}
                  alt={`${name}'s profile`}
                  className="w-16 h-16 object-cover rounded-full "
                />
                <h3 className="text-lg font-semibold text-center">{name}</h3>
                <p className="text-sm text-center text-gray-500 mb-2">{role}</p>
                <p className="text-center inline-flex text-xs pop font-medium text-black">
                  " {quote} "
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};
