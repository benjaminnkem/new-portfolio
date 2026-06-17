import Hero from "./hero";
import AboutMe from "./about";
import Stripes from "./stripes";
import Services from "./services";
import Projects from "./projects";

const Home = () => (
  <>
    <Hero />
    <main>
      <AboutMe />
      <Stripes />
      <Services />
      <Projects />
    </main>
  </>
);

export default Home;