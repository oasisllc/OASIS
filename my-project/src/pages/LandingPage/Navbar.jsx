import { FaRegCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const NavItems = () => {
  const navLinks = ["About", "Why Us", "Blog", "Clients"];

  return (
    <ul className="flex gap-x-6">
      {navLinks.map((link, index) => (
        <li
          key={index}
          className="cursor-pointer hover:text-yellow-100 transition-all"
        >
          {link}
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  return (
    <motion.div
    
    className="navbar w-full h-16 flex fixed z-50 bg-neutral-900 shadow-md top-0 px-8">
      <div className="h-full w-full flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <FaRegCalendarAlt size={25} className="text-yellow-300" />
          <h1 className="font-bold text-2xl">Appointly</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center">
          <NavItems />
        </div>

        {/* CTA Button */}
        <div className="items-center">
          <motion.button
            initial = {{y:0}}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{duration: 0.1}}
            className="p-2 font-bold text-sm bg-yellow-300 text-neutral-900 hover:bg-yellow-200 transition-all rounded-lg"
          >
            Get Started!
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
