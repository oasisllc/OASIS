import { FaRegCalendarAlt } from "react-icons/fa";



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
      <div className="navbar w-full h-16 flex relative z-50 bg-neutral-900 top-0 px-8 justify-between items-center">
        <div className="flex items-center space-x-4">
          <FaRegCalendarAlt size={30} />
          <h1 className="font-bold text-2xl">Appointly</h1>
        </div>
        <NavItems />
      </div>
    );
  };


  export default Navbar;
  