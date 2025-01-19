import styles from './homepage.module.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion";

import { GiMaterialsScience } from "react-icons/gi";
import { MdOutlineScience } from "react-icons/md";
import { Product_search } from '../product-search/product-search';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import NavigationPanel from './NavigationPanel';

export function Homepage() {
    const location = useLocation();
    const user = location.state?.user;
    const [showNavPanel, setShowNavPanel] = useState(false);

    const [popular, setPopular] = useState([]);
    const [resource_to_book, setResourceToBook] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const collections = ['labEquipment', 'meetingRooms', 'researchCenters'];
            let allResults = [];

            for (const coll of collections) {
                const querySnapshot = await getDocs(collection(db, coll));
                const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                allResults = [...allResults, ...docs];
            }

            setPopular(allResults);
        };

        fetchData();
    }, []);

    const handleBookNow = (item) => {
        setResourceToBook(item);
        console.log(item);
    };

    const getImageSrc = (item) => {
        if (item.name.toLowerCase().includes('labequipment')) {
            return labEquipmentImg;
        } else if (item.name.toLowerCase().includes('meetingroom')) {
            return meetingRoomsImg;
        } else if (item.name.toLowerCase().includes('researchcenter')) {
            return researchCenterImg;
        } else {
            return item.img;
        }
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
          if (e.clientX < 200) {
            setShowNavPanel(true);
          } else {
            setShowNavPanel(false);
          }
        };
    
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }, []);

    return (
        <div className="w-full h-full flex p-4 bg-green-50">
            <NavigationPanel showPanel={showNavPanel} />
            <div className="ml-0 w-full">
                <div className="text-center py-8">
                    <div className="flex items-center justify-center gap-4">
                        <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity, // Infinite rotation
                          duration: 3,      // Time in seconds for one rotation
                          ease: "linear",   // Smooth continuous motion
                        }}
                        >

                        <GiMaterialsScience className="text-green-600 text-6xl" />
                        </motion.div>
                        <h2 className="text-green-800 text-6xl font-bold">
                            Welcome, {user?.username ?? "User"}
                        </h2>
                        <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                          repeat: Infinity, // Infinite rotation
                          duration: 3,      // Time in seconds for one rotation
                          ease: "linear",   // Smooth continuous motion
                        }}>

                        <MdOutlineScience className="text-green-600 text-6xl" />
                        </motion.div>
                    </div>
                    <p className="text-green-700 mt-4">
                        "Welcome to Appointly – Simplifying your scheduling, empowering your day!"
                    </p>
                    <button className="mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700">
                        Explore more
                    </button>
                </div>

                <div className=" flex justify-center w-full items-center flex-col">
                    <h3 className="text-green-800 text-2xl font-semibold">Quick Search:</h3>
                    <Product_search />
                </div>

                <div className="my-8">
                    <h3 className="text-green-800 text-2xl font-semibold mb-4">Popular Centers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popular.map((item) => (
                            <div
                                key={item.id}
                                className="border border-green-300 rounded-lg bg-white shadow-lg p-4 flex flex-col items-center"
                            >
                                <img
                                    src={getImageSrc(item)}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-full mb-4"
                                />
                                <h4 className="text-green-700 text-lg font-semibold">{item.name}</h4>
                                <div className="flex gap-2 mt-2">
                                    {item.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="text-green-600 bg-green-100 px-2 py-1 text-sm rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    className="mt-4 px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700"
                                    onClick={() => handleBookNow(item)}
                                >
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-8">
                    <h3 className="text-green-800 text-2xl font-semibold mb-4">Quick Book</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popular.map((item) => (
                            <div
                                key={item.id}
                                className="border border-green-300 rounded-lg bg-white shadow-lg p-4 flex flex-col items-center"
                            >
                                <img
                                    src={getImageSrc(item)}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-full mb-4"
                                />
                                <h4 className="text-green-700 text-lg font-semibold">{item.name}</h4>
                                <div className="flex gap-2 mt-2">
                                    {item.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="text-green-600 bg-green-100 px-2 py-1 text-sm rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    className="mt-4 px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700"
                                    onClick={() => handleBookNow(item)}
                                >
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
