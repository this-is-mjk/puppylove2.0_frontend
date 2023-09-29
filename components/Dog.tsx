import React from 'react'
import styles from '../styles/login.module.css'; // Import your CSS module
import Image from 'next/image';
import {motion} from "framer-motion"


const Dog = () => {
  return (
    
        <div className='login-section1'>
          <motion.div whileHover={{scale:1.08}} >
          <Image
          className={styles['login-image']}
          src="/Dog.jpg"
          width={350}
          height={350}
          alt="PuppyLove"
    />
          </motion.div>
        </div>
      
  )
}

export default Dog
