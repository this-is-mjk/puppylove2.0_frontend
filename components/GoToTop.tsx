import React, { useEffect, useState } from 'react';
import styles from '../styles/login.module.css';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const GoToTop = () => {
  const clickHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  const [visible, setVisible] = useState(false);

  const scrollHandler = () => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  };

  useEffect(() => {
    scrollHandler();
  }, []);

  return (
    <div>
      {visible && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className={styles['go-to-top']}
        >
          <motion.div
            animate={{ y: [-3, 0, 3, 3, 0, -3] }}
            transition={{ repeat: Infinity, duration: 4 }}
            onClick={clickHandler}
          >
            <FaArrowUp />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default GoToTop;
