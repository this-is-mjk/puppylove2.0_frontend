import React, { createContext, useState, useContext } from 'react';

type ThemeContextType = {
  bgImg: string;
  toggleBgImg: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bgImg, setBgImg] = useState<string>('url(/bg2.png)');

  const toggleBgImg = () => {
    setBgImg((prev) =>
      prev === 'url(/bg2.png)' ? 'url(bgdark.jpg)' : 'url(/bg2.png)'
    );
  };

  return (
    <ThemeContext.Provider value={{ bgImg, toggleBgImg }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
