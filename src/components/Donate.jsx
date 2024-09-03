import React, { useState } from "react";
import { Ddetails } from "../utils/donations";
import {
    Avatar,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export function Donate() {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleClaimClick = (item) => {
      setSelectedItem(item);
    };
  
    const handleCloseModal = () => {
      setSelectedItem(null);
    };
    const sliceData= Ddetails.slice(0, 3)

  return (
    <div className=" mx-auto pop lg:px-[140px] px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
      Food Items Up for Grabs
      </h2>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 place-items-center ">
        {sliceData.map((item) => (
          <Card
            key={item.id}
            className="relative grid w-full max-w-[28rem] items-end justify-center overflow-hidden text-center h-[30rem]"
          >
            <CardHeader
              shadow={false}
              floated={false}
              color="transparent"
              className="absolute inset-0 m-0 w-full rounded-none bg-cover bg-center h-full bg-no-repeat"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="  inset-0 h-full w-full bg-gradient-to-t from-black/90 to-black/5 via-black/50 absolute "></div>
            </CardHeader>
            <CardBody className="relative py-14 px-3 md:px-12">
              <Typography color="white" variant="h2" className=" mb-5 pop font-medium  text-4xl leading-[1.3] text-center">
                {item.description}
              </Typography>
              <Typography variant="h5" className="text-gray-300 text-xs mb-4 pop ">
                {item.name}
              </Typography>
              <Avatar 
              size="xl"
              variant="circular"
              alt={item.name}
              className=" border-2 border-white"
              src={item.profile}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
