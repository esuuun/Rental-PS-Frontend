import Image from "next/image";
import FeDwi1 from "./Components/FeDwi1";
import FeDwi2 from "./Components/FeDwi2";

export default function Home() {
  return (
    <div className="flex flex-col dark:bg-black">
      <FeDwi1/>
      <FeDwi2/>
    </div>
  );
}
