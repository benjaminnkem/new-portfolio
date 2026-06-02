"use client";

import { higuen } from "@/lib/utils/fonts";

const services = [
  {
    number: "01",
    title: "Project Planning",
    description:
      "Turning ideas into structured products through technical discovery, architecture planning, database design, and execution strategy.",
    items: [
      "Product Strategy",
      "System Architecture",
      "Database Design",
      "Project Management",
    ],
  },
  {
    number: "02",
    title: "Development",
    description:
      "Building scalable web applications with clean architecture, maintainable code, and a strong focus on performance and user experience.",
    items: [
      "Frontend Development",
      "Backend Development",
      "Fullstack Development",
      "API Design",
      "Deployment",
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
                      key={item}
                      className="group border border-white/10 hover:border-green duration-300 p-8 md:p-10"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xl md:text-2xl">{item}</p>

                        <span className="text-green text-2xl translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-40 text-center">
          <p className="text-cWhite/40 uppercase tracking-[0.3em] text-sm">
            Let's Build Something Great
          </p>

          <h3
            className={`${higuen.className} text-5xl md:text-7xl lg:text-8xl mt-6`}
          >
            Ready To Work <br /> Together?
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Services;
