import React, { useEffect, useState } from "react";
import { CarouselCustomNavigation } from "../../components/CarouselCustomNavigation";
import Works from "../works/Works";
import { Donate } from "../../components/Donate";
import { TestimonialsSection } from "../../components/TestimonialsSection";
import PopupModal from "../../components/PopupModal";

export const Home = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const triggerPosition = document.documentElement.scrollHeight * 0.5;
    if (scrollPosition >= triggerPosition) {
      setModalVisibility(true);
      window.removeEventListener("scroll", handleScroll);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeModal = () => {
    setModalVisibility(false);
  };
const Homepage = () => {
  return(
    <div>
    <PopupModal onClose={closeModal} show={modalVisibility} />
    <CarouselCustomNavigation />
    <Works />
    <Donate />
    <TestimonialsSection />
  </div>
  )
}
  return (
   <div>
    <Homepage />
   </div>
  );
};
