import React from "react";
import { Button } from "../ui/button";
import { Globe } from "./Globe";

function Hero() {
  return (
    <section className="flex h-[90vh] w-full flex-row justify-between max-md:mt-20 max-md:flex-col md:px-10">
      <div className="mt-32 w-[90%] space-y-5 max-md:w-full">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight max-md:text-center lg:text-6xl">
          Unlock <br /> Powerful Brand Partnerships
        </h1>
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight text-neutral-600 max-md:text-center max-md:text-sm">
          Bridging Businesses with Content Creators and Influencers for Powerful
          Collaborations Throughout The World.
        </h4>
        <div className="flex items-center space-x-5 max-md:justify-center">
          <Button variant={"default"}>For Businesses</Button>
          <Button variant={"secondary"}>For Creators</Button>
        </div>
      </div>
      <div className="relative mt-10 flex w-full bg-transparent align-top md:h-auto">
        <Globe />
      </div>
    </section>
  );
}

export default Hero;
