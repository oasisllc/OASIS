import styles from "./signup.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { motion } from "framer-motion";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    country: "",
    phone: "",
    role: "",
    img: "",
    booked: [],
    posts: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);

    const addUser = async () => {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          username: user.username,
          password: user.password,
          email: user.email || "",
          country: user.country || "",
          phone: user.phone || "",
          role: user.role || "",
          img: user.img || "",
          booked: [],
          posts: [],
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    addUser();
    navigate("/loginpage");
  };

  return (
    <>
      <div className="fixed inset-0 h-screen w-screen bg-green-100 bg-[radial-gradient(#0ea800_1.25px,transparent_1px)] [background-size:32px_32px] -z-10"></div>

      <div className="w-screen h-screen items-center flex justify-center p-24  shadow-2xl ">
        <motion.div
        initial= {{ y:200, opacity: 0}}
        animate = {{ y:0, opacity: 1}}
        transition={{duration: 1, delay:0.5, ease: "easeInOut", type: "spring"}}
          className={`${styles.signup_con} w-full flex-row-reverse flex shadow-green-900 shadow-2xl bg-opacity-0 bg-green-50`}
        >
          <motion.div
            
            onSubmit={handleSubmit}
            className={`${styles.panels} bg-white w-1/2 flex justify-center items-center flex-col p-8 gap-4`}
          >
            <h1 className="text-3xl text-green-500 font-bold">Sign up</h1>
            <form
              className=" rounded-2xl   p-4 overflow-y-scroll justify-start items-center w-full h-full flex flex-col gap-2 text-sm"
              action=""
              method="post"
            >
              <div className="lg:w-1/2 w-full font-bold flex flex-col text-green-500">
                <label htmlFor="username">Username:</label>
                <input
                  className=" font-normal border-green-500 border-2 p-2 text-green-500 w-full h-10 rounded-md"
                  onChange={handleChange}
                  placeholder="Enter username"
                  type="text"
                  name="username"
                  id="username"
                  value={user.username}
                />
              </div>
              <div className="lg:w-1/2 w-full font-bold flex flex-col text-green-500">
                <label htmlFor="password">Password</label>
                <input
                  className="border-green-500  border-2 p-2 text-green-500 w-full h-10 rounded-md"
                  onChange={handleChange}
                  placeholder="Enter password"
                  type="password"
                  name="password"
                  id="password"
                  value={user.password}
                />
              </div>

              <div className="lg:w-1/2 w-full text-green-500 font-bold flex flex-col">
                <label htmlFor="password">Role</label>

                <select
                  className=" h-10 font-normal rounded-md p-2 border-green-500 border-2 "
                  onChange={handleChange}
                  name="role"
                  id="roles-select"
                  value={user.role}
                >
                  <option value="None">Role</option>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            </form>
            <div className="text-green-500">
              <p className="text-gray-500">
                Already have an account?{" "}
                <a className="text-green-500 font-bold" href="/loginpage">
                  Login
                </a>
              </p>
            </div>
            <div className="w-full font-bold flex flex-col text-white items-center justify-center">
              <button
                className="bg-green-500 rounded-md px-4 p-2 w-fit"
                type="submit"
              >
                Register
              </button>
            </div>
          </motion.div>
          <div className="roun bg-green-400 flex w-1/2 justify-center items-center ">
            <h1 className="lg:text-7xl flex justify-end items-end text-nowrap md:text-6xl text-5xl text-center font-extrabold   text-white">
              Create <br /> Your <br /> Account!
            </h1>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Signup;
