import {
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagCloseButton,
  IconButton,
  Box,
  useToast,
  Input,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoHeartCircle } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
const SERVER_IP = process.env.SERVER_IP;

import styles from '@/styles/dashboard.module.css';
import { CloseIcon } from '@saas-ui/react';
import { Interests } from '@/utils/UserData';
import { useData } from '@/app/(landing)/components/layout/dataContext';
import { capitalizeFirstLetter, iconDict } from '@/utils/constant';
import { hashStringToColor } from '@/utils/constant';
const InterestChips = () => {
  const [interestArray, setInterestArray] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [newInterest, setNewInterest] = useState('');
  const toast = useToast();
  const { toogleAddingNewTags } = useData();

  useEffect(() => {
    // first time fetch the saved interests
    setInterestArray(Interests);
  }, [Interests]);

  const updateInterest = async (interests: string) => {
    try {
      const res = await fetch(`${SERVER_IP}/users/interests`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          interests: interests.toLowerCase(),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(`Error: ${res.status} - ${data.error}`);
        throw new Error(data.error);
      }
      toast({
        title: data.message + ' it may take some time to reflect',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      });
      return true;
    } catch (err) {
      toast({
        title: 'Some Error Occured, Try again later.',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      });
      return false;
    }
  };

  const removeInterest = async (interest: string) => {
    const newInterest = interestArray.filter((item) => item !== interest);
    const success = await updateInterest(newInterest.join(','));
    if (success) {
      setInterestArray(newInterest);
    }
  };

  const handleAddInterest = async () => {
    if (newInterest && !interestArray.includes(newInterest)) {
      const success = await updateInterest(
        [...interestArray, newInterest].join(',')
      );
      if (success) {
        setInterestArray([...interestArray, newInterest]);
        setNewInterest('');
        setShowInput(false);
        toogleAddingNewTags(false);
      }
    }
  };

  return (
    <Box className={styles.interestChips}>
      {interestArray.length == 0 && (
        <p
          style={{
            fontStyle: 'italic',
            fontSize: '0.8rem',
            padding: '0.2rem',
          }}
        >
          Add Interest
        </p>
      )}
      {interestArray.map((interest) => {
        return (
          <Tag
            size={{ base: 'md', md: 'lg' }}
            key={interest}
            variant="solid"
            colorScheme="blue"
            onClick={() => setSelectedTag(interest)}
            gap={1.5}
            bg={hashStringToColor(interest)}
          >
            <TagLabel>{capitalizeFirstLetter(interest)}</TagLabel>
            {
              <TagLeftIcon
                as={() => iconDict[interest.toLowerCase()] || <IoHeartCircle />}
              />
            }
            {selectedTag === interest && (
              <TagCloseButton onClick={() => removeInterest(interest)} />
            )}
          </Tag>
        );
      })}
      {interestArray.length < 4 && (
        <>
          <IconButton
            aria-label="add hobbies"
            colorScheme="blue"
            variant={'solid'}
            onClick={() => {
              setShowInput(!showInput);
              toogleAddingNewTags(!showInput);
            }}
          >
            {showInput ? <CloseIcon /> : <MdAdd />}
          </IconButton>
          {showInput && (
            <HStack>
              <Input
                maxLength={12}
                className={styles.interestBox}
                placeholder="Add new interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value.toLowerCase())}
              />
              <Button colorScheme="blue" onClick={handleAddInterest}>
                Add
              </Button>
            </HStack>
          )}
        </>
      )}
    </Box>
  );
};

export default InterestChips;
