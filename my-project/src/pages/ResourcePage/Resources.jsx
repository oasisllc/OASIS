import React, { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import "./Resources.css";
import { motion } from "framer-motion";
import Booking from "./Booking";
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Resources = ({ user }) => {
  const categories = {
    "Lab Equipment": "equipment",
    "Meeting Rooms": "meeting room",
    "Research Centers": "lab",
  };

  // State to manage selected categories
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [bookingOpen, setBookingOpen] = useState(false);
  const [viewedResource, setViewedResource] = useState(null);
  const [resources, setResources] = useState([]); // State to store fetched resources

  useEffect(() => {
    const fetchData = async () => {
      const collections = ['labEquipment', 'meetingRooms', 'researchCenters'];
      let allResources = [];

      for (const coll of collections) {
        const querySnapshot = await getDocs(collection(db, coll));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        allResources = [...allResources, ...docs];
      }

      setResources(allResources);
      console.log(allResources)
    };

    fetchData();
  }, []);

  const handleBookingOpen = (resource) => {
    setViewedResource(resource);
    setBookingOpen(true);
  };

  // Toggle category selection
  const handleCategoryChange = (categoryKey) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryKey)
        ? prevSelected.filter((key) => key !== categoryKey) // Remove if already selected
        : [...prevSelected, categoryKey] // Add if not selected
    );
  };

  // Filter resources based on selected categories
  const filteredResources = resources.filter((resource) => {
    // Check if resource matches selected categories
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.some(
        (key) => categories[key] === resource.type
      );

    // Check if resource matches the search term (case-insensitive)
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchTerm.toLowerCase());

    // Return true if both category and search filters match
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="text-yellow-300 absolute -z-50 inset-0 h-full w-screen bg-neutral-900 bg-[radial-gradient(#e0d126_1px,transparent_1px)] [background-size:32px_32px] overflow-hidden">
      {bookingOpen ? <Booking user={user} onClose={setBookingOpen} resource={viewedResource} /> : null}
      <div className="w-screen h-screen pb-8">
        {/* Header */}
        <div className="w-full bg-neutral-950 h-12 flex text-lg justify-between items-center px-8">
          <div className="flex flex-row gap-x-3">
            <FaRegCalendarAlt className="text-3xl" />
            <h1 className="font-bold">Appointly</h1>
          </div>
          <div className="flex flex-row">
            <button>
              <IoPersonCircleOutline className="text-4xl" />
            </button>
          </div>
        </div>

        {/* Main Section */}
        <div className="w-full h-full p-12 flex flex-row md:gap-12 gap-6">
          {/* Filters Section */}
          <div className="p-4 items-center min-w-max justify-between flex flex-col w-1/4 md:h-full bg-neutral-950 border border-yellow-300 rounded-2xl shadow-lg">
            <div className="w-full h-15 text-center p-2 border-b border-yellow-300 border-opacity-25">
              <h1 className="text-3xl font-bold">Resources</h1>
            </div>

            <form className="w-full h-full p-4 items-center justify-center flex flex-col gap-12">
              <input
                type="text"
                className="bg-neutral-900 border-yellow-300 text-yellow-300 p-2 rounded-xl"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              />
              {Object.keys(categories).map((categoryKey) => (
                <div
                  key={categoryKey}
                  className="justify-between w-full flex items-center"
                >
                  <label>{categoryKey}</label>
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={selectedCategories.includes(categoryKey)}
                    onChange={() => handleCategoryChange(categoryKey)}
                  />
                </div>
              ))}
            </form>
          </div>

          {/* Resource Cards */}
          <motion.div
            layout
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              overflowY: "scroll",
            }}
            className="gap-4 w-full p-4 flex flex-wrap flex-auto items-center justify-center h-full overflow-y-scroll rounded-2xl bg-neutral-950 border border-yellow-300"
          >
            {Array.isArray(filteredResources) && filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <motion.div
                  
                  whileHover={{ scale: 1.0 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ y: 0, opacity: 0, scale: 0.95 }}
                  whileInView={{ y: 0, opacity: 1, transition: { duration: 2, type: "spring", ease: "easeInOut" } }}
                  key={index}
                  onClick={() => handleBookingOpen(resource)}
                  layout
                  transition={{ duration: 0.1, ease: "easeIn" }}
                  className="bg-neutral-900 transition-all hover:bg-neutral-800 w-32 h-48 rounded-xl border border-yellow-300 flex flex-col items-center justify-center p-2"
                >
                  <img
                    src={resource.image}
                    alt={resource.name}
                    className="w-full h-24 object-cover rounded-t-lg"
                  />
                  <h1 className="text-center text-sm font-medium mt-2">
                    {resource.name}
                  </h1>
                  <p className="text-center text-xs text-neutral-400">
                    {resource.type}
                  </p>
                </motion.div>
              ))
            ) : (
              <motion.h2 layout className="text-yellow-300 text-lg">
                No resources available.
              </motion.h2>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Resources;