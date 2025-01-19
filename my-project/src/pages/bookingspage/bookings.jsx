import { useState, useEffect } from 'react';
import { SlCalender } from "react-icons/sl";
import { GoHome } from "react-icons/go";
import { CiBookmarkCheck } from "react-icons/ci";
import { VscTools, VscAccount } from "react-icons/vsc";
import { FaRegShareSquare } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { db } from '../../firebase';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavigationPanel from '../homepage/NavigationPanel';
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

            const q = query(collection(db, 'users'), where('username', '==', user.username), where('password', '==', user.password));
            const querySnapshot = await getDocs(q);
            let bookedData = [];

            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.booked && Array.isArray(userData.booked)) {
                    bookedData = userData.booked;
                }
            });

            if (bookedData.length === 0) {
                setBookings([{ id: 'no-booking', resource_name: 'No bookings yet' }]);
                setFilteredBookings([{ id: 'no-booking', resource_name: 'No bookings yet' }]);
            } else {
                setBookings(bookedData);
                setFilteredBookings(bookedData);
            }
        };

        fetchBookings();
    }, [user]);

    useEffect(() => {
        filterBookings();
    }, [filters, bookings]);

    const handleDelete = async (id) => {
        if (!user) return;

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
            setFilteredBookings(filtered.length ? filtered : [{ id: 'no-booking', resource_name: 'No bookings' }]);
        }
    };

    const navigate = useNavigate();
    const navAccount = () => navigate('/profilepage', { state: { user } });

    return (
        <div className=" bg-white flex text-green-500">
            <NavigationPanel showPanel={true}/>
            
            <main className=" ml-48 flex-1 bg-gray-100 p-6">
                <header>
                    <h2 className="text-2xl font-bold text-green-700">Bookings</h2>
                </header>
                <section className="mt-4 bg-white shadow p-4 rounded-lg">
                    <h3 className="text-lg font-bold">Filter by:</h3>
                    <div className="flex items-center space-x-4 mt-2">
                        {['all', 'labEquipment', 'meetingRooms', 'researchCenters'].map((filter) => (
                            <label key={filter} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name={filter}
                                    checked={filters[filter]}
                                    onChange={handleFilterChange}
                                    className="form-checkbox text-green-700"
                                />
                                <span>{filter}</span>
                            </label>
                        ))}
                    </div>
                </section>
                <section className="mt-6">
                    <div className="grid grid-cols-1 gap-4">
                        {filteredBookings.map((booking) => (
                            <div key={booking.id} className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
                                <div className='p-4 items-center'>
                                    <h4 className="font-bold text-base">{booking.resource_name}</h4>
                                    <p className="text-sm text-gray-600">{booking.description ?? "No description"}</p>
                                    <p className="text-sm text-gray-500">{booking.time_booked ?? "No time"} | {booking.date ?? "No date"}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(booking.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <MdOutlineDeleteOutline className="text-2xl" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
