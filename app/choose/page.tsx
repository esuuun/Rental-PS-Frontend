import React from "react";
import FeDwi2 from "../Components/FeDwi2";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const { location } = await searchParams;
  return (
    <div>
      <FeDwi2 location={location} />
    </div>
  );
}

export default page;
