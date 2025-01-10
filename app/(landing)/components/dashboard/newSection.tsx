import { useState } from 'react';
import styles from '../../../../styles/dashboard.module.css';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

const NewSection = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles.newInfo} ${isOpen ? styles.open : styles.closed}`}
    >
      {isOpen ? (
        <>
          <h1>New Section</h1>
          <button className={styles.toggleButton} onClick={toggleSidebar}>
            <FaArrowCircleRight />
          </button>
        </>
      ) : (
        <div>
          <p className={styles.veritcalText}>New Section</p>
          <button className={styles.toggleButton} onClick={toggleSidebar}>
            <FaArrowCircleLeft />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewSection;
