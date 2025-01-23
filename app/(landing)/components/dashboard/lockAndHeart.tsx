'useClient';
import { Box, HStack } from '@chakra-ui/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from '../../../../styles/dashboard.module.css';
import { useEffect, useState } from 'react';
import ClickedStudent from '@/components/clickedstudent';
import { Student } from '@/utils/API_Calls/search';
import Hearts from '@/components/Hearts';

interface LockAndHeartProps {
  hearts_submitted: boolean;
  clickedStudents: Student[];
  setClickedStudents: Function;
}

const LockAndHeart: React.FC<LockAndHeartProps> = ({hearts_submitted, clickedStudents, setClickedStudents}) => {
  const [expandedSection, setExpandedSection] = useState<boolean>(false);
  // const [clickedStudents, setClickedStudents] = useState<Student[]>([]);
  // const [hearts_submitted, set_hearts_submitted] = useState(Submit);

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
        {/* <DotLottieReact
          className={styles.animationIcon}
          speed={1}
          src="/heart1.lottie"
          loop
          autoplay
        /> */}
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
              <Box>
                <ClickedStudent
                  clickedStudents={clickedStudents}
                  onUnselectStudent={handleUnselectStudent}
                  hearts_submitted={hearts_submitted}
                />
              </Box>
            ) : (
              <h1 style={{ margin: 'auto' }}>no one slected</h1>
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
