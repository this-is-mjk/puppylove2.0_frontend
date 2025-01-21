import {
  Button,
  Box,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { BiSolidLock } from 'react-icons/bi';
import { generateRecoveryCode, setUpRecoveryCode } from '@/utils/recoverCode';
import { Id } from '@/utils/UserData';
import { FaKey, FaRegCopy } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import styles from '../../../../styles/login.module.css';
import { IoEye, IoKey } from 'react-icons/io5';
import ActionButton from './actionButton';

const SetRecoveryModal = () => {
  const [rCode, setRCode] = useState('');
  const [password, setPassword] = useState('');
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Show/hide password toggle
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal controls
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      setRCode(generateRecoveryCode(Id));
    }
  }, [isOpen]);

  const showCode = () => {
    setIsVisible(!isVisible);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rCode);
    toast({
      title: 'Recovery code copied to clipboard!',
      status: 'success',
      duration: 1000,
      position: 'top-right',
      isClosable: true,
    });
  };

  const showPass = () => {
    setIsVisiblePass(!isVisiblePass);
  };

  const fetchAddRecoveryCode = async (password: string) => {
    if (password === '') {
      toast({
        position: 'top-right',
        title: 'Please fill password',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    const res = await setUpRecoveryCode(password, rCode);
    console.log(res);
    toast({
      title: res.message,
      status: res.success ? 'success' : 'error',
      position: 'top-right',
      duration: 1000,
      isClosable: true,
    });
    if (res.success) {
      onClose(); // Close modal on success
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <ActionButton
          text={'Recovery Codes'}
          icon={<FaKey />}
          onClick={onOpen} 
        />
      {/* <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={styles['heart-submit-button']}
        onClick={onOpen} // Trigger toast only on click
        style={{ color: 'white' }}
      >
        Set Recovery
      </motion.div> */}

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recovery Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{ color: 'black' }}>
            <Box mb={4}>
              <p style={{ fontWeight: 'bold', color: 'white' }}>
                This is your recovery code. Please save it securely as this is
                the first and last time you can see it.
              </p>
              <div
                className={styles['login-form-group']}
                style={{ marginTop: '8px' }}
              >
                <IoKey size={18} />
                <Input
                  className={styles['login-input']}
                  type={isVisible ? 'text' : 'password'}
                  value={rCode}
                  readOnly
                  isReadOnly // two time, doubt?
                />
                <FaRegCopy
                  size={18}
                  onClick={handleCopy}
                  style={{ cursor: 'pointer', marginLeft: '8px' }}
                />
                <IoEye size={18} onClick={showCode} />
              </div>
            </Box>
            <Box>
              <p style={{ color: 'white' }}>Please enter your password:</p>
              <div
                className={styles['login-form-group']}
                style={{ marginTop: '8px' }}
              >
                <BiSolidLock size={18} />
                <Input
                  className={styles['login-input']}
                  type={isVisiblePass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <IoEye size={18} onClick={showPass} />
              </div>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="pink"
              ml={2}
              onClick={() => {
                fetchAddRecoveryCode(password);
              }}
            >
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SetRecoveryModal;
