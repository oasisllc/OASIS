import { SlCalender } from "react-icons/sl";
import { GoHome } from "react-icons/go";
import { CiBookmarkCheck } from "react-icons/ci";
import { VscTools, VscAccount } from "react-icons/vsc";
import { FaRegShareSquare } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import NavigationPanel from "../homepage/NavigationPanel";

export function Blogs() {
  const location = useLocation();
  const user = location.state?.user;

  const [blogs, setBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newBlog, setNewBlog] = useState({
    caption: "",
    collaborators: [],
    username: user?.username || "",
    desc: "",
    img: "",
    organization: "",
    postedby: user?.username || "",
  });

  const [showNavPanel, setShowNavPanel] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAllBlogs(blogsData);
      setBlogs(blogsData);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setBlogs(allBlogs);
    } else {
      const filteredBlogs = allBlogs.filter((blog) =>
        blog.postedby?.toLowerCase().startsWith(searchTerm.toLowerCase())
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
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewBlog((prevState) => ({
        ...prevState,
        img: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "blogs"), newBlog);
      setAllBlogs((prevBlogs) => [...prevBlogs, newBlog]);
      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
      setShowForm(false);
      setNewBlog({
        caption: "",
        collaborators: [],
        username: user?.username || "",
        desc: "",
        img: "",
        organization: "",
        postedby: user?.username || "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const navigate = useNavigate();

  const navAccount = () => {
    navigate("/profilepage", { state: { user: user } });
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
    <>
      <NavigationPanel showPanel ={showNavPanel} />

      <div className="p-6 bg-green-50">
        <h1 className="text-green-800 text-4xl font-bold text-center">What's New?</h1>
        <p className="text-green-600 text-center mt-2">Connect with other visionaries!</p>
      </div>

      <div className="p-6">
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by author"
              value={searchTerm}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-full p-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-green-400"
            />
            {isFocused && (
              <div className="absolute left-0 right-0 bg-white shadow-lg mt-1 rounded-lg p-3 max-h-60 overflow-y-auto">
                {blogs.map((blog) => (
                  <div key={blog.id} className="p-2 border-b border-green-200">
                    <h3 className="text-green-700 font-semibold">{blog.postedby}</h3>
                    <p className="text-green-600 text-sm">{blog.caption}</p>
                  </div>
                ))}
                {blogs.length === 0 && searchTerm !== "" && (
                  <div className="text-center text-green-600">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end">

        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow-lg"
          >
          Add Blog
        </button>

            </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="border border-green-300 rounded-lg p-4 bg-white shadow-lg">
                <div className="text-green-800 font-bold">{blog.postedby}</div>
                <img
                  src={blog.img}
                  alt=""
                  className="w-full h-40 object-cover rounded-lg mt-2 mb-4"
                />
                <h3 className="text-green-700 font-semibold">{blog.caption}</h3>
                <p className="text-green-600 text-sm mt-2">{blog.desc}</p>
                <div className="flex justify-end">
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Read more
                </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-green-600">No Blogs yet...</div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div
              className="text-red-500 font-bold text-right cursor-pointer"
              onClick={() => setShowForm(false)}
            >
              Close
            </div>
            <h3 className="text-green-800 font-bold text-xl mb-4">Create Post</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-green-600 font-semibold mb-2">Caption:</label>
                <input
                  type="text"
                  name="caption"
                  value={newBlog.caption}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-green-600 font-semibold mb-2">Description:</label>
                <textarea
                  name="desc"
                  value={newBlog.desc}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-green-600 font-semibold mb-2">Organization:</label>
                <input
                  type="text"
                  name="organization"
                  value={newBlog.organization}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-green-600 font-semibold mb-2">Collaborators:</label>
                <input
                  type="text"
                  name="collaborators"
                  value={newBlog.collaborators}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-green-600 font-semibold mb-2">Image:</label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full p-2 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
