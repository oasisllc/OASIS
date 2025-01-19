const Footer = () => {

    const collaborators = ["Elias Lopes", "Rocklyn Clarke", "Bryson Fields"]


    return (
      <footer className="w-full h-auto border-t border-opacity-30 border-green-200 bg-green-400 text-green-200 flex p-8">
        {/* Collaborators Section */}
        <div className="w-full md:w-1/3 text-sm mb-6 md:mb-0 flex flex-col">
          <h1 className=" text-left text-lg text-white font-semibold mb-2">Collaborators</h1>
          <ul className="space-y-2">
          {collaborators.map((collaborator, index) => (
            <li
                key={index}
                className="hover:text-white transition"
                >
                {collaborator}
                </li>
            ))}
          </ul>
        </div>
  
        <div className="w-full md:w-1/3 text-sm mb-6 md:mb-0">
          <h1 className="text-lg font-semibold mb-2 text-left text-white">Quick Links</h1>
          <ul className="space-y-2">
            <li>
              <a href="#about" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-white transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
  
        <div className="w-full md:w-1/3 text-sm space-y-4">
          <h1 className="text-lg font-semibold text-left mb-2 text-white">Appointly</h1>
          <p className="text-green-100">
            © {new Date().getFullYear()} Appointly. All Rights Reserved.
          </p>
          <p className=" text-green-100">
            Designed with 💛 by the Appointly Team.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  