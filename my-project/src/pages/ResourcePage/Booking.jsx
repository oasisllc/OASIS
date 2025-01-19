import { FaWindowClose } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';

const Booking = ({ onClose, resource }) => {
  const location = useLocation();
  const current_user = location.state?.user;
  const [timesOpen, setTimesOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [dataSent, setDataSent] = useState(false); // State to track the completion of sendData
  const [updatedUser, setUpdatedUser] = useState(current_user); // State to store the updated current user
  const [currentBookings, setCurrentBookings] = useState([]); // State to store current bookings

  const handleTimeToggle = (time) => {
    setSelectedTimes((prevSelected) =>
      prevSelected.includes(time)
        ? prevSelected.filter((t) => t !== time)
        : [...prevSelected, time]
    );
  };

  const fetchUsers = async () => {
    const collections = ['users'];
    let allUsers = [];

    for (const user of collections) {
      const querySnapshot = await getDocs(collection(db, user));
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      allUsers = [...allUsers, ...docs];
    }

    setUsers(allUsers);
  };

  const fetchCurrentUser = async () => {
    const q = query(collection(db, 'users'), where('username', '==', current_user.username), where('password', '==', current_user.password));
    const querySnapshot = await getDocs(q);
    let userData = null;

    querySnapshot.forEach((doc) => {
      userData = { id: doc.id, ...doc.data() };
    });

    if (userData) {
      setUpdatedUser(userData);
      setCurrentBookings(userData.booked || []); // Store current bookings
    }
  };

  const addContributor = (contributor) => {
    setContributors([...contributors, contributor]);
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        !contributors.includes(user) && user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users, contributors]);

  useEffect(() => {
    if (dataSent) {
      fetchCurrentUser();
      fetchUsers();
      setDataSent(false); // Reset the dataSent state
    }
  }, [dataSent]);

  const Close = () => {
    onClose(false);
    setTimesOpen(false);
    setFilteredUsers([]);
    setContributors([]);
    setSearchTerm("");
  };

  const handleTimes = () => {
    setTimesOpen(true);
  };

  const sendData = async () => {
    const bookingData = {
      resource_name: resource.name,
      resource_type: resource.type, // Assuming resource.category holds the type
      description: resource.description,
      date: new Date().toLocaleDateString(), // Assuming you want to use the current date
      time_booked: selectedTimes.join(", "), // Joining selected times as a string
      contributors: contributors.map(contributor => contributor.username),
    };

    try {
      console.log(current_user);

      if (!Array.isArray(current_user.booked)) {
        throw new Error("Current user's booked attribute is not an array");
      }

      // Query the current user's document
      const q = query(collection(db, 'users'), where('username', '==', current_user.username), where('password', '==', current_user.password));
      const querySnapshot = await getDocs(q);
      let userId = null;

      querySnapshot.forEach((doc) => {
        userId = doc.id;
      });

      if (!userId) {
        throw new Error("User not found");
      }

      // Update the current user's bookings
      const userDoc = doc(db, "users", userId);
      await updateDoc(userDoc, {
        booked: [...currentBookings, bookingData] // Append new booking data to current bookings
      });

      // Update each contributor's bookings
      for (const contributor of contributors) {
        const contributorQuery = query(collection(db, 'users'), where('username', '==', contributor.username));
        const contributorSnapshot = await getDocs(contributorQuery);
        let contributorId = null;
        let contributorBookings = [];

        contributorSnapshot.forEach((doc) => {
          contributorId = doc.id;
          contributorBookings = doc.data().booked || [];
        });

        if (!contributorId) {
          throw new Error(`Contributor ${contributor.username} not found`);
        }

        const contributorDoc = doc(db, "users", contributorId);
        await updateDoc(contributorDoc, {
          booked: [...contributorBookings, bookingData]
        });
      }

      alert("Booking successfully added!");
      setDataSent(true); // Set dataSent to true after successful data send
      Close();
    } catch (error) {
      console.error("Error adding booking: ", error);
      alert(`Failed to add booking. Please try again. Error: ${error.message}`);
    }
  };

  return (
    <div className="z-40 fixed w-full h-full flex justify-center md:items-center backdrop-blur-sm">
      <div className="w-3/4 h-auto overflow-hidden bg-neutral-900 rounded-2xl p-6 shadow-xl flex flex-col">
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
            className={` ${timesOpen ? "hidden" : ""} w-full h-auto bg-neutral-950 rounded-lg shadow-lg flex flex-col gap-4 items-center justify-center p-4`}
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
            className={` ${timesOpen ? "" : "hidden"} w-full h-auto bg-neutral-950 rounded-lg shadow-lg flex flex-col gap-4 p-4`}
          >
            <h1 className="text-xl font-bold text-yellow-300">{resource.name}</h1>
            <h1 className="text-sm text-gray-400">Slots: {selectedTimes.length}</h1>
            <form className="w-full flex justify-center items-center mt-4">
              <input
                type="text"
                className="w-full bg-neutral-900 text-yellow-300 p-2 rounded-xl"
                placeholder="Search users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <div className="w-full h-32 flex flex-col items-center gap-y-4 rounded-2xl bg-neutral-900 p-4 overflow-y-scroll mt-4">
              {searchTerm.length ? filteredUsers.map((user, index) => (
                <motion.button
                  initial={{ scale: 0.9 }}
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addContributor(user)}
                  key={index}
                  className="bg-neutral-950 rounded-lg text-white justify-between flex items-center p-2 w-full"
                >
                  <h1 className="text-sm font-light">{user.username}</h1>
                  <IoPersonAdd />
                </motion.button>
              )) : null}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={timesOpen ? { opacity: 0, x: 100 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100, ease: "easeIn" }}
            className={` ${timesOpen ? "hidden" : ""} w-full h-full bg-neutral-950 rounded-lg flex flex-col items-center justify-center p-4`}
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
                onClick={handleTimes}
                className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-400 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={timesOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100, ease: "easeIn" }}
            className={` ${!timesOpen ? "hidden" : ""} w-full bg-neutral-950 rounded-lg flex flex-col items-center justify-center p-4`}
          >
            <div
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                overflowY: "scroll",
              }}
              className="w-full h-full overflow-y-scroll flex flex-wrap justify-evenly items-center p-4"
            >
              {resource.availableHours.split(",").map((time, index) => {
                const startHour = parseInt(time, 10);
                const endHour = (startHour + 1) % 24;

                const formatHour = (hour) => {
                  const suffix = hour >= 12 ? "pm" : "am";
                  const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                  return `${formattedHour}${suffix}`;
                };
                const timeRange = `${formatHour(startHour)} - ${formatHour(endHour)}`;

                const booked = resource.bookedHours.includes(time);

                return (
                  <motion.button
                    key={index}
                    initial={{ y: 200, opacity: 0 }}
                    animate={timesOpen ? { y: 0, opacity: 1 } : { y: 200, opacity: 0, transition: { delay: 0 } }}
                    transition={{ duration: 1, delay: index / 10 }}
                    className={`w-20 text-nowrap h-8 text-xs rounded-lg border border-yellow-300 bg-neutral-900 flex text-center justify-center hover:bg-opacity-50 hover:bg-yellow-300 hover:text-yellow-300 items-center ${
                      selectedTimes.includes(time) && !booked ? "bg-gradient-to-br from-yellow-300 to-yellow-500 text-neutral-900" : ""
                    } ${booked ? "text-neutral-500 border-neutral-800 hover:bg-red-300" : ""}`}
                    onClick={() => !booked ? handleTimeToggle(time) : null}
                  >
                    {timeRange}
                  </motion.button>
                );
              })}
            </div>

            <div className="w-full h-1/6 items-center justify-between flex gap-4 text-sm text-center py-8">
              <button className="border-yellow-300 border p-2 rounded-lg" onClick={() => setTimesOpen(false)}>
                <IoArrowBackSharp />
              </button>
              <button className="border-yellow-300 border p-2 rounded-lg" onClick={sendData}>Confirm</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Booking;