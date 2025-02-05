import React, { createContext, useState, useContext } from 'react';

type DataContextType = {
  addingNewTags: boolean;
  toogleAddingNewTags: (changeTo: boolean) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [addingNewTags, setAddingNewTags] = useState<boolean>(false);

  const toogleAddingNewTags = (changeTo: boolean) => {
    setAddingNewTags(changeTo);
  };

  return (
    <DataContext.Provider value={{ addingNewTags, toogleAddingNewTags }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
