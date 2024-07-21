import { PiCubeDuotone } from "react-icons/pi";

const Services = () => {
  return (
    <section className="space-y-20 relative pb-20">
      <PiCubeDuotone className="opacity-50 absolute top-0 right-10 rotate-12" size={140} />
      <PiCubeDuotone className="opacity-30 absolute top-15 right-52 -rotate-6" size={50} />

      <div className="space-y-4 text-center">
        <p className="text-green">Services</p>
        <p className={`text-4xl font-medium`}>
          Available Services that <br /> I can work on
        </p>
      </div>

      <div className="container space-y-8">
        <p className="text-3xl">
          <span className="text-green">01.</span> Project Planning
        </p>

        <p className="text-gray-300 max-w-[40rem] ml-auto text-sm opacity-80 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod libero veritatis eveniet laudantium magnam,
          voluptatem dicta adipisci itaque explicabo quia tenetur, quaerat temporibus quisquam iusto aliquam doloremque
          mollitia, maiores commodi?
        </p>

        <div className="grid grid-cols-5 text-center">
          {["Design", "Database Design", "Project Management", "", ""].map((_, index) => (
            <div key={index} className="py-16 border border-white/40 flex items-center text-white/70 justify-center">
              <p className="max-w-[10rem] mx-auto font-medium">{_}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container space-y-8">
        <p className="text-3xl">
          <span className="text-green">02.</span> Development
        </p>

        <p className="text-gray-300 max-w-[40rem] ml-auto text-sm opacity-80 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod libero veritatis eveniet laudantium magnam,
          voluptatem dicta adipisci itaque explicabo quia tenetur, quaerat temporibus quisquam iusto aliquam doloremque
          mollitia, maiores commodi?
        </p>

        <div className="grid grid-cols-5 text-center relative">
          <PiCubeDuotone className="opacity-30 absolute -top-20 left-0 -rotate-12" size={50} />

          {["Frontend Development", "Backend Development", "Fullstack Development", "S.E.O", "Deployment"].map(
            (_, index) => (
              <div key={index} className="py-16 border border-white/40 flex items-center text-white/70 justify-center">
                <p className="max-w-[10rem] mx-auto font-medium">{_}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
