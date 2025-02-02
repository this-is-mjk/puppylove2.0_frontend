import { useState } from 'react';
import { VStack, Box, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import styles from '../../../../styles/dashboard.module.css';
import { title } from 'process';

const announcements = [
  {
    title: 'Talk with songs!',
    body: 'This time pclub has come up with a cute feature for you all to, now you can send songs with your hearts which can be seen after matches!',
  },
  {
    title: 'Express more',
    body: 'Want to tell people your hobbies? we got you this time, you can put in any 3 hobbies along with a catchy about section!',
  },
  {
    title: 'NOTE',
    body: "It's highly recommended that you generate your recovery codes and save them as we do not store your passwords, and once your passwords are lost you cannot recover them without recovery codes.",
  },
];

const NewSection = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <VStack
      // className={`${styles.newInfo} ${isOpen ? styles.open : styles.closed}`}
      className={`${styles.newInfo} ${isOpen ? styles.open : styles.closed}`}
      height={{ md: '80vh' }}
      minH={{ md: '500px' }}
    >
      <div
        style={{
          position: 'sticky',
          display: 'flex',
          flexDirection: isOpen ? 'row' : 'column',
          gap: '10px',
          width: '100%',
        }}
      >
        <Button
          hideBelow="md"
          className={styles.toggleButton}
          onClick={toggleSidebar}
          padding={3}
          size={'lg'}
        >
          {isOpen ? <FaArrowCircleRight /> : <FaArrowCircleLeft />}
        </Button>
        <Heading
          as="h2"
          size="lg"
          textAlign="center"
          lineHeight={1.5}
          p={2}
          className={`${styles.verticalText} ${isOpen ? '' : styles.verticalTextClosed}`}
          color={{ base: 'orange.400', md: 'white' }}
        >
          What's New?
        </Heading>
      </div>

      <VStack
        justifyContent={'start'}
        display={isOpen ? 'flex' : 'none'}
        justify={'start'}
        overflow={'scroll'}
        marginTop={'10px'}
        pl={5}
      >
        <ul>
          {announcements.map((announcement, index) => (
            <div style={{ padding: '10px' }}>
              <li key={index}>
                <Heading
                  fontSize={'1.4rem'}
                  size="md"
                  color={{ base: 'orange.300', md: 'white' }}
                >
                  {announcement.title}
                </Heading>
                <Text>{announcement.body}</Text>
              </li>
            </div>
          ))}
        </ul>
      </VStack>
    </VStack>
  );
};

export default NewSection;
