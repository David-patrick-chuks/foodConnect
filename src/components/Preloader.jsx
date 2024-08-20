import { Spinner } from "@material-tailwind/react";

export default function Preloader() {
  return (
    <div className=" h-screen top-0 w-full absolute flex justify-center items-center bg-amber-100">
      <Spinner className="h-16 w-16 text-amber-800/50" />
    </div>
  );
}
