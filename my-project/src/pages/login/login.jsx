import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = query(collection(db, "users"), where("username", "==", username), where("password", "==", password));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      navigate('/homepage', { state: { user: userData } });
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <>
      <div className={styles.login_con}>
        <div className={styles.panels}>
          <h1>Log in</h1>
          <form onSubmit={handleSubmit} className={styles.login_form} method="post">
            <div className={styles.input_group}>
              <label htmlFor="username">Username</label>
              <input 
                placeholder='Enter username' 
                type="text" 
                name="username" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="password">Password</label>
              <input 
                placeholder='Enter password' 
                type="password" 
                name="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className={styles.signup_opt}>
              <p>Don't have an account? <a href="/signuppage">Sign up</a></p>
            </div>
            <div className={styles.input_group}>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
        <div className={styles.panels}>
          <h1 className={styles.welcome}>
            Welcome <br /> Back!
          </h1>
          <p>
            Access your bookings easily today.
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;