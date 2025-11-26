"use client";

import { useState } from "react";
import FeDwi1 from "./Components/FeDwi1";
import FeDwi2 from "./Components/FeDwi2";

export default function Home() {
  const [location, setLocation] = useState("");

  return (
    <div className="flex flex-col dark:bg-black">
      <FeDwi1 onLocationSelect={setLocation} />
    </div>
  );
}
