import styles from './homepage.module.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SlCalender } from "react-icons/sl";
import { GoHome } from "react-icons/go";
import { CiBookmarkCheck } from "react-icons/ci";
import { VscTools } from "react-icons/vsc";
import { FaRegShareSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { GiMaterialsScience } from "react-icons/gi";
import { MdOutlineScience } from "react-icons/md";
import { Product_search } from '../product-search/product-search';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


export function Homepage() {
    const location = useLocation();
    const user = location.state?.user;

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

    let nav = useNavigate();

    const navAccount = () => {
        
        nav('/profilepage', { state: { user: user } });
    }

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

    return (
        <>
            <div className={styles.sidepanel}>
                <div className={styles.logo_con}>
                    <SlCalender className={styles.logoicon} />
                    <h1>Appointly</h1>
                </div>

                <div className={styles.user_main_options}>
                    <div className={styles.paneloptioncon}>
                        <GoHome className={styles.panelicon} />
                        <a href="">Home</a>
                    </div>
                    <div className={styles.paneloptioncon}>
                        <CiBookmarkCheck className={styles.panelicon} />
                        <a href="">Bookings</a>
                    </div>
                    <div className={styles.paneloptioncon}>
                        <VscTools className={styles.panelicon} />
                        <a href="">Resources</a>
                    </div>
                    <div className={styles.paneloptioncon}>
                        <FaRegShareSquare className={styles.panelicon} />
                        <a href="">Blogs</a>
                    </div>
                </div>

                <div className={styles.account_options}>
                    <div className={styles.paneloptioncon}>
                        <VscAccount className={styles.panelicon} />
                        <a onClick={navAccount} >Account</a>
                    </div>
                    <a href="/" className={styles.signout}><span>Sign out</span></a>
                </div>
            </div>

            <div className={styles.herowidget}>
                <div className={styles.hero_widget_items}>
                    <GiMaterialsScience className={styles.react_icon} />
                </div>
                <div className={styles.hero_widget_items}>
                    <h2 className={styles.display_name}>
                        Welcome, {user?.username ?? "User"}
                    </h2>
                    <p>
                        "Welcome to Appointly – Simplifying your scheduling, empowering your day!"
                    </p>
                    <button className={styles.explore}>
                        Explore more
                    </button>
                </div>
                <div className={styles.hero_widget_items}>
                    <MdOutlineScience className={styles.widgeticon} />
                </div>
            </div>

            <div className={styles.search_bar}>
                <h3>Quick Search: </h3><Product_search className={styles.searchbar_comp} />
            </div>

            <div className={styles.catalogcolumns}>
                <div className={styles.rows_con}>
                    <h3>Popular Centers</h3>
                    <div className={styles.row}>
                        {popular.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <img src={getImageSrc(item)} alt={item.name} className={styles.item_img} />
                                <h4>{item.name}</h4>
                                <div className={styles.tagcon}>
                                    {item.tags.map((tag, index) => (
                                        <span key={index} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                                <button className={styles.book_button} onClick={() => handleBookNow(item)}>Book Now</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.rows_con}>
                    <h3>Quick Book</h3>
                    <div className={styles.row}>
                        {popular.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <img src={getImageSrc(item)} alt={item.name} className={styles.item_img} />
                                <h4>{item.name}</h4>
                                <div className={styles.tagcon}>
                                    {item.tags.map((tag, index) => (
                                        <span key={index} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                                <button className={styles.book_button} onClick={() => handleBookNow(item)}>Book Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}