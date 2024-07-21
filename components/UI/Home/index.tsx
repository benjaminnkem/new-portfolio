"use client";

import AboutMe from "./about";
import Hero from "./hero";
import Stripes from "./stripes";

const Home = () => {
  return (
    <>
      <Hero />
      <main>
        <AboutMe />
        <Stripes />

        <div className="h-screen"></div>
      </main>
    </>
  );
};

export default Home;
