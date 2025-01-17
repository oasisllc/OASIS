import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { useState,useEffect } from 'react';

 function Login() {
    
  return(
    <>
    
        <div className={styles.login_con}>


            <div className={styles.panels}>
                <h1>Log in</h1>
                <form action="" className={styles.login_form} method="post">
                    <div className={styles.input_group}>
                        <label htmlFor="username">Username</label>
                        <input placeholder='Enter username' type="text" name="username" id="username" />
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="password">Password</label>
                        <input placeholder='Enter password' type="password" name="password" id="password" />
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
                <p >
                Access your bookings easily today.
                </p>
            </div>
        </div>
    
    </>
  );
}

export default Login;