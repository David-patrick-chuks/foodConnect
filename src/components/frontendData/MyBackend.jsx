import { useEffect, useState } from "react";

function MyBackend() {
  const [data, setData] = useState("");
  const MyBackData = async () => {
    try {
      const resp = await fetch("http://localhost:5000");

      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }
      const data = await resp.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  MyBackData();

  useEffect(() => {
  }, []);

  return (
    <div className=" w-full p-10 bg-amber-600 ">
      <h1>My Backend Data</h1>
      <p>{data.message}</p>
    </div>
  );
}
export default MyBackend;
