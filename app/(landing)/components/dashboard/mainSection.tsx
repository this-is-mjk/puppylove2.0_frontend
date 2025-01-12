import { Box, Image, useToast } from '@chakra-ui/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from '../../../../styles/dashboard.module.css';
import { useEffect, useState } from 'react';
import { search_students, Student } from '@/utils/API_Calls/search';
import { BsSearch } from 'react-icons/bs';
import { Id, receiverIds } from '@/utils/UserData';
import Card from '@/components/card';
import LockAndHeart from './lockAndHeart';
import { useRouter } from 'next/router';
import { fetchUserData } from '@/utils/API_Calls/login_api';

const MainSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newDatafetched, setNewDataFetched] = useState(false);
  const [clickedStudents, setClickedStudents] = useState<Student[]>([]);

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const fetchAndSelectStudents = () => {
      const selected: Student[] = [];
      for (let i = 0; i < 4; i++) {
        const id = receiverIds[i];
        if (id === '') {
          continue;
        }
        const data = search_students(id);
        if (data == undefined) {
          return;
        }
        const student = data[0];
        if (student) {
          selected.push(student);
        }
      }
      setClickedStudents([...clickedStudents, ...selected]);
    };
    fetchAndSelectStudents();
  }, [newDatafetched]);

  useEffect(() => {
    toast.closeAll();
    const fetchData = async () => {
      try {
        console.log('Fetching user data..., before data: ' + receiverIds);
        setIsLoading(true);
        const result = await fetchUserData();
        if (result.success) {
          // Heart Sending Period Over, Now user is doing last day login to give Confirmation for Matching or to see Results(later)
          if (!result.permit) {
            if (!result.publish) {
              router.push(`/confirmation`);
            } else {
              router.push(`/result`);
            }
          }
        } else {
          throw new Error(result.message);
        }
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        router.push('/login');
        toast({
          title: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      } finally {
        setIsLoading(false);
        setNewDataFetched(true);
      }
    };
    fetchData(); // Call the async function // select the students after the data is fetched
  }, []);

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
      <LockAndHeart />
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
