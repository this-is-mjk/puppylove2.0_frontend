import React, { useState } from 'react';
import styles from '../styles/login.module.css'; 
import { MdEmail } from 'react-icons/md'
import { BiSolidLock } from 'react-icons/bi'
import { BsFillPersonFill, BsPersonVcardFill } from 'react-icons/bs'
import Image from 'next/image';
import "../app/globals.css"
import Link from 'next/link';
import { motion } from "framer-motion"
import Dog from '@/components/Dog';

const RegisterPage: React.FC = () => {
  const [data, setData] = useState({
    username: '',
    rollNo: '',
    email: '',
    password: '',
  });
  
  const [correctOtp, setCorrectOtp] = useState(false); 

  const handleLog = () => {
    console.log(data);
    setData({
      username: '',
      rollNo: '',
      email: '',
      password: '',
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleVerifyOTP = () => {
    setCorrectOtp(true);
  };

  return (
    <div className={styles['login-box']}>
      <div className={styles['login-box2']}>
        <Dog />
      
            <div className={styles['login-container']}>
          <h1 className={styles['login-title']}>Register</h1>
            {!correctOtp && (<>
                <motion.div whileHover={{ scale: 1.05 }} className={styles['login-form-group']}>
            <BsPersonVcardFill size={18} />
            <input
              className={styles['login-input']}
              type="number"
              name='rollNo'
              value={data.rollNo}
              onChange={handleSubmit}
              required
              placeholder='OTP token'
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles['login-submit-button']}>
            <button onClick={handleVerifyOTP} style={{ color: "black"}}>Verify OTP</button>
          </motion.div></>)}
          {correctOtp && (
            <>
              <motion.div whileHover={{ scale: 1.05 }} className={styles['login-form-group']}>
                <BiSolidLock size={18} />
                <input
                  className={styles['login-input']}
                  type="password"
                  name='password'
                  value={data.password}
                  onChange={handleSubmit}
                  required
                  placeholder='New Password'
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className={styles['login-form-group']}>
                <BiSolidLock size={18} />
                <input
                  className={styles['login-input']}
                  type="password"
                  name='confirmPassword'
                  value={data.password}
                  onChange={handleSubmit}
                  required
                  placeholder='Confirm New Password'
                />
              </motion.div>
              <div className={styles['login-bottom']}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles['login-submit-button']}>
                  <Link href={'/login'} style={{ color: "black"}}>Go to Login</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles['login-submit-button']} onClick={handleLog}>
                  <Link href={'/register2'} style={{ color: "black"}}>Register</Link>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
