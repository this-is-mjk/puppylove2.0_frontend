import React from 'react';
import '../styles/card.css';
import { Box, VStack, Text, useColorMode } from '@chakra-ui/react';

const MatchedCard = ({ student, about, interestes = [] }: any) => {
  const userName = student.u;
  const roll = student.i;
  const { colorMode } = useColorMode();

  const stylesss = {
    backgroundImage: `url("https://home.iitk.ac.in/~${userName}/dp"), url("https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${roll}_0.jpg"), url("/dummy.png")`,
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
      borderColor={'#FFD700'}
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
  );
};

export default MatchedCard;
