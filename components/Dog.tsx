import React, { useState } from 'react';
import styles from '../styles/login.module.css'; // Import your CSS module
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

const Dog = () => {
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();
  const rotateImage = () => {
    const randomDegree = Math.floor(Math.random() * 40) + 10;
    const newRotation =
      rotation + randomDegree * (Math.random() > 0.5 ? 1 : -1);
    setRotation(newRotation);

    controls.start({
      rotate: newRotation,
      scale: 1.1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    });
    controls.start({
      scale: 1,
      transition: { duration: 0.2, ease: 'easeInOut' },
    });
  };
  return (
    <div className="login-section1">
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 1.01 }}
        animate={controls}
        onClick={rotateImage}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <Image
          className={styles['login-image']}
          src="/PuppyLove-logo.png"
          width={350}
          height={350}
          alt="PuppyLove"
        />
      </motion.div>
    </div>
  );
};

export default Dog;
