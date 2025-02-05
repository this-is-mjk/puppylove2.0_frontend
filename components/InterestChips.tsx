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
const IntrestChips = () => {
  const [intrestArray, setIntrestArray] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [newIntrest, setNewIntrest] = useState('');
  const toast = useToast();
  const { toogleAddingNewTags } = useData();

  useEffect(() => {
    // first time fetch the saved interests
    setIntrestArray(Interests);
  }, [Interests]);

  const updateIntrest = async (intrests: string) => {
    try {
      const res = await fetch(`${SERVER_IP}/users/interests`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          interests: intrests.toLowerCase(),
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

  const removeIntrest = async (intrest: string) => {
    const newIntrest = intrestArray.filter((item) => item !== intrest);
    const success = await updateIntrest(newIntrest.join(','));
    if (success) {
      setIntrestArray(newIntrest);
    }
  };

  const handleAddIntrest = async () => {
    if (newIntrest && !intrestArray.includes(newIntrest)) {
      const success = await updateIntrest(
        [...intrestArray, newIntrest].join(',')
      );
      if (success) {
        setIntrestArray([...intrestArray, newIntrest]);
        setNewIntrest('');
        setShowInput(false);
        toogleAddingNewTags(false);
      }
    }
  };

  return (
    <Box className={styles.interestChips}>
      {intrestArray.length == 0 && (
        <p
          style={{
            fontStyle: 'italic',
            fontSize: '0.8rem',
            padding: '0.2rem',
          }}
        >
          Add Intrest
        </p>
      )}
      {intrestArray.map((intrest) => {
        return (
          <Tag
            size={{ base: 'md', md: 'lg' }}
            key={intrest}
            variant="solid"
            colorScheme="blue"
            onClick={() => setSelectedTag(intrest)}
            gap={1.5}
            bg={hashStringToColor(intrest)}
          >
            <TagLabel>{capitalizeFirstLetter(intrest)}</TagLabel>
            {
              <TagLeftIcon
                as={() => iconDict[intrest.toLowerCase()] || <IoHeartCircle />}
              />
            }
            {selectedTag === intrest && (
              <TagCloseButton onClick={() => removeIntrest(intrest)} />
            )}
          </Tag>
        );
      })}
      {intrestArray.length < 4 && (
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
                value={newIntrest}
                onChange={(e) => setNewIntrest(e.target.value.toLowerCase())}
              />
              <Button colorScheme="blue" onClick={handleAddIntrest}>
                Add
              </Button>
            </HStack>
          )}
        </>
      )}
    </Box>
  );
};

export default IntrestChips;
