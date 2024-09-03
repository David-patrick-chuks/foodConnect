import { Spinner } from "@material-tailwind/react";
import { useEffect } from "react";

export default function Preloader() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className=" h-screen top-0 z-50 w-full fixed   flex justify-center items-center bg-amber-100">
      {/* <img src="images/load3.svg" alt="" /> */}
      <Spinner className="h-7 w-7 text-amber-800" />
    </div>
  );
}
