import { Box, HStack, Image } from '@chakra-ui/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from '../../../../styles/dashboard.module.css';
import { useEffect, useState } from 'react';
import { search_students, Student } from '@/utils/API_Calls/search';
import { BsSearch } from 'react-icons/bs';
import { Id } from '@/utils/UserData';
import Card from '@/components/card';

const MainSection = () => {
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
    <Box width={{ base: '100%', md: '60%' }} className={styles.middleSection}>
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
            <div className={styles.emptyImageDiv}>
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
  );
};

export default MainSection;
