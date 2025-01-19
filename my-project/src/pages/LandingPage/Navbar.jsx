import { FaRegCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const NavItems = () => {
  const navLinks = {
    'Home' : 'home',
    'About': 'about',
    'Contact': 'contact'
  };

  return (
    <ul className="flex gap-x-6 lg:gap-x-12 ">
      {Object.entries(navLinks).map(([name, link], index) => (
        <li
          key={index}
          className="cursor-pointer text-sm font-bold hover:text-yellow-100 transition-all"
        >
          <a href={`#${link}`} className="hover:text-white" >{name}</a> {/* Updated to handle anchor links */}
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  return (
    <motion.div className="navbar w-full h-16 flex fixed z-50 bg-green-500 shadow-md top-0 px-8">
      <div className="h-full w-full flex text-green-200 justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <FaRegCalendarAlt size={25} className="text-green-200" />
          <h1 className="font-bold text-2xl text-green-200">Appointly</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center">
          <NavItems />
        </div>

        {/* CTA Button */}
        <a href="/loginpage">
        <div className="items-center">
          <motion.button
            initial={{ y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="p-2 px-6 font-bold text-sm bg-green-300 hover:text-green-600 text-green-600 hover:bg-green-200 transition-all rounded-lg"
          >
            Login
          </motion.button>
        </div>
        </a>
      </div>
    </motion.div>
  );
};

export default Navbar;
