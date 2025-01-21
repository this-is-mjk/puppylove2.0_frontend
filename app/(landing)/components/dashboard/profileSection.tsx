import { Stack, VStack, Box, HStack, useToast } from '@chakra-ui/react';
import styles from '@/styles/dashboard.module.css';
import { FaHeart, FaRandom } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

import React, { useState } from 'react';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';
import Clear from '@/components/clear';

import { useRouter } from 'next/router';
import { handle_Logout } from '@/utils/API_Calls/login_api';
import ActionButton from './actionButton';
import { Student } from '@/utils/API_Calls/search';
import { Textarea } from '@chakra-ui/react';

import {
  EditablePreview,
  useColorModeValue,
  IconButton,
  Input,
  useDisclosure,
  useEditableControls,
  ButtonGroup,
  SlideFade,
  Editable,
  Tooltip,
  EditableInput,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

import SetRecoveryToast from './recoveryToast';
interface profile {
  user: Student;
  SendHeart_api: Function;
}
// const EditableBox: React.FC<editSection> = ({ initialValue, onSave }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [value, setValue] = useState(initialValue.slice(0, 100));
//   const toast = useToast();

//   const handleSave = async () => {
//     setIsEditing(false);
//     if (value !== initialValue) {
//       try {
//         await onSave(value); // Call the backend save function
//         toast({
//           title: 'Saved successfully.',
//           status: 'success',
//           duration: 3000,
//           isClosable: true,
//         });
//       } catch (error) {
//         toast({
//           title: 'Error saving data.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//     }
//   };

//   return (
//     <Box display="flex"  alignItems="center" justifyContent="start" width="100%" gap="8px">
//       {isEditing ? (
//         <Textarea
//           placeholder="Tell us more about you!!"
//           maxLength={100}
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') handleSave();
//           }}
//           width="100%"
//           border="1px solid"
//           borderColor="gray.300"
//           borderRadius="md"
//           padding="4px 8px"
//           fontSize="1rem"
//           flex="1"
//           backgroundColor="transparent"
//           autoFocus
//         />
//       ) : (
//         <Box as="span" fontSize="1rem" flex="1">
//           {value || 'Tell us more about you!!'}
//         </Box>
//       )}
//       {isEditing ? (
//         <IconButton
//           aria-label="Save"
//           icon={<FaCheck />}
//           onClick={handleSave}
//           colorScheme="green"
//         />
//       ) : (
//         <IconButton
//           aria-label="Edit"
//           icon={<FaPencilAlt />}
//           onClick={() => setIsEditing(true)}
//           colorScheme="gray"
//         />
//       )}
//     </Box>
//   );
// };

// export default EditableBox;

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton
        icon={<CloseIcon boxSize={3} />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : null;
}
const ProfileSection: React.FC<profile> = ({ user, SendHeart_api }) => {
  const router = useRouter();
  const toast = useToast();

  const Logout = async () => {
    // console.log(clickedStudents)
    // await SendHeart_api(false); // why?
    const isValid = await handle_Logout();
    router.push('/').then(() => {
      window.location.reload();
    });
    if (!isValid) {
      toast({
        title: 'Some error occured while Logging Out',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } else {
      toast({
        title: 'Logged Out',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const Handle_SendHeart = async () => {
    await SendHeart_api(true);
  };

  const handleYes = async () => {
    console.log('YES');
    await Handle_SendHeart();
    toast.closeAll();
  };

  const stylesss = {
    backgroundImage: `url("https://home.iitk.ac.in/~${user?.u}/dp"), url("https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${user?.i}_0.jpg"), url("/dummy.png")`,
  };

  return (
    <Stack
      className={styles.profileSection}
      width={{ md: '22%' }}
      minWidth={{ md: '280px' }}
    >
      <Stack
        direction={{ base: 'row', md: 'column' }}
        alignItems={{ md: 'center' }}
        style={{ margin: '1%', width: '100%', flexGrow: 1 }}
      >
        <div className={styles.dp} style={stylesss}></div>
        <VStack className={styles.infoSection} alignItems={'start'} width={'100%'}>
          <span>
            {/* <span className={styles.greeting}>{'Hi,  '}</span> */}
            <span className={styles.name}>{user?.n}</span>
          </span>
          {/* <span className={styles.rollNumber}>{user?.i}</span> */}
          {/* <span className={styles.about}>
            {user?.a || 'Tell us more about you!!'}
          </span> */}
          {/* <EditableBox
            initialValue={
              // user?.a ||
              'Hi i love to talk, and explore new palces!! asdfasdfasdkfasdk asjdfk asdfja kasd fasdkfa sd aksjfk asdjfka'
            }
            onSave={() => {
              console.log('save changes');
            }}
          /> */}
          <Editable
            defaultValue={user?.a || 'Tell us more about you!!'}
            isPreviewFocusable={true}
            selectAllOnFocus={false}
          >
            <Tooltip label="Click to edit" shouldWrapChildren={true}>
              <EditablePreview
                _hover={{
                  background: useColorModeValue('#00000020', '#ffffff20'),
                }}
              />
            </Tooltip>
            <Input  as={EditableInput} />
            <EditableControls />
          </Editable>
        </VStack>
      </Stack>

      {/* use here the tag of chakra ui https://v2.chakra-ui.com/docs/components/tag/usage */}
      {/* <p>I love</p> */}
      {/* <HStack className={styles.intrestBox}>
        <Box className={styles.intrestChips}>talking</Box>
        <Box className={styles.intrestChips}>talking</Box>
        <Box className={styles.intrestChips}>talking</Box>
      </HStack> */}
      {/* <Box hideBelow={'md'}>
        <Clear />
      </Box> */}
      <Stack
        flexGrow={1}
        direction={{ base: 'row', md: 'column' }}
        className="action-section"
      >
        <ActionButton
          text={'Submit Hearts'}
          icon={<FaHeart />}
          onClick={() => {}}
        />
        <ActionButton
          text={'Random Search'}
          icon={<FaRandom />}
          onClick={() => {}}
        />
        <SetRecoveryToast />
        <ActionButton text={'LogOut'} icon={<BiLogOut />} onClick={Logout} />
      </Stack>
    </Stack>
  );
};

export default ProfileSection;
