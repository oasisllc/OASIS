import styles from './blogpage.module.css';
import { SlCalender } from "react-icons/sl";
import { GoHome } from "react-icons/go";
import { CiBookmarkCheck } from "react-icons/ci";
import { VscTools } from "react-icons/vsc";
import { FaRegShareSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../database';


export function Blogs() {
    const location = useLocation();
    const user = location.state?.user;

    const [blogs, setBlogs] = useState([]);
    const [allBlogs, setAllBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [newBlog, setNewBlog] = useState({
        caption: '',
        collaborators: [],
        username: user?.username || '',
        desc: '',
        img: '',
        organization: '',
        postedby: user?.username || ''
    });

    useEffect(() => {
        const fetchBlogs = async () => {
            const querySnapshot = await getDocs(collection(db, 'blogs'));
            const blogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log('Fetched Blogs:', blogsData); // Log fetched blogs
            setAllBlogs(blogsData);
            setBlogs(blogsData);
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setBlogs(allBlogs);
        } else {
            const filteredBlogs = allBlogs.filter(blog =>
                blog.postedby && blog.postedby.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
            console.log('Filtered Blogs:', filteredBlogs); // Log filtered blogs
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
        setTimeout(() => {
            setIsFocused(false);
        }, 200);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBlog(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewBlog(prevState => ({
                ...prevState,
                img: reader.result
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'blogs'), newBlog);
            setAllBlogs(prevBlogs => [...prevBlogs, newBlog]);
            setBlogs(prevBlogs => [...prevBlogs, newBlog]);
            setShowForm(false);
            setNewBlog({
                caption: '',
                collaborators: [],
                username: user?.username || '',
                desc: '',
                img: '',
                organization: '',
                postedby: user?.username || ''
            });
        } catch (error) {
            console.error('Error adding document: ', error);
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

            <div className={styles.head_con}>
                <h1>What's new?</h1>
                <p>Connect with other visionaries!</p>
            </div>

            <div className={styles.blog_main}>
                <div className={styles.uppertab}>
                    <div className={styles.searchcon}>
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
                            <div className={styles.result_box} onMouseDown={(e) => e.preventDefault()}>
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
                </div>

                <button onClick={() => setShowForm(true)} className={styles.add_blog_button}>Add Blog</button>

                <div className={styles.blogresults}>
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div key={blog.id} className={styles.blog_con}>
                                <div className={styles.user_posted}>
                                    <p className={styles.postedby}>{blog.postedby}</p>
                                </div>


                                <div className={styles.img_con}>
                                    <img src={blog.img} alt="" className={styles.img} />

                                </div>

                                <div className={styles.caption}>
                                    {blog.caption}
                                </div>
                                <div className={styles.desc_con}>
                                    <p className={styles.desc}>
                                        {blog.desc}
                                    </p>
                                </div>
                                <button className={styles.readmore}>
                                    Read more
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className={styles.noblogs}>
                            <p className={styles.noblogtext}>
                                No Blogs yet....
                            </p>
                            <button className={styles.book_button}>Create Blog</button>
                        </div>
                    )}
                </div>
            </div>

            {showForm && (
                <div className={styles.form_container}>
                    <div className={styles.exit_button} onClick={() => setShowForm(false)}>Close</div>
                    <h3>Create Post</h3>
                    <form onSubmit={handleFormSubmit} className={styles.blog_form}>
                        <div className={styles.form_content}>
                            <div>
                                <label>
                                    Caption:
                                    <input type="text" name="caption" value={newBlog.caption} onChange={handleInputChange} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Description:
                                    <textarea name="desc" value={newBlog.desc} onChange={handleInputChange}></textarea>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Organization:
                                    <input type="text" name="organization" value={newBlog.organization} onChange={handleInputChange} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Collaborators:
                                    <input type="text" name="collaborators" value={newBlog.collaborators} onChange={handleInputChange} />
                                </label>
                            </div>
                            <div className="i">
                                <label className={styles.imgupload}>
                                    <input type="file" onChange={handleImageUpload} />
                                </label>
                            </div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}