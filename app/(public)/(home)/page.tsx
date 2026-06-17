import dynamic from "next/dynamic";
import Hero from "@/components/UI/Home/hero";
import AboutMe from "@/components/UI/Home/about";
import Stripes from "@/components/UI/Home/stripes";
import Services from "@/components/UI/Home/services";

const Projects = dynamic(() => import("@/components/UI/Home/projects"), {
  loading: () => (
    <section id="projects" className="h-[100dvh] bg-[#050505]" />
  ),
});

const Page = () => (
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

export default Page;