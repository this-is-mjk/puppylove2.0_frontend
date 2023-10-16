import React, { useState, useEffect } from 'react';
import styles from '../styles/login.module.css'; 
import { MdEmail } from 'react-icons/md'
import { BiSolidLock } from 'react-icons/bi'
import { BsFillPersonFill, BsPersonVcardFill } from 'react-icons/bs'
import Image from 'next/image';
import "../app/globals.css"
import Link from 'next/link';
import { motion } from "framer-motion"
import Dog from '@/components/Dog';
import { useRouter } from 'next/router';
import {handleVerifyOTP} from "../utils/API_Calls/verify_api";

const VerifyPage: React.FC = () => {
  const [input_OTP, setOTP] = useState ("")

  const [data, setData] = useState({
    confirmPassword: '',
    password: '',
  });

  const router = useRouter()

  const handleOTP =(e: any)=>{
    e.preventDefault()
    setOTP(e.target.value)
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleVerifyOTP_api = async () => {
    const id = router.query    
    if(id === null) {
      return
    }
    if(data.password !== data.confirmPassword) {
      // RENTER PASSWORD
      return
    }

    const user = {id: id, pass: data.password, auth: input_OTP}
    const isValid = await handleVerifyOTP(user)

    if(isValid) {
      router.push("/login")
    }
    else{
      // NOT VEREFIED
    }

  };

  return (
    <div>
    <div className={styles['login-box']}>
      <div className={styles['login-box2']}>
        <Dog />
      
            <div className={styles['login-container']}>
          <h1 className={styles['login-title']}>Register</h1>
          {(
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
                  value={data.confirmPassword}
                  onChange={handleSubmit}
                  required
                  placeholder='Confirm New Password'
                />
              </motion.div>
            </>
          )}
            {(<>
                <motion.div whileHover={{ scale: 1.05 }} className={styles['login-form-group']}>
            <BsPersonVcardFill size={18} />
            <input
              className={styles['login-input']}
              type="string"
              name='rollNo'
              // value={data.rollNo}
              onChange={handleOTP}
              required
              placeholder='OTP token'
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles['login-submit-button']}>
            <button onClick={handleVerifyOTP_api} style={{ color: "black"}}>Verify OTP</button>
          </motion.div></>)}
        </div>
        <Link href={'/'} className={styles["close-button"]}>
          &times;
        </Link>
      </div>
    </div>
    </div>
  );
};

export default VerifyPage; 