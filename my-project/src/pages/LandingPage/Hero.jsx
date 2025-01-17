import { FaRegCalendarAlt } from "react-icons/fa";
import './Hero.css';
import { Canvas } from "@react-three/fiber";
import CalendarModel from "../../../public/models/CalendarModel";
import { OrbitControls } from "@react-three/drei";

const NavItems = () => {
  const navLinks = ['About', 'Why Us', 'Blog', 'Clients'];

  return (
    <ul className="flex space-x-8 text-lg font-medium">
      {navLinks.map((link, index) => (
        <li key={index} className="cursor-pointer hover:text-purple-500 transition-colors duration-300">
          {link}
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  return (
    <div className="navbar relative w-full h-16 top-0 px-8 flex justify-between items-center z-50">
      <div className="flex items-center space-x-4 ">
        <FaRegCalendarAlt size={30} />
        <h1 className="font-bold text-2xl">Appointly</h1>
      </div>
      <NavItems />
    </div>
  );
};

const Hero = (props) => {
  return (
    <div className=" hero w-full h-screen fixed " onMouseMove={props.handleMouseMove}>
      <Navbar />
      <div className="mt-4 hero-content w-full flex items-center justify-center h-screen px-4 sm:px-16">
        <div className="w-full h-full flex flex-col md:flex-row items-center  justify-between gap-8 p-12 border shadow-2xl shadow-yellow-300 border-yellow-200 rounded-3xl">
          <div className="w-full sm:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left">
            <header className="text-6xl p-2 md:bg-gradient-to-r bg-gradient-to-b from-yellow-100 to-yellow-300 bg-clip-text text-transparent md:text-6xl lg:text-7xl xl:text-8xl text-nowrap  font-bold">
              Welcome To <br /> Appointly
            </header>
            <br/>
            <h1 className="mt-4 px-2 font-serif text-nowrap lg:text-base md:text-sm text-xs">
              Simplify your scheduling with ease and style.
            </h1>
            <div className="flex  justify-between">

            <button className=" mt-6 px-6 py-3 font-semibold rounded-full shadow-sm transition-all duration-300">
              Login
            </button>
            <button className="mt-6 visible md:hidden px-6 py-3 font-semibold rounded-full shadow-md  transition-all duration-300">
              Register
            </button>
            </div>
          </div>

          <div className=" md:relative fixed md:translate-y-0 translate-y-60 -z-50 w-full sm:w-1/2 h-56 md:h-96 flex items-center justify-center">
            <Canvas className="w-full h-full xl:h-screen ">
              <ambientLight intensity={0.5} />
              <directionalLight intensity={1} position={[2, 2, 2]} />
              <CalendarModel
                mousePosition={props.mousePosition}
                scale={props.isMobile? 2: 2.5}
                isMobile={props.isMobile}
              />
              <OrbitControls />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
