import { Stack, VStack, Box, HStack, Text, useToast } from '@chakra-ui/react';
import styles from '@/styles/dashboard.module.css';
import { motion } from 'framer-motion';
import { FaHeart, FaRandom, FaKey } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { MouseEventHandler, useEffect } from 'react';
import React, { useState } from 'react';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';
import Clear from '@/components/clear';
import { Id, setUser, user } from '@/utils/UserData';
import { search_students } from '@/utils/API_Calls/search';
import { useRouter } from 'next/router';
import { handle_Logout } from '@/utils/API_Calls/login_api';
import ActionButton from './actionButton';
// const user = {
//   n: 'Manas Jain Kuniya',
//   i: '230626',
//   a: 'Hi i love to talk, and explore new palces!! asdfasdfasdkfasdk asjdfk asdfja kasd fasdkfa sd aksjfk asdjfka',
// };

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

const ProfileSection = () => {
  useEffect(() => {
    if (Id != '') {
      setUser(search_students(Id)[0]);
    }
    console.log(Id); 
  }, [Id]);

  const Logout = async () => {
    // console.log(clickedStudents)

    const router = useRouter();
    const toast = useToast();

    // await SendHeart_api(false); // why?
    const isValid = await handle_Logout();
    router.push('/').then(() => {
      window.location.reload();
    });
    if (!isValid) {
      toast({
        title: 'Some error occured while Logging Out',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } else {
      toast({
        title: 'Logged Out',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

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
            initialValue={
              // user?.a ||
              'Hi i love to talk, and explore new palces!! asdfasdfasdkfasdk asjdfk asdfja kasd fasdkfa sd aksjfk asdjfka'
            }
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
        <ActionButton
          text={'LogOut'}
          icon={<BiLogOut />}
          onClick={() => {
            Logout();
          }}
        />
      </Stack>
    </Stack>
  );
};

export default ProfileSection;
