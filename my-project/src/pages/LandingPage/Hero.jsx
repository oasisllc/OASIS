import './Hero.css';
import { motion } from "motion/react";
import Calendar from '../../../public/models/Calendar';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './Hero.css';

const Hero = (props) => {
  // Reusable animation presets
  const fadeInUp = {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };
  const gotoAboutSection = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
    <div className="fixed inset-0 h-screen w-screen bg-green-100 bg-[radial-gradient(#0ea800_1.25px,transparent_1px)] [background-size:32px_32px] -z-10"></div>
  
    <div
    
    id='home' className="hero top-16 mb-16 bg-green-50 bg-opacity-0  w-full h-screen relative items-center flex p-12 ">
      <motion.div className="w-full md:pb-0 pb-24 h-full bg-green-50 border border-green-900 rounded-3xl items-center md:flex-row flex-col flex"
        style={{
            boxShadow: "0px 0px 20px rgba(0, 150, 0, 1)",
            borderRadius: "24px",
          }}>
        <div className="md:w-1/2 w-full h-full rounded-l-3xl bg-green-50 text-green-700 items-center md:items-start flex flex-col md:text-center text-left p-8">
          <motion.h1
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.5 }}
            className="bg-gradient-to-t bg-clip-text p-2 drop-shadow-2xl border-transparent from-green-500 to-green-600 font-bold text-transparent text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center md:text-left text-nowrap"
          >
            Welcome To <br /> Appointly
          </motion.h1>
          <motion.h2
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 1 }}
            className="p-4 text-xs md:text-base font-light"
          >
            Scheduling done correctly.
          </motion.h2>

          <br />
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 1.5 }}
            className="px-4 flex text-xs flex-row gap-x-4 justify-between "
            >
            <a href="/signuppage">
            <motion.button
              initial= {{y:0}}
              whileHover={{ y: -5 }}
              transition={{ease: "easeOut", duration:0.1, delay:0}}
              
              className="min-w-24 text-white hover:text-white drop-shadow-lg p-2 rounded-lg transition-all duration-200 bg-green-400 hover:bg-green-300"
            >
              Register
            </motion.button>
            </a>
            
            <motion.button
              onClick={gotoAboutSection}
              initial= {{y:0}}
              whileHover={{ y: -5 }}
              transition={{ease: "easeOut", duration:0.1, delay:0}}
              className="min-w-24 text-white hover:text-white drop-shadow-lg p-2 rounded-lg transition-all duration-200 bg-green-400 hover:bg-green-300"

            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        <motion.div
        initial ={{opacity: 0, y:50}}
        whileInView = {{opacity: 1, y:0}}   
        transition={{duration: 1}}      
        className="md:w-1/2 w-full overflow-hidden h-1/2 md:h-full md:rounded-r-3xl rounded-b-3xl p-0 md:p-8 lg:p-2 xl:p-0">

          <Canvas className='w-full h-full rounded-3xl shadow-2xl shadow-green-300'>
            <PerspectiveCamera/>
            <OrbitControls enableZoom={false} enablePan={false} />
            <ambientLight color={[0.25,1,0.25]} intensity={1}/>
            <directionalLight color={[0.25,1,0.5]} position={[0,0,5]} intensity={1}/>
            <Float speed={2} rotationIntensity={2} floatIntensity={2}>

            <Calendar scale={2.25} />

            </Float>


          </Canvas>

        </motion.div>
      </motion.div>
    </div>
    </>
  );
};

export default Hero;
