import styles from './signup.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    country: '',
    phone: '',
    role: '',
    img: '',
    booked: [],
    posts: []
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
          email: user.email || '',
          country: user.country || '',
          phone: user.phone || '',
          role: user.role || '',
          img: user.img || '',
          booked: [],
          posts: []
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    addUser();
    navigate('/loginpage');
  };

  return (
    <>
      <div className={styles.signup_con}>
        <div onSubmit={handleSubmit} className={styles.panels}>
          <h1>Sign up</h1>
          <form className="justify-between w-full h-full flex flex-col" action="" method="post">
            <div className={styles.input_group}>
              <label htmlFor="username">Username</label>
              <input onChange={handleChange} placeholder='Enter username' type="text" name="username" id="username" value={user.username} />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="password">Password</label>
              <input onChange={handleChange} placeholder='Enter password' type="password" name="password" id="password" value={user.password} />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="email">Email</label>
              <input onChange={handleChange} placeholder='Enter email' type="email" name="email" id="email" value={user.email} />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="country">Country</label>
              <input onChange={handleChange} placeholder='Enter country' type="text" name="country" id="country" value={user.country} />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="phone">Phone</label>
              <input onChange={handleChange} placeholder='Enter phone number' type="text" name="phone" id="phone" value={user.phone} />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="img">Profile Image URL</label>
              <input onChange={handleChange} placeholder='Enter image URL' type="text" name="img" id="img" value={user.img} />
            </div>
            <div className={styles.input_group}>
              <select onChange={handleChange} name="role" id="roles-select" value={user.role}>
                <option value="None">Role</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div className={styles.login_opt}>
              <p>Already have an account? <a href="/loginpage">Login</a></p>
            </div>
            <div className={styles.input_group}>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
        <div className={styles.panels}>
          <h1 className={styles.welcome}>
            Create <br /> Your <br /> Account
          </h1>
        </div>
      </div>
    </>
  );
}

export default Signup;