"use client";

import { higuen } from "@/lib/utils/fonts";
import Button from "@/components/Common/Button";

const services = [
  {
    number: "01",
    title: "Project Planning",
    description:
      "Turning ideas into structured products through technical discovery, architecture planning, database design, and execution strategy.",
    items: [
      {
        name: "Product Strategy",
        desc: "Defining project roadmaps, scoping MVPs, and mapping out high-impact feature sets.",
      },
      {
        name: "System Architecture",
        desc: "Designing resilient, scalable, and secure system topologies tailored for growth.",
      },
      {
        name: "Database Design",
        desc: "Optimizing database schemas, index configurations, and relational models.",
      },
      {
        name: "Project Management",
        desc: "Agile sprint planning, tracking velocity, and aligning cross-functional teams.",
      },
    ],
  },
  {
    number: "02",
    title: "Development",
    description:
      "Building scalable web applications with clean architecture, maintainable code, and a strong focus on performance and user experience.",
    items: [
      {
        name: "Frontend Development",
        desc: "Creating pixel-perfect, interactive, responsive client UIs with modern React frameworks.",
      },
      {
        name: "Backend Development",
        desc: "Architecting reliable, performant, and secure API servers and background job queues.",
      },
      {
        name: "Fullstack Development",
        desc: "End-to-end product delivery from DB tables up to polished client-side interfaces.",
      },
      {
        name: "API Design",
        desc: "Developing REST or GraphQL endpoints with complete type safety and robust validation.",
      },
      {
        name: "Deployment",
        desc: "Setting up CI/CD workflows, serverless architectures, and optimizing CDN caching.",
      },
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-40">
      <div className="container">
        <div className="text-center mb-32">
          <p className="text-green uppercase tracking-[0.3em] text-sm">
            How I Work
          </p>

          <h2
            className={`${higuen.className} text-5xl md:text-7xl lg:text-8xl mt-6`}
          >
            From Idea <br /> To Production
          </h2>
        </div>

        <div className="space-y-40">
          {services.map((service) => (
            <div
              key={service.number}
              className="grid lg:grid-cols-2 gap-20 min-h-screen border-t border-white/10"
            >
              <div className="lg:sticky lg:top-32 h-fit pt-20">
                <p
                  className={`${higuen.className} text-[8rem] md:text-[12rem] leading-none text-green/10`}
                >
                  {service.number}
                </p>

                <h3 className="text-4xl md:text-5xl font-medium -mt-6">
                  {service.title}
                </h3>

                <p className="mt-8 text-cWhite/60 max-w-lg leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center">
                <div className="w-full py-20 space-y-5">
                  {service.items.map((item) => (
                    <div
                      key={item.name}
                      className="group relative border m-over border-white/5 bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/10 duration-500 rounded-2xl p-6 md:p-8 overflow-hidden transition-all flex flex-col justify-between"
                    >
                      {/* Left vertical border hover beam indicator */}
                      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-green scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />

                      <div className="flex items-start justify-between gap-6">
                        <div className="space-y-2">
                          <p className="text-xl md:text-2xl font-medium text-cWhite group-hover:text-green duration-300 transition-colors">
                            {item.name}
                          </p>
                          <p className="text-sm text-cWhite/55 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        <span className="text-cWhite/30 group-hover:text-green text-3xl transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0 select-none">
                          ↗
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-40 text-center flex flex-col items-center gap-10">
          <div className="space-y-6">
            <p className="text-cWhite/40 uppercase tracking-[0.3em] text-sm">
              Let's Build Something Great
            </p>

            <h3
              className={`${higuen.className} text-5xl md:text-7xl lg:text-8xl leading-[1.1]`}
            >
              Ready To Work <br /> Together?
            </h3>

            <p className="text-cWhite/60 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
              Have an exciting project in mind or looking to hire a full-stack
              engineer? Let's build something exceptional together.
            </p>
          </div>

          <a
            href="mailto:benjaminnkemfrancis@gmail.com"
            className="m-over inline-block"
          >
            <Button size="large" rounded="full" variant="filled">
              Get In Touch →
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
