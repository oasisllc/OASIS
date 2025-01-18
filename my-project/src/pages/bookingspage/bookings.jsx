import styles from './bookings.module.css';
import { useState, useEffect } from 'react';
import { SlCalender } from "react-icons/sl";
import { GoHome } from "react-icons/go";
import { CiBookmarkCheck } from "react-icons/ci";
import { VscTools } from "react-icons/vsc";
import { FaRegShareSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { db } from '../../firebase';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineDeleteOutline } from "react-icons/md";

export function Bookings() {
    const location = useLocation();
    const user = location.state?.user;

    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [filters, setFilters] = useState({
        labEquipment: false,
        meetingRooms: false,
        researchCenters: false,
        all: true,
    });

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user) {
                console.error('User is undefined');
                return;
            }

            console.log('Fetching bookings...');
            const q = query(collection(db, 'users'), where('username', '==', user.username), where('password', '==', user.password));
            const querySnapshot = await getDocs(q);
            let bookedData = [];

            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                console.log('User data:', userData);
                if (userData.booked && Array.isArray(userData.booked)) {
                    bookedData = userData.booked;
                }
            });

            if (bookedData.length === 0) {
                setBookings([{ id: 'no-booking', resource_name: 'no booking yet' }]);
                setFilteredBookings([{ id: 'no-booking', resource_name: 'no booking yet' }]);
            } else {
                setBookings(bookedData);
                setFilteredBookings(bookedData);
            }
            console.log('Bookings:', bookedData);
        };

        fetchBookings();
    }, [user]);

    useEffect(() => {
        filterBookings();
    }, [filters, bookings]);

    const handleDelete = async (id) => {
        if (!user) {
            console.error('User is undefined');
            return;
        }

        const q = query(collection(db, 'users'), where('username', '==', user.username), where('password', '==', user.password));
        const querySnapshot = await getDocs(q);
        let userId = null;

        querySnapshot.forEach((doc) => {
            userId = doc.id;
        });

        if (userId) {
            const userRef = doc(db, 'users', userId);
            const updatedBookings = bookings.filter(booking => booking.id !== id);
            await updateDoc(userRef, { booked: updatedBookings });
            setBookings(updatedBookings);
        }
    };

    const handleFilterChange = (e) => {
        const { name, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: checked,
            all: name === 'all' ? checked : prevFilters.all,
        }));
    };

    const filterBookings = () => {
        if (filters.all) {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter(booking => {
                if (filters.labEquipment && booking.resource_type === 'labEquipment') return true;
                if (filters.meetingRooms && booking.resource_type === 'meetingRoom') return true;
                if (filters.researchCenters && booking.resource_type === 'researchCenter') return true;
                return false;
            });
            if (filtered.length === 0) {
                setFilteredBookings([{ id: 'no-booking', resource_name: 'no bookings' }]);
            } else {
                setFilteredBookings(filtered);
            }
        }
    };

    const navigate = useNavigate();

    const navAccount = () => {
        navigate('/profilepage', { state: { user: user } });
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
                        <Link to="/homepage" state={{ user }}>Home</Link>
                    </div>
                    <div className={styles.paneloptioncon}>
                        <CiBookmarkCheck className={styles.panelicon} />
                        <Link to="/bookingspage" state={{ user }}>Bookings</Link>
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
                        <a onClick={navAccount}>Account</a>
                    </div>
                    <a href="/" className={styles.signout}><span>Sign out</span></a>
                </div>
            </div>

            <div className={styles.data_points}>
                <h2>Bookings</h2>
            </div>

            <div className={styles.bookings_holder}>
                <div className={styles.opt_bar}>
                    <div className={styles.opt_bar_items}>
                        <h3>Filter by:</h3>
                        <div className={styles.filter_box}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="all"
                                    checked={filters.all}
                                    onChange={handleFilterChange}
                                />
                                All
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="labEquipment"
                                    checked={filters.labEquipment}
                                    onChange={handleFilterChange}
                                />
                                Lab Equipment
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="meetingRooms"
                                    checked={filters.meetingRooms}
                                    onChange={handleFilterChange}
                                />
                                Meeting Rooms
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="researchCenters"
                                    checked={filters.researchCenters}
                                    onChange={handleFilterChange}
                                />
                                Research Centers
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles.booked_items}>
                    {filteredBookings.map((booking) => (
                        <div key={booking.id} className={styles.item}>
                            <h4 className={styles.resource_name}>{booking.resource_name}</h4>
                            <div className={styles.item_desc}>
                                <p>{booking.description ?? "No description"}</p>
                            </div>
                            <div className={styles.item_date}>
                                <p>{booking.time_booked ?? "No date"} </p>
                            </div>

                            <div className={styles.item_date}>
                                <p>{booking.date}</p>
                            </div>

                            <button className={styles.delete_button} onClick={() => handleDelete(booking.id)}>
                                <MdOutlineDeleteOutline className={styles.delete_icon} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}