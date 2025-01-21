import { Box, Image, useToast, Input } from '@chakra-ui/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from '../../../../styles/dashboard.module.css';
import { useEffect, useState } from 'react';
import { search_students, Student } from '@/utils/API_Calls/search';
import { BsSearch } from 'react-icons/bs';
import { Id, receiverIds, setUser, Submit } from '@/utils/UserData';
import Card from '@/components/card';
import LockAndHeart from './lockAndHeart';
import { useRouter } from 'next/router';
import { fetchUserData } from '@/utils/API_Calls/login_api';
import { SendHeart } from '@/utils/API_Calls/Send_Heart';

const SERVER_IP = process.env.SERVER_IP;

const MainSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hearts_submitted, set_hearts_submitted] = useState(Submit);
  const [students, setStudents] = useState<Student[]>([]);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newDatafetched, setNewDataFetched] = useState(false);
  const [clickedStudents, setClickedStudents] = useState<Student[]>([]);

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    set_hearts_submitted(Submit);
  }, [Submit]);

  useEffect(() => {
    fetchStudents();
  }, [searchQuery]);

  // select button click
  const handleButtonClick = async (studentRoll: string) => {
    if (clickedStudents.length >= 4) {
      toast({
        title: 'You cannot select more than 4 students',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const student = students.find((s) => s.i === studentRoll);

    if (student && !clickedStudents.find((s) => s.i === studentRoll)) {
      setClickedStudents([...clickedStudents, student]);
    } else {
      toast({
        title: 'This student has already been clicked!',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
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

  const SendHeart_api = async (Submit: boolean) => {
    if (hearts_submitted) {
      return;
    }
    if (Submit) {
      set_hearts_submitted(true);
    }
    for (let j = 0; j < clickedStudents.length; j++) {
      const id: string = clickedStudents[j].i;
      receiverIds[j] = id;
    }
    for (let j = clickedStudents.length; j < 4; j++) {
      receiverIds[j] = '';
    }
    const isValid = await SendHeart(Id, receiverIds, Submit);
    if (isValid && Submit) {
      toast({
        title: 'HEARTS SENT',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } else if (!isValid && Submit) {
      toast({
        title: 'Error occurred , Hearts not sent',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } else if (!isValid && !Submit) {
      toast({
        title: 'Choices not saved',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  // Fetch all active users
  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const res = await fetch(`${SERVER_IP}/users/activeusers`, {
          method: 'GET',
          credentials: 'include', // For CORS
        });
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status} - ${res.statusText}`);
        }
        const active = await res.json();
        setActiveUsers(active.users);
      } catch (err) {
        // Cannot fetch Active users
        console.log(err);
      }
    };

    fetchActiveUsers();
  }, []);

  const isActive = (id: string) => {
    return activeUsers.includes(id);
  };

  return (
    <Box width={{ base: '100%', md: '60%' }} _light={{backgroundColor: 'rgba(141, 122, 122, 0.2)'}} className={styles.middleSection}>
      <LockAndHeart
        hearts_submitted={Submit}
        clickedStudents={clickedStudents}
        setClickedStudents={setClickedStudents}
      />
      <Box className={styles.bottomMiddleSection}>
        <Box className={styles.searchDiv}>
          <BsSearch size={20} />
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Enter Name To Search."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <Box className={styles.studentContainer}>
          {/* {students.length == 0 && (
            <Box className={styles.emptyImageDiv}>
              <Image
              src={'/dashboard.jpeg'}
              alt="Logo"
              width={200}
              height={200}
              />
            </Box>
          )} */}

          {students.map(
            (student) =>
              student.i != Id && (
                <Card
                  key={student._id}
                  student={student}
                  onClick={handleButtonClick}
                  clickedCheck={clickedStudents.includes(student)}
                  isActive={isActive}
                  hearts_submitted={hearts_submitted}
                />
              )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MainSection;
