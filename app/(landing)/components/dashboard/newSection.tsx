import { useState } from 'react';
import {
  VStack,
  Heading,
  Text,
  Button,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import styles from '@/styles/dashboard.module.css';
import { IoHeartCircle } from 'react-icons/io5';
import { useData } from '../layout/dataContext';
import {
  groupedTags,
  hashStringToColor,
  announcements,
  capitalizeFirstLetter,
  iconDict,
} from '@/utils/constant';

const NewSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { addingNewTags } = useData();

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
          textAlign="start"
          lineHeight={1.5}
          p={2}
          className={`${styles.verticalText} ${isOpen ? '' : styles.verticalTextClosed}`}
          color={{ base: 'orange.400', md: 'white' }}
        >
          {addingNewTags ? 'Options ?' : "What's New?"}
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
        {addingNewTags ? (
          <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
            {Object.keys(groupedTags).map((category) => (
              <div key={category}>
                <h3
                  style={{
                    margin: '10px 0',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                  }}
                >
                  {category}
                </h3>
                <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                  {groupedTags[category].map((interest) => (
                    <Tag
                      size={'sm'}
                      key={interest}
                      variant="solid"
                      colorScheme="blue"
                      padding={1.5}
                      gap={2.5}
                      bg={hashStringToColor(interest)}
                    >
                      <TagLabel style={{ fontSize: '0.9rem' }}>
                        {capitalizeFirstLetter(interest)}
                      </TagLabel>
                      <TagLeftIcon
                        as={() =>
                          iconDict[interest.toLowerCase()] || <IoHeartCircle />
                        }
                      />
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul>
            {announcements.map((announcement, index) => (
              <div key={index} style={{ padding: '10px' }}>
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
        )}
      </VStack>
    </VStack>
  );
};

export default NewSection;
