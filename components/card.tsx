import React from 'react';
import '../styles/card.css';
// import { Box, VStack } from '@chakra-ui/react';
import {
  Box,
  VStack,
  Text,
  IconButton,
  HStack,
  useColorMode,
  Tag,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { TbMusicHeart } from 'react-icons/tb';
import { capitalizeFirstLetter, iconDict } from './InterestChips';
import { IoHeartCircle } from 'react-icons/io5';
import { DeleteIcon } from '@chakra-ui/icons';

const CustomCard = ({
  student,
  onClick,
  about,
  interestes = [],
  clickedCheck,
  isActive,
  hearts_submitted,
  inSelectSection,
}: any) => {
  const { colorMode } = useColorMode();
  const userName = student.u;
  const roll = student.i;
  const registered = isActive(student.i);

  const stylesss = {
    backgroundImage: `url("https://home.iitk.ac.in/~${userName}/dp"), url("https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${roll}_0.jpg"), url("/dummy.png")`,
  };

  const isClicked = false;

  const clicked = () => {
    if (!isClicked) {
      onClick(student.i);
      clickedCheck = true;
    } else {
      alert('This student has already been clicked!');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      className="student-card"
      p={4}
      borderRadius="md"
      boxShadow="md"
      bg={'#12121260'}
      color={'#f2f2f2'}
      border="2px solid"
      borderColor={'#ffffff60'}
    >
      <Box
        borderRadius="md"
        style={stylesss}
        className={`profile ${registered ? '' : 'inactive'}`}
      />
      <VStack align="start" spacing={2} ml={4} flex="1">
        <Text fontSize="lg" fontWeight="bold">
          {student.n}
        </Text>
        {registered && (
          <Text fontSize="sm" color="gray.300">
            {about}
          </Text>
        )}
        {registered && (
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '5px',
              flexWrap: 'wrap',
            }}
          >
            {Array.isArray(interestes) &&
              interestes.map((interestTag: string) => {
                return (
                  interestTag && (
                    <Tag
                      size={'sm'}
                      key={interestTag}
                      variant="solid"
                      colorScheme="blue"
                    >
                      <TagLabel>{capitalizeFirstLetter(interestTag)}</TagLabel>
                      {
                        <TagLeftIcon
                          as={() =>
                            iconDict[interestTag.toLowerCase()] || (
                              <IoHeartCircle />
                            )
                          }
                        />
                      }
                    </Tag>
                  )
                );
              })}
          </Box>
        )}
        <HStack justify="space-between" width="100%">
          {hearts_submitted && isActive(student.i) ? (
            <Text color="green.500">Hearts Submitted</Text>
          ) : isActive(student.i) ? (
            <HStack spacing={2}>
              {!inSelectSection && (
                <IconButton
                  border="1px solid"
                  borderColor={colorMode === 'light' ? '#FFD700' : '#ffffff60'}
                  aria-label="Add to favorite"
                  onClick={clicked}
                >
                  <FaHeart color="red" />
                </IconButton>
              )}

              {/* <IconButton
                border="1px solid"
                borderColor={colorMode === 'light' ? '#FFD700' : '#ffffff60'}
                color={colorMode == 'light' ? 'green.500' : 'green.300'}
                aria-label="Add to favorite with music"
                onClick={clicked}
              >
                <TbMusicHeart />
              </IconButton> */}
              {inSelectSection && (
                <IconButton
                  border="1px solid"
                  borderColor={colorMode === 'light' ? '#FFD700' : '#ffffff60'}
                  color={'red.500'}
                  aria-label="Remove from selection"
                  onClick={clicked}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </HStack>
          ) : (
            <Text color="red.500">Not Active</Text>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default CustomCard;
