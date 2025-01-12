import { HStack } from '@chakra-ui/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from '../../../../styles/dashboard.module.css';
import { useState } from 'react';
import ClickedStudent from '@/components/clickedstudent';
import { Student } from '@/utils/API_Calls/search';
import { Submit } from '@/utils/UserData';
import Card from '@/components/card';

const user = {
  n: 'Manas Jain Kuniya',
  i: '230626',
  a: 'Hi i love to talk, and explore new palces!! asdfasdfasdkfasdk asjdfk asdfja kasd fasdkfa sd aksjfk asdjfka',
};

const LockAndHeart = () => {
  const [expandedSection, setExpandedSection] = useState<boolean>(false);
  const [clickedStudents, setClickedStudents] = useState<Student[]>([]);
  const [hearts_submitted, set_hearts_submitted] = useState(Submit);

  const handleUnselectStudent = async (studentRoll: string) => {
    const updatedStudents = clickedStudents.filter((s) => s.i !== studentRoll);
    setClickedStudents(updatedStudents);
  };

  return (
    <HStack className={styles.topMiddleSection}>
      {/* Heart Section */}
      <div
        className={`${styles.heartBox} ${
          expandedSection ? styles.collapsed : styles.minWidth
        }`}
      >
        <DotLottieReact
          className={styles.animationIcon}
          speed={1}
          src="/heart1.lottie"
          loop
          autoplay
        />
      </div>

      {/* Lock Section */}
      <div
        className={`${styles.selectedPeople} ${
          expandedSection ? styles.expanded : ''
        }`}
        onClick={() => setExpandedSection(!expandedSection)}
      >
        {expandedSection ? (
          <div>
            {clickedStudents.length > 0 ? (
              <div>
                <ClickedStudent
                  clickedStudents={clickedStudents}
                  onUnselectStudent={handleUnselectStudent}
                  hearts_submitted={hearts_submitted}
                />
              </div>
            ) : (
              <h1 style={{ margin: 'auto' }}>no one slected</h1>
            )}
          </div>
        ) : (
          <DotLottieReact
            className={styles.animationIcon}
            speed={0.9}
            src="/lock.lottie"
            loop
            autoplay
          />
        )}
      </div>
    </HStack>
  );
};

export default LockAndHeart;
