import Clear from '@/components/clear';
import ProfileSection from '@/app/(landing)/components/dashboard/profileSection';
import { Stack, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import styles from '@/styles/dashboard.module.css';

import NewSection from '@/app/(landing)/components/dashboard/newSection';
import MainSection from '@/app/(landing)/components/dashboard/mainSection';
import { url } from 'inspector';
import { useEffect, useState } from 'react';

const newDashboard = () => {
  return (
    <VStack
      className={styles.box}
      backgroundImage={useColorModeValue(
        'url(/bglight.png)', // Light theme image
        'url(/bgdark.jpg)' // Dark theme image
      )}
    >
      <Clear />
      <Stack
        direction={{ base: 'column', md: 'row' }}
        className={styles.dashboard}
      >
        <ProfileSection />
        <MainSection />
        <NewSection />
      </Stack>
      <Clear />
    </VStack>
  );
};

export default newDashboard;
