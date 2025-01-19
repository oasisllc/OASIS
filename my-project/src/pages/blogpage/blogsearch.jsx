import { useState, useEffect } from 'react';
import { db } from '../database';
import { collection, getDocs } from 'firebase/firestore';
import styles from './blogpage.module.css';

export function BlogSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [allBlogs, setAllBlogs] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            const querySnapshot = await getDocs(collection(db, 'blogs'));
            const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllBlogs(blogsData);
            setBlogs(blogsData);
        };

        fetchAllBlogs();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setBlogs(allBlogs);
        } else {
            const filteredBlogs = allBlogs.filter(blog =>
                blog.postedby.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
            setBlogs(filteredBlogs);
        }
    }, [searchTerm, allBlogs]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className={styles.search_container}>
            <input
                type="text"
                placeholder="Search by author"
                value={searchTerm}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={styles.searchbar}
            />
            {isFocused && (
                <div className={styles.result_box}>
                    {blogs.map((blog) => (
                        <div key={blog.id} className={styles.result}>
                            <h3>{blog.postedby}</h3>
                            <p>{blog.caption}</p>
                        </div>
                    ))}
                    {blogs.length === 0 && searchTerm !== '' && (
                        <div className={styles.result}>
                            <h3>No results found</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}