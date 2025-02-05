import { Box, useToast } from '@chakra-ui/react';
import styles from '../../../../styles/dashboard.module.css';
import { useEffect, useState } from 'react';
import { search_students, Student } from '@/utils/API_Calls/search';
import { BsSearch } from 'react-icons/bs';
import { Id, Submit } from '@/utils/UserData';
import Card from '@/components/card';
import LockAndHeart from './lockAndHeart';
import { fetchAllUserInfo, getWithExpiry } from '@/utils/API_Calls/login_api';
import MatchedCard from '@/components/matched_card';

const SERVER_IP = process.env.SERVER_IP;

interface mainSection {
  clickedStudents: Student[];
  setClickedStudents: Function;
  hearts_submitted: boolean;
  set_hearts_submitted: Function;
  SendHeart_api: Function;
  isResultPage: boolean;
  matches: Student[];
  selectedSongIds: { [key: string]: string | null };
  setSelectedSongIds: Function;
  students: Student[];
  setStudents: Function;
}

const MainSection: React.FC<mainSection> = ({
  clickedStudents,
  setClickedStudents,
  hearts_submitted,
  set_hearts_submitted,
  SendHeart_api,
  isResultPage,
  matches,
  selectedSongIds,
  setSelectedSongIds,
  students,
  setStudents,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allAbout, setAllAbout] = useState<any>();
  const [allInterests, setAllInterests] = useState<any>();

  const toast = useToast();

  useEffect(() => {
    // if local strage already exits
    const localAbout = getWithExpiry('about');
    const localInterests = getWithExpiry('interests');
    if (localAbout && localInterests) {
      setAllAbout(localAbout);
      setAllInterests(localInterests);
      return;
    }
    // else fetch all user info
    const fetchInfo = async () => {
      // async function to fetch all the user info in the start and save in local stoage
      const result = await fetchAllUserInfo();
      if (result.success) {
        setAllAbout(result.about);
        setAllInterests(result.interests);
      } else {
        toast({
          title: result.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
    };
    fetchInfo();
  }, []);

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

  // on update the clickedStudents, send the hearts
  useEffect(() => {
    const updateVirtualHeart = async () => {
      // console.log(clickedStudents)
      // if (clickedStudents.length) {
      //   await SendHeart_api(false);
      // }
      await SendHeart_api(false);
    };

    if (clickedStudents.length >= 0) updateVirtualHeart();
  }, [clickedStudents, selectedSongIds]);

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

  const handleSongSelect = (studentId: string, songId: string | null) => {
    setSelectedSongIds((prev: any) => ({
      ...prev,
      [studentId]: songId,
    }));
  };

  const isActive = (id: string) => {
    return activeUsers.includes(id);
  };

  return (
    <Box
      width={{ base: '100%', md: '60%' }}
      _light={{ backgroundColor: 'rgba(141, 122, 122, 0.2)' }}
      className={styles.middleSection}
    >
      <LockAndHeart
        hearts_submitted={Submit}
        clickedStudents={clickedStudents}
        setClickedStudents={setClickedStudents}
        selectedSongIds={selectedSongIds}
        setSelectedSongIds={setSelectedSongIds}
      />
      {isResultPage ? (
        <Box className={styles.bottomMiddleSection}>
          {matches.length > 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <h1
                className={styles.searchBar}
                style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
              >
                Your Matches
              </h1>
              <div
                className={styles.studentContainer}
                style={{ width: '100%', height: '100%' }}
              >
                {matches.map((student: any) => (
                  <MatchedCard
                    key={student.i}
                    student={student}
                    about={allAbout[student.i] || ''}
                    interestes={allInterests[student.i]?.split(',')}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div
              className={styles.studentContainer}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <p>No matches to show</p>
            </div>
          )}
        </Box>
      ) : (
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
            {students.map(
              (student) =>
                student.i != Id && (
                  <Card
                    key={student._id}
                    student={student}
                    about={allAbout[student.i] || ''}
                    interestes={allInterests[student.i]?.split(',')}
                    onClick={handleButtonClick}
                    clickedCheck={clickedStudents.includes(student)}
                    isActive={isActive}
                    hearts_submitted={hearts_submitted}
                  />
                )
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MainSection;
