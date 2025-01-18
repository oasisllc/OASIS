const Footer = () => {

    const collaborators = ["Elias Lopes", "Rocklyn Clarke", "Bryson Fields"]


    return (
      <footer className="w-full h-auto border-t border-opacity-30 border-yellow-200 bg-neutral-900 text-yellow-200 flex p-8">
        {/* Collaborators Section */}
        <div className="w-full md:w-1/3 text-sm mb-6 md:mb-0 flex flex-col">
          <h1 className=" text-left text-lg font-semibold mb-2">Collaborators</h1>
          <ul className="space-y-2">
          {collaborators.map((collaborator, index) => (
            <li
                key={index}
                className="hover:text-yellow-400 transition"
                >
                {collaborator}
                </li>
            ))}
          </ul>
        </div>
  
        <div className="w-full md:w-1/3 text-sm mb-6 md:mb-0">
          <h1 className="text-lg font-semibold mb-2 text-left">Quick Links</h1>
          <ul className="space-y-2">
            <li>
              <a href="#about" className="hover:text-yellow-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-yellow-400 transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-yellow-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
  
        <div className="w-full md:w-1/3 text-sm space-y-4">
          <h1 className="text-lg font-semibold text-left mb-2">Appointly</h1>
          <p className="text-gray-400">
            © {new Date().getFullYear()} Appointly. All Rights Reserved.
          </p>
          <p className=" text-gray-400">
            Designed with 💛 by the Appointly Team.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  