import { IconButton } from '@chakra-ui/react';
import { FiMoon } from 'react-icons/fi';
import { useTheme } from './ThemeContext';
import { BsStars } from 'react-icons/bs';

const ThemeToggle = () => {
  const { bgImg, toggleBgImg } = useTheme();

  return (
    <IconButton
      variant="ghost"
      aria-label="theme toggle"
      icon={
        bgImg === 'url(/bg2.png)' ? <BsStars size="14" /> : <FiMoon size="14" />
      }
      borderRadius="md"
      onClick={toggleBgImg}
    />
  );
};

export default ThemeToggle;
