"use client";

import AboutMe from "./about";
import Hero from "./hero";
import Services from "./services";
import Stripes from "./stripes";

const Home = () => {
  return (
    <>
      <Hero />
      <main>
        <AboutMe />
        <Stripes />
        <Services />

        <div className="h-screen"></div>
      </main>
    </>
  );
};

export default Home;
