import './Hero.css';
import { motion } from "motion/react";

const Hero = () => {
  // Reusable animation presets
  const fadeInUp = {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" },
  };

  return (
    <div className="hero top-16 bg-neutral-900 w-full h-screen relative items-center flex p-12">
      <motion.div className="w-full p-2 h-full border border-yellow-300 shadow-lg shadow-yellow-300 rounded-3xl items-center md:flex-row flex-col flex">
        {/* Text Section */}
        <div className="md:w-1/2 w-full h-full items-center md:items-start flex flex-col md:text-center text-left p-8">
          <motion.h1
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 1 }}
            className="bg-gradient-to-t bg-clip-text p-2 border-transparent from-yellow-100 to-yellow-400 text-transparent text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center md:text-left text-nowrap"
          >
            Welcome To <br /> Appointly
          </motion.h1>
          <motion.h2
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 2 }}
            className="p-2 text-xs md:text-base font-light"
          >
            Scheduling done correctly.
          </motion.h2>

          <br />
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 3 }}
            className="p-2 flex flex-row gap-x-4 justify-between"
          >
            <motion.button
              initial= {{y:0}}
              whileHover={{ y: -5 }}
              transition={{ease: "easeOut", duration:0.1, delay:0}}

              className="min-w-24 bg-yellow-300 text-black py-2 px-4 rounded-lg transition-all duration-200 hover:bg-yellow-200"
            >
              Login
            </motion.button>
            <motion.button
              initial= {{y:0}}
              whileHover={{ y: -5 }}
              transition={{ease: "easeOut", duration:0.1, delay:0}}
              className="min-w-24 bg-yellow-300 text-black py-2 px-4 rounded-lg transition-all duration-200 hover:bg-yellow-200"
            >
              Register
            </motion.button>
          </motion.div>
        </div>

        {/* 3D Model Section */}
        <div className="md:w-1/2 w-full h-full md:rounded-r-3xl rounded-b-3xl p-8 bg-neutral-950">
          {/* Placeholder for the 3D Model */}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
