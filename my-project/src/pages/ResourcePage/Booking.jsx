import { FaWindowClose } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";



const Booking = ({ user, onClose, resource }) => {
  const [timesOpen, setTimesOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([])

  const handleTimeToggle = (time) => {
    setSelectedTimes((prevSelected) =>
      prevSelected.includes(time)
        ? prevSelected.filter((t) => t !== time)
        : [...prevSelected, time]
    );
  };

  const Close = () => {
    onClose(false);
    setTimesOpen(false);
  };

  const handleTimes = () => {
    setTimesOpen(true); 
  };

  return (
    <div className="z-40 fixed w-full h-full flex justify-center md:items-center backdrop-blur-sm">
      <div className="w-3/4  h-auto overflow-hidden bg-neutral-900 rounded-2xl p-6 shadow-xl flex flex-col">
        <div className="w-full flex justify-end items-center mb-4">
          <button onClick={Close} className="text-2xl text-gray-400 hover:text-white transition duration-200">
            <FaWindowClose />
          </button>
        </div>

        <div className="w-full h-full flex flex-row gap-6">
          <motion.div 
            
            initial={{ opacity: 0, x: -100 }}
            animate={timesOpen ? { opacity: 0, x: -100 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0, type: "spring", stiffness: 100, ease: "easeIn" }}
            className={` ${timesOpen? "hidden" : "" } w-full h-auto bg-neutral-950 rounded-lg shadow-lg flex flex-col gap-4 items-center justify-center p-4`}
          >
            <img
              src={resource.img}
              alt={resource.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h1 className="text-center font-light text-sm">{resource.description}</h1>
          </motion.div>
          <motion.div 
            
            initial={{ opacity: 0, x: -100 }}
            animate={timesOpen ? { opacity: 1, x: 0 } : { opacity: 1, x: -100 }}
            transition={{ duration: 0.5, delay: 0, type: "spring", stiffness: 100, ease: "easeIn" }}
            className={` ${timesOpen? "" : "hidden" } w-full h-auto bg-neutral-950 rounded-lg shadow-lg flex flex-col gap-4 items-center justify-center p-4`}
          >

            <h1> {resource.name} </h1>

            <h1> Slots: {selectedTimes.length} </h1>

           
          </motion.div>

          



        
          <motion.div
          
            initial={{ opacity: 0, x: 100 }}
            animate={timesOpen ? { opacity: 0, x: 100 } : { opacity: 1, x: 0 }} // Trigger left movement and disappearance
            transition={{ duration: 0.5, type: "spring", stiffness: 100, ease: "easeIn" }}
            className={` ${timesOpen? "hidden" : "" } w-full  h-full bg-neutral-950 rounded-lg flex flex-col items-center justify-center p-4`}
          >
            <h1 className="text-2xl font-bold text-yellow-300 mb-2">{resource.name}</h1>
            <p className="text-sm text-gray-400 mb-4">{resource.category}</p>

            <div className="w-full bg-neutral-800 p-4 rounded-lg mb-6">
              <div className="flex justify-between text-sm text-white">
                <div>
                  <h2 className="font-semibold">Location:</h2>
                  <p>{resource.location}</p>
                </div>
                <div className="text-right">
                  <h2 className="font-semibold">Availability:</h2>
                  <p>{resource.availability}</p>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center gap-4">
              <button 
                onClick={handleTimes} // Handle click for "Book Now"
                className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-400 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={timesOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }} // Trigger left movement and disappearance
            transition={{ duration: 0.5, type: "spring", stiffness: 100, ease: "easeIn" }}
            className={` ${!timesOpen? "hidden" : "" } w-full  h-full bg-neutral-950 rounded-lg flex flex-col items-center justify-center p-4`}
          >

            <div 
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    overflowY: "scroll",
                }}            
                className="w-full h-full overflow-y-scroll flex flex-wrap gap-2 justify-center items-center ">
                { 
                
                    resource.availableHours.split(",").map((time, index) => {
                      const startHour = parseInt(time, 10);
                      const endHour = (startHour + 1) % 24;

                    const formatHour = (hour) => {
                    const suffix = hour >= 12 ? "pm" : "am";
                    const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                    return `${formattedHour}${suffix}`;
                    };
                    const timeRange = `${formatHour(startHour)} - ${formatHour(endHour)}`;

                    const booked = resource.bookedHours.includes(time)

                    return (
                    <motion.button
                        key={index} // Add a key for each button
                        initial={{ y: 200, opacity: 0 }}
                        animate={timesOpen ? { y: 0, opacity: 1 } : { y: 200, opacity: 0, transition: { delay: 0 } }}
                        transition={{ duration: 1, delay: index / 10 }}
                        className={` 
                          
                          w-20 text-nowrap h-8 text-xs rounded-lg border border-yellow-300 bg-neutral-900 flex text-center justify-center hover:bg-opacity-50 hover:bg-yellow-300 hover:text-yellow-300 items-center 
                          ${selectedTimes.includes(time) && !booked ? " bg-gradient-to-br from-yellow-300 to-yellow-500 text-neutral-900 " : " "
                        }
                        ${booked? "text-neutral-500 border-neutral-800 hover:bg-red-300" : ""}`
                      }
                        onClick={() => !booked? handleTimeToggle(time) : null}
                    >
                        {timeRange}
                    </motion.button>
                    );
                })
                }


            </div>

            <div className="w-full h-1/6 items-center justify-between flex gap-4 text-sm text-center py-8">
                <button className="border-yellow-300 border p-2 rounded-lg"
                onClick={() => setTimesOpen(false) }
                >
                    <IoArrowBackSharp/></button>
                <button className="border-yellow-300 border p-2 rounded-lg">Confirm</button>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
