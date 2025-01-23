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
  VStack,
  Button,
} from '@chakra-ui/react';
import { JSX, useEffect, useState } from 'react';
import { FaMountain, FaMusic } from 'react-icons/fa6';
import { IoHeartCircle } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
const SERVER_IP = process.env.SERVER_IP;

import styles from '@/styles/dashboard.module.css';
import { CloseIcon } from '@saas-ui/react';
import { Intrests } from '@/utils/UserData';

const IntrestChips = () => {
  const [intrestArray, setIntrestArray] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [newIntrest, setNewIntrest] = useState('');
  const toast = useToast();

  const iconDict: { [key: string]: JSX.Element } = {
    music: <FaMusic />,
    treking: <FaMountain />,
  };

  useEffect(() => {
    // first time fetch the saved intrests
    setIntrestArray(Intrests);
  }, [Intrests]);

  const updateIntrest = async (intrests: string) => {
    try {
      const res = await fetch(`${SERVER_IP}/users/intrests`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          intrests: intrests.toLowerCase(),
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
        title: data.message,
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
      }
    }
  };

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Box className={styles.intrestChips}>
      {intrestArray.map((intrest) => {
        return (
          <Tag
            size={{ base: 'md', md: 'lg' }}
            key={intrest}
            variant="solid"
            colorScheme="blue"
            onClick={() => setSelectedTag(intrest)}
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
      {intrestArray.length < 3 && (
        <>
          <IconButton
            aria-label="add hobbies"
            colorScheme="blue"
            variant={'solid'}
            onClick={() => setShowInput(!showInput)}
          >
            {showInput ? <CloseIcon /> : <MdAdd />}
          </IconButton>
          {showInput && (
            <HStack>
              <Input
                maxLength={12}
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
