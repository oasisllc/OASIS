import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = query(
      collection(db, "users"),
      where("username", "==", username),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      navigate("/homepage", { state: { user: userData } });
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <>
    <div className="fixed inset-0 h-screen w-screen bg-green-100 bg-[radial-gradient(#0ea800_1.25px,transparent_1px)] [background-size:32px_32px] -z-10"></div>
  
      <div className="w-screen h-screen bg-green-50 bg-opacity-0">
        <div className={`${styles.login_con}  bg-green-50`}>
          <div className={styles.panels}>
            <h1 className="text-green-500 font-bold text-6xl" >Login</h1>
            <form
              onSubmit={handleSubmit}
              className={styles.login_form}
              method="post"
            >
              <div className={`${styles.input_group}`}>
                <label htmlFor="username">Username:</label>
                <input
                  placeholder="Enter username"
                  type="text"
                  name="username"
                  id="username"
                  className="w-full h-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={styles.input_group}>
                <label htmlFor="password">Password</label>
                <input
                  placeholder="Enter password"
                  type="password"
                  name="password"
                  id="password"
                  className="w-full h-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.signup_opt}>
                <p className="text-green-500 text-sm">
                  Don't have an account? <a href="/signuppage" className="text-green-600">Sign up</a>
                </p>
              </div>
              <div className={`${styles.input_group} w-full flex items-center justify-center `}>
                <button className="bg-green-400 text-green-700 w-fit rounded-md px-5 p-2" type="submit">Login</button>
              </div>
            </form>
          </div>
          <div className={`${styles.panels} justify-start p-8 bg-green-300`}>
            <h1 className={`${styles.welcome} font-bold lg:text-7xl md:text-6xl text-white`}>
              Welcome <br /> Back!
            </h1>
            <p className="text-center text-white font-bold">Access your bookings easily today.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
