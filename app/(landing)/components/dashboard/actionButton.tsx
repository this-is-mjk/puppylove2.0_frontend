'use client';

import { motion } from 'framer-motion';
import { MouseEventHandler } from 'react';
import { Text } from '@chakra-ui/react';

interface ActionButtonProps {
  text: string;
  icon: JSX.Element;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, icon, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        backgroundColor: 'rgb(222, 217, 217)',
        outline: 'none',
        border: 'none',
        // color: 'gray',
        /* width: 'max-content', */
        padding: '0.8rem 1.3rem',
        borderRadius: '15px',
        cursor: 'pointer',
        display: 'flex',
        gap: '1rem',
        flexDirection: 'row',
      }}
      onClick={onClick}
    >
      <span>{icon}</span>
      <Text hideBelow="md">{text}</Text>
    </motion.div>
  );
};

export default ActionButton;
