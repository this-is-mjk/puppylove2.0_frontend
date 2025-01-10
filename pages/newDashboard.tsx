import Clear from '@/components/clear';
import ProfileSection from '@/app/(landing)/components/dashboard/profileSection';
import { Stack, VStack } from '@chakra-ui/react';
import styles from '@/styles/dashboard.module.css';

import NewSection from '@/app/(landing)/components/dashboard/newSection';
import MainSection from '@/app/(landing)/components/dashboard/mainSection';

const newDashboard = () => {
  return (
    <VStack className={styles.box}>
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
