import { FaRegCalendarAlt } from "react-icons/fa";
import './Hero.css';



const NavItems = () => {
  const navLinks = ['About', 'Why Us', 'Blog', 'Clients'];

  return (
    <ul className="flex space-x-6">
      {navLinks.map((link, index) => (
        <li key={index} className=" cursor-pointer">
          {link}
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  return (
    <div className="navbar w-full h-16 flex relative top-0 px-8 justify-between items-center">
      <div className="flex items-center space-x-4">
        <FaRegCalendarAlt size={30} />
        <h1 className="font-bold text-2xl">Appointly</h1>
      </div>
      <NavItems />
    </div>
  );
};

const Hero = () => {
  return (
    <div className="hero w-full h-screen fixed">
      <Navbar />
    <div className="hero w-full items-center h-screen flex flex-col p-4 rounded-xl">
      <div className="w-full h-full border-2 border-neutral-900 rounded-3xl ">

        

      
      </div>
    </div>
    </div>
  );
};

export default Hero;
