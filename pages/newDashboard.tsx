import Clear from '@/components/clear';
import ProfileSection from '@/app/(landing)/components/dashboard/profileSection';
import { Stack, VStack, Box, HStack, Image } from '@chakra-ui/react';
import styles from '@/styles/dashboard.module.css';
import Hearts from '@/components/Hearts';
import Card from '@/components/card';
import { BsSearch } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { search_students, Student } from '@/utils/API_Calls/search';
import { Id } from '@/utils/UserData';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const newDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);

  useEffect(() => {
    fetchStudents();
  }, [searchQuery]);

  const isActive = (id: string) => {
    return activeUsers.includes(id);
  };

  const fetchStudents = () => {
    if (searchQuery === '') {
      setStudents([]);
      return;
    }
    const studentData = search_students(searchQuery);
    if (studentData == undefined) {
      // console.log("Not able to Fetch Students");
      return;
    }
    setStudents(studentData);
  };

  return (
    <VStack className={styles.box}>
      <Clear />
      <Stack
        direction={{ base: 'column', md: 'row' }}
        className={styles.dashboard}
      >
        <ProfileSection />
        <Box
          width={{ base: '100%', md: '60%' }}
          className={styles.middleSection}
        >
          <HStack className={styles.topMiddleSection}>
            <div className={styles.heartBox}>
              <DotLottieReact
                className={styles.animationIcon}
                speed={1}
                src="/heart1.lottie"
                loop
                autoplay
              />
            </div>
            <div className={styles.selectedPeople}>
              <DotLottieReact
                className={styles.animationIcon}
                speed={0.9}
                src="/lock.lottie"
                loop
                autoplay
              />
            </div>
          </HStack>
          <div className={styles.bottomMiddleSection}>
            <div className={styles.searchDiv}>
              <BsSearch size={20} />
              <input
                type="text"
                className={styles.searchBar}
                placeholder="Enter Name To Search."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.studentContainer}>
              {students.length == 0 && (
                <div>
                  <Image
                    src={'/dashboard.jpeg'}
                    alt="Logo"
                    width={200}
                    height={200}
                  />
                </div>
              )}

              {students.map(
                (student) =>
                  student.i != Id && (
                    <Card
                      key={student._id}
                      student={student}
                      // onClick={handleButtonClick}
                      // clickedCheck={clickedStudents.includes(student)}
                      isActive={isActive}
                      // hearts_submitted={hearts_submitted}
                    />
                  )
              )}
            </div>
          </div>
        </Box>
        <Stack hideBelow="md" className={styles.newInfo}>
          <h1>new section</h1>
        </Stack>
      </Stack>
      <Clear />
    </VStack>
  );
};

export default newDashboard;
