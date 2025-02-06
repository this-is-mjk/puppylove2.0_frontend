import React from 'react';
import '../styles/card.css';
import { Box, VStack, Text, useColorMode } from '@chakra-ui/react';
import YoutubeAudioPlayer from './YoutubeAudioPlayer';

const MatchedCard = ({ student, about,song, interestes = [] }: any) => {
  const userName = student.u;
  const roll = student.i;
  const { colorMode } = useColorMode();

  const stylesss = {
    backgroundImage: `url("https://home.iitk.ac.in/~${userName}/dp"), url("https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${roll}_0.jpg"), url("/dummy.png")`,
  };

  return (
    <VStack spacing={3} align="stretch" width="100%">

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
     
    >
      <Box borderRadius="md" style={stylesss} className="profile" />
      <VStack align="start" spacing={2} ml={4} flex="1">
        <Text fontSize="lg" fontWeight="bold">
          {student.n}
        </Text>
        <Text fontSize="sm" color="gray.300">
          {about}
        </Text>
      </VStack>
    </Box>

    {song && song !== "No song" ? (
      <YoutubeAudioPlayer youtubeUrl={`https://www.youtube.com/watch?v=${song}`} />
    ) : (
      <Text fontSize="sm" color="gray.400" >No song sent by this user</Text>
    )}
  </VStack>
  );
};

export default MatchedCard;
