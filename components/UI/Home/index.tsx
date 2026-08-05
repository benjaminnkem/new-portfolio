import Hero from "./hero";
import AboutMe from "./about";
import Stripes from "./stripes";
import Services from "./services";
import Experience from "./experience";
import Projects from "./projects";

const Home = () => (
  <>
    <Hero />
    <main>
      <AboutMe />
      <Stripes />
      <Experience />
      <Services />
      <Projects />
    </main>
  </>
);

export default Home;