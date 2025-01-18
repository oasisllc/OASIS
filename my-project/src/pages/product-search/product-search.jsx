import styles from './product-search.module.css';
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

export function Product_search() {
    const [result, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const collections = ['labEquipment', 'meetingRooms', 'researchCenters'];
            let allResults = [];

            for (const coll of collections) {
                const querySnapshot = await getDocs(collection(db, coll));
                const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                allResults = [...allResults, ...docs];
            }

            if (allResults.length === 0) {
                setResults([{ id: 'no-results', name: 'no results' }]);
                setFilteredResults([{ id: 'no-results', name: 'no results' }]);
            } else {
                setResults(allResults);
                setFilteredResults(allResults);
            }
        };

        fetchData();
    }, []);

    const handleFocus = () => {
        if (result.length === 0) {
            setFilteredResults([{ id: 'no-results', name: 'no results' }]);
        } else {
            setFilteredResults(result);
        }
    };

    const handlechange = (e) => {
        const search = e.target.value.toLowerCase();
        if (search === "") {
            setFilteredResults(result);
        } else {
            const filtered = result.filter(res => res.name.toLowerCase().startsWith(search));
            if (filtered.length === 0) {
                setFilteredResults([{ id: 'no-results', name: 'no results' }]);
            } else {
                setFilteredResults(filtered);
            }
        }
    };

    return (
        <div className={styles.search_container}>
            <input onFocus={handleFocus} onChange={handlechange} className={styles.searchbar} type="text" placeholder="Search for resources" />
            <div className={styles.result_box}>
                {filteredResults.map((res) => (
                    <div key={res.id} className={styles.result}>
                        {res.id !== 'no-results' && (
                            <div className={styles.result_img_con}>
                                <img src={res.img} alt="" />
                            </div>
                        )}
                        <h3>{res.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )

}