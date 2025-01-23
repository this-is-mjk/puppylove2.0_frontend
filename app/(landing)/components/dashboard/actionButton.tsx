import { motion } from 'framer-motion';
import { JSX, MouseEventHandler } from 'react';
import { Text, Button } from '@chakra-ui/react';

interface ActionButtonProps {
  text: string;
  icon: JSX.Element;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, icon, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button style={{
        outline: 'none',
        border: 'none',
        width: '95%',
        padding: '1rem 1.3rem',
        borderRadius: '15px',
        cursor: 'pointer',
        display: 'flex',
        fontSize: '1rem',
        gap: '1rem',
        flexDirection: 'row',
      }} 
      // color={{base: 'black' , md: 'white'}}
      onClick={onClick}>
        <span>{icon}</span>
        <Text hideBelow="md">{text}</Text>
      </Button>
    </motion.div>
  );
};

export default ActionButton;
