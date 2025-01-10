import { Stack, VStack, Box, HStack, Text } from '@chakra-ui/react';
import styles from '@/styles/dashboard.module.css';
import { motion } from 'framer-motion';
import { FaHeart, FaRandom, FaKey } from 'react-icons/fa';
import { MouseEventHandler } from 'react';
import React, { useState } from 'react';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';
import Clear from '@/components/clear';
const user = {
  n: 'Manas Jain Kuniya',
  i: '230626',
  a: 'Hi i love to talk, and explore new palces!! asdfasdfasdkfasdk asjdfk asdfja kasd fasdkfa sd aksjfk asdjfka',
};

interface editSection {
  initialValue: string;
  onSave: Function;
}

const EditableBox: React.FC<editSection> = ({ initialValue, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue.slice(0, 100));

  const handleSave = async () => {
    setIsEditing(false);
    if (value !== initialValue) {
      await onSave(value); // Call the backend save function
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        width: '100%',
        gap: '8px',
      }}
    >
      {isEditing ? (
        <textarea
          //   type="text"
          placeholder={value || 'Tell us more about you!!'}
          maxLength={100}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
          }}
          style={{
            width: '100%',
            border: '1px solid gray',
            borderRadius: '5px',
            padding: '4px 8px',
            fontSize: '1rem',
            flex: 1,
            backgroundColor: 'transparent',
          }}
        />
      ) : (
        <span style={{ fontSize: '1rem' }}>
          {value || 'Tell us more about you!!'}
        </span>
      )}
      {isEditing ? (
        <FaCheck
          style={{ cursor: 'pointer', color: 'green' }}
          onClick={handleSave}
        />
      ) : (
        <FaPencilAlt
          style={{ cursor: 'pointer', color: 'gray' }}
          onClick={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};

interface ActionButtonProps {
  text: string;
  icon: JSX.Element;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, icon, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        backgroundColor: 'rgb(222, 217, 217)',
        outline: 'none',
        border: 'none',
        // color: 'gray',
        /* width: 'max-content', */
        padding: '0.8rem 1.3rem',
        borderRadius: '15px',
        cursor: 'pointer',
        display: 'flex',
        gap: '1rem',
        flexDirection: 'row',
      }}
      onClick={onClick}
    >
      <span>{icon}</span>
      <Text hideBelow="md">{text}</Text>
    </motion.div>
  );
};

const ProfileSection = () => {
  return (
    <Stack
      className={styles.profileSection}
      width={{ md: '22%' }}
      minWidth={{ md: '280px' }}
    >
      <Stack
        direction={{ base: 'row', md: 'column' }}
        alignItems={{ md: 'center' }}
        style={{ margin: '1%', width: '100%' }}
      >
        <Box
          style={{
            backgroundImage: `url("https://home.iitk.ac.in/~${user?.u}/dp"), url("https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${user?.i}_0.jpg"), url("/dummy.png")`,
            width: '180px',
            height: '180px',
            minWidth: '110px',
            minHeight: '110px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '10%',
          }}
        ></Box>
        <VStack className={styles.infoSection}>
          <span>
            <span className={styles.greeting}>{'Hi,  '}</span>
            <span className={styles.name}>{user?.n}</span>
          </span>
          {/* <span className={styles.rollNumber}>{user?.i}</span> */}
          {/* <span className={styles.about}>
            {user?.a || 'Tell us more about you!!'}
          </span> */}
          <EditableBox
            initialValue={user?.a}
            onSave={() => {
              console.log('save changes');
            }}
          />
        </VStack>
      </Stack>
      {/* <p>I love</p> */}
      <HStack className={styles.intrestBox}>
        <Box className={styles.intrestChips}>talking</Box>
        <Box className={styles.intrestChips}>talking</Box>
        <Box className={styles.intrestChips}>talking</Box>
        <Box className={styles.intrestChips}> +{/* <IoIosAdd /> */}</Box>
      </HStack>
      <Box hideBelow={'md'}>
        <Clear />
      </Box>
      <Stack
        flexGrow={1}
        direction={{ base: 'row', md: 'column' }}
        className="action-section"
      >
        <ActionButton
          text={'Submit Hearts'}
          icon={<FaHeart />}
          onClick={() => {}}
        />
        <ActionButton
          text={'Random Search'}
          icon={<FaRandom />}
          onClick={() => {}}
        />
        <ActionButton
          text={'Recovery Codes'}
          icon={<FaKey />}
          onClick={() => {}}
        />
      </Stack>
    </Stack>
  );
};

export default ProfileSection;
