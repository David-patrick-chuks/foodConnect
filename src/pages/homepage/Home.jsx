import React from "react";
import { CarouselCustomNavigation } from "../../components/CarouselCustomNavigation";
import Works from "../works/Works";
import { Donate } from "../../components/Donate";
import { TestimonialsSection } from "../../components/TestimonialsSection";

export const Home = () => {
  return (
    <div>
      <CarouselCustomNavigation />
      <Works />
      <Donate />
      <TestimonialsSection />
    </div>
  );
};
