'useClient';
import { Box, HStack } from '@chakra-ui/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from '@/styles/dashboard.module.css';
import { useEffect, useState } from 'react';
// import ClickedStudent from '@/components/clickedstudent';
import { Student } from '@/utils/API_Calls/search';
import Hearts from '@/components/Hearts';
import Card from '@/components/card';

interface LockAndHeartProps {
  hearts_submitted: boolean;
  clickedStudents: Student[];
  setClickedStudents: Function;
  selectedSongIds: { [key: string]: string | null };
  setSelectedSongIds: Function;
}

const LockAndHeart: React.FC<LockAndHeartProps> = ({
  hearts_submitted,
  clickedStudents,
  setClickedStudents,
  selectedSongIds,
  setSelectedSongIds,
}) => {
  const [expandedSection, setExpandedSection] = useState<boolean>(false);

  const handleUnselectStudent = async (studentRoll: string) => {
    const updatedStudents = clickedStudents.filter((s) => s.i !== studentRoll);
    console.log('updatedStudents:', updatedStudents);
    setClickedStudents(updatedStudents);
  };

  // when the hearts are submitted the cards dont update showing hearts submitted.
  // so its better to close the lock section when hearts are submitted
  useEffect(() => {
    setExpandedSection(false);
  }, [hearts_submitted]);

  return (
    <HStack className={styles.topMiddleSection}>
      {/* Heart Section */}
      <Box
        className={`${styles.heartBox} ${
          expandedSection ? styles.collapsed : styles.minWidth
        }`}
      >
        <Hearts />
      </Box>

      {/* Lock Section */}
      <Box
        className={`${styles.selectedPeople} ${
          expandedSection ? styles.expanded : ''
        }`}
        onClick={() => setExpandedSection(!expandedSection)}
      >
        {expandedSection ? (
          <Box>
            {clickedStudents.length > 0 ? (
              // <ClickedStudent
              //   clickedStudents={clickedStudents}
              //   onUnselectStudent={handleUnselectStudent}
              //   hearts_submitted={hearts_submitted}
              // />
              <div className={styles.clickedStudentsContainer}>
                {clickedStudents.map((student) => (
                  <Card
                    key={student.i}
                    student={student}
                    onClick={() => handleUnselectStudent(student.i)}
                    isActive={() => true}
                    clickedCheck={true}
                    inSelectSection={true}
                    hearts_submitted={hearts_submitted}
                    setSelectedSongId={setSelectedSongIds}
                    selectedSongId={selectedSongIds[student.i]}
                  />
                ))}
              </div>
            ) : (
              <h1 style={{ margin: 'auto', width: '100%' }}>no one selected</h1>
            )}
          </Box>
        ) : (
          <DotLottieReact
            className={styles.animationIcon}
            speed={0.9}
            src="/lock.lottie"
            loop
            autoplay
          />
        )}
      </Box>
    </HStack>
  );
};

export default LockAndHeart;
