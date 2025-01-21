import { useState } from 'react';
import { VStack, Box, Heading, Text, Button, HStack } from '@chakra-ui/react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import styles from '../../../../styles/dashboard.module.css';

const announcements = [
  { title: 'Announcement 1', body: 'This is the body of announcement 1.' },
  { title: 'Announcement 2', body: 'This is the body of announcement 2.' },
  { title: 'Announcement 3', body: 'This is the body of announcement 3.' },
];

const colors = [
  'rgba(147, 112, 219, 0.1)',
  'rgba(255, 140, 0, 0.1)',
  'rgba(255, 215, 0, 0.1)',
  'rgba(255, 105, 180, 0.1)',
];

const NewSection = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HStack
      className={`${styles.newInfo} ${isOpen ? styles.open : styles.closed}`}
    >
      <Box height={'100%'} alignItems={'center'} justifyContent={'center'}>
        <Button hideBelow='md' className={styles.toggleButton} onClick={toggleSidebar}>
          {isOpen ? <FaArrowCircleRight /> : <FaArrowCircleLeft />}
        </Button>
      </Box>
      <VStack
        animation="slideIn 0.5s ease-in-out"
        justifyContent={'start'}
        display={isOpen ? 'flex' : 'none'}
        flexDirection={'column'}
        justify={'start'}
        height={'100%'}
        pr={4}
        pt={4}
      >
        <Heading as="h2" size="lg" textAlign="center">
          What's New?
        </Heading>
        <Box textAlign="center">
          <Text fontSize="xl">Explore Music</Text>
        </Box>
        <Box>
          {announcements.map((announcement, index) => (
            <Box
              key={index}
              p={2}
              bg={colors[index % colors.length]}
              borderRadius="md"
              mb={2}
            >
              <Heading as="h3" size="md">
                {announcement.title}
              </Heading>
              <Text>{announcement.body}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </HStack>
  );
};

export default NewSection;
