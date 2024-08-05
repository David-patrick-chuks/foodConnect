import React, { useRef } from "react";
import { Steps } from "../../utils/steps";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";

const Works = () => {
  return (
    <div className="lg:px-[140px] px-1 pop mx-auto py-5 lg:py-12">
      <h2 className="lg:text-2xl text-balance font-bold text-dark text-center mb-10">How FoodConnect Works</h2>
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {Steps.map((step) => (
          <Card
            key={step.id}
            className="bg-lime-50 bg-opacity-50 lg:p-4  p-2 rounded-lg text-center flex flex-col items-center hover:scale-105  transition-transform duration-300 justify-between shadow-md lg:border "
          >
            <CardHeader className=" bg-gradient-to-br from-green-900 to-light-green-900 text-white lg:p-3 p-2 lg:text-2xl  text-center  rounded-full">
              <step.icon />
            </CardHeader>
            <CardBody className="p-0 text-dark my-3">
              <h3 className="lg:text-xl text-sm font-semibold mb-2">
                {step.title}
              </h3>
              <p className="lg:mb-0 text-xs lg:text-sm">{step.description}</p>
            </CardBody>
            <CardFooter className="p-0 w-full">
              <p className="  underline-offset-1 text-green-900 hover:text-dark font-medium  underline">{step.cta.text}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Works;
