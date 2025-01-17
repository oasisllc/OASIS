import styles from './signup.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc, getDocs} from 'firebase/firestore';




function Signup() {



    // navigate to login page
    const navigate = useNavigate();

    // empty object for user
    const [user, setUser] = useState({
                                        username: '',
                                        password: '',
                                        role: ''
                                    });

    // function to handle input change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);

        // add user to database
        const addUser = async () => {
            try {
                const docRef = await addDoc(collection(db, "users"), {
                    username: user.username,
                    password: user.password,
                    role: user.role
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        // run method
        addUser();

        // navigate to login page
        navigate('/loginpage');


    }



  return(
    <>
    
        <div className={styles.signup_con}>


            <div onSubmit={handleSubmit} className={styles.panels}>
                <h1>Sign up</h1>
                <form action="" method="post">
                    <div className={styles.input_group}>
                        <label htmlFor="username">Username</label>
                        <input onChange={handleChange} placeholder='Enter username' type="text" name="username" id="username" value={user.username} />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} placeholder='Enter password' type="password" name="password" id="password" value={user.password} />
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