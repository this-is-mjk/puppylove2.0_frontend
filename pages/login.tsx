import React, { useState } from 'react';
import styles from '../styles/login.module.css'; // Import your CSS module
import {MdEmail} from 'react-icons/md'
import {BiSolidLock} from 'react-icons/bi'
import Image from 'next/image';
import "../app/(landing)/globals.css"
// import ""



const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform authentication here, e.g., sending a request to a server
    // with the email and password for verification.

    // Reset form fields after submission
    setEmail('');
    setPassword('');
  };

  return (
    <div className={styles['login-box']}>
      <div className={styles['login-box2']}>
        <div className='login-section1'>
          <div >
          <Image
          className={styles['login-image']}
      src="/Dog.jpg"
      width={350}
      height={350}
      alt="Picture of the author"
    />
          </div>
        </div>
         <div className={styles['login-container']}>
          <h2 className={styles['login-title']}>Login</h2>
            <div className={styles['login-form-group']}>
            <MdEmail size={20}/>

              <input
                className={styles['login-input']}
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder='Email'
              />
            </div>
            <div className={styles['login-form-group']}>
              <BiSolidLock size={20}/>
              <input
                className={styles['login-input']}
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder='Password'
              />
            </div>
            <div className={styles['login-bottom']}>
            <div className={styles['login-submit-button']}>
              Register
            </div>
            <div className={styles['login-submit-button']} onSubmit={handleSubmit} >
              Login
            </div>
            </div>
            
    </div> 

      </div>
    </div>
  );
};

export default LoginPage;
