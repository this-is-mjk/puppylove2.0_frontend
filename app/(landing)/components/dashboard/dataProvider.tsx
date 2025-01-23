import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

const dataProvider = ({ children }) => {
  // Shared states
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isShowStud, setIsShowStud] = useState(false);
  const [clickedStudents, setClickedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [hearts_submitted, setHeartsSubmitted] = useState(false);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [newDatafetched, setNewDataFetched] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        user,
        setUser,
        isShowStud,
        setIsShowStud,
        clickedStudents,
        setClickedStudents,
        searchQuery,
        setSearchQuery,
        students,
        setStudents,
        hearts_submitted,
        setHeartsSubmitted,
        Logout,
        handleShowStud,
        handleButtonClick,
        handleUnselectStudent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
