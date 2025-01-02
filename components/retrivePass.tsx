import {
  Button,
  Input,
  List,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import styles from '../styles/login.module.css';
import { IoEye, IoKey } from 'react-icons/io5';
import { color } from 'framer-motion';
import { getRecoveryCode } from '@/utils/recoverCode';
import { Decryption_AES } from '@/utils/Encryption';
import { FaRegCopy } from 'react-icons/fa';

interface RetrivePassButtonProps {
  id: string; // Expecting a string
}

const RetrivePassButton: React.FC<RetrivePassButtonProps> = ({ id }) => {
  const [rCode, setRCode] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false); // Show/hide password toggle
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal controls
  const toast = useToast();

  const openModel = () => {
    if (id === '') {
      toast({
        title: 'Please fill the ID',
        status: 'error',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
      return;
    } else {
      onOpen();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setPassword('');
    toast({
      title: 'Password copied to clipboard!',
      status: 'success',
      duration: 1000,
      position: 'top-right',
      isClosable: true,
    });
    onClose();
  };

  const retrivePass = async () => {
    if (rCode === '') {
      toast({
        title: 'Please fill the Recovery Code',
        status: 'error',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    const result = await getRecoveryCode(id);
    if (result.success) {
      const password = await Decryption_AES(result.pass, rCode);
      if (password === '') {
        toast({
          title: 'Invalid Recovery Code',
          status: 'error',
          position: 'top-right',
          duration: 1000,
          isClosable: true,
        });
        return;
      }
      setPassword(password);
      toast({
        title: 'Password Retrived Successfully',
        status: 'success',
        duration: 1000,
        position: 'top-right',
        isClosable: true,
      });
    } else {
      toast({
        title: result.message,
        status: 'error',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          fontSize: '0.8rem',
          color: 'blue',
          paddingRight: '1.5rem',
          marginTop: '-0.5rem',
        }}
      >
        <button onClick={openModel}>Retrive Password</button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Retrive Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{ color: 'black' }}>
            {/* <p style={{ fontWeight: 'bold', color: 'white' }}>
              Please enter your recovery code:
            </p> */}
            <div
              className={styles['login-form-group']}
              style={{ marginTop: '8px' }}
            >
              <IoKey size={18} />
              <Input
                className={styles['login-input']}
                type={isVisible ? 'text' : 'password'}
                placeholder="Recovery Code"
                onChange={(e) => setRCode(e.target.value)}
              />
              <IoEye
                size={18}
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
              />
            </div>
            {password !== '' && (
              <div
                style={{
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <p>Copy Password</p>
                <FaRegCopy
                  size={18}
                  onClick={handleCopy}
                  style={{ cursor: 'pointer', marginLeft: '8px' }}
                />
              </div>
            )}
            <div style={{ marginTop: '20px auto', color: 'white' }}>
              <h1 style={{ fontWeight: 'bold' }}>Important information</h1>
              <ul>
                <li>Please Copy Your password Once Retrived.</li>
                <li>We recomment you to regenerate your recovery code after</li>
              </ul>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="pink"
              ml={2}
              onClick={() => {
                retrivePass();
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

export default RetrivePassButton;
