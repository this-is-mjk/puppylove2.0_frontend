import React, { useState } from 'react';
import styles from '../styles/login.module.css'; // Import your CSS module
import { MdEmail } from 'react-icons/md'
import { BiSolidLock } from 'react-icons/bi'
import { BsFillPersonFill, BsPersonVcardFill } from 'react-icons/bs'
import Image from 'next/image';
import "../app/globals.css"
import Link from 'next/link';
import { motion } from "framer-motion"
import Dog from '@/components/Dog';
// import ""



const RegisterPage: React.FC = () => {
  const [data, setData] = useState({ username: "", rollNo: "", email: "", password: "" });


  const handleLog = () => {
    console.log(data);
    setData({ username: "", rollNo: "", email: "", password: "" });
    console.log(data);

  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  return (
    <div className={styles['login-box']}>
      <div className={styles['login-box2']}>
        <Dog />
        <div className={styles['login-container']}>
          <h1 className={styles['login-title']}>Register</h1>
          <motion.div whileHover={{ scale: 1.05 }} className={styles['login-form-group']}>
            <BsFillPersonFill size={18} />

            <input
              className={styles['login-input']}
              type="text"
              name='username'
              value={data.username}
              onChange={handleSubmit}
              required
              placeholder='UserName'
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className={styles['login-form-group']}>
            <BsPersonVcardFill size={18} />

            <input
              className={styles['login-input']}
              type="number"
              name='rollNo'
              value={data.rollNo}
              onChange={handleSubmit}
              required
              placeholder='Roll No.'
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className={styles['login-form-group']}>
            <MdEmail size={18} />

            <input
              className={styles['login-input']}
              type="email"
              name='email'
              value={data.email}
              onChange={handleSubmit}
              required
              placeholder='Email'
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className={styles['login-form-group']}>
            <BiSolidLock size={18} />
            <input
              className={styles['login-input']}
              type="password"
              name='password'
              value={data.password}
              onChange={handleSubmit}
              required
              placeholder='Password'
            />
          </motion.div>
          <div className={styles['login-bottom']}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles['login-submit-button']} >
              <Link href={"/login"}>
                Login
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles['login-submit-button']} onClick={handleLog} >
              Register
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
