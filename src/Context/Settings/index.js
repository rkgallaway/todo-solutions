import React, { useEffect, useState } from 'react';

const storage = JSON.parse(localStorage.getItem('todo'));


// 3 steps to use context
// step 1:  Create context object
export const SettingsContext = React.createContext();

// step 2: create a provider component
function SettingsProvider ({children}){

  // step 3: create state
  const [completed, setCompleted] = useState(storage ? storage.completed : false);
  const [pageItems, setPageItems] = useState(storage ? storage.pageItems : 3);
  const [sort, setSort] = useState(storage ? storage.sort : 'difficulty');
  const [save, setSave] = useState(false)

  // behaviors
  const showCompleted = () => {
    setCompleted(!completed);
  }

  const changeItems = (quantity) => {
    setPageItems(quantity);
  }

  const sortBy = (sortStr) => {
    setSort(sortStr);
  }

  const storeSettings = () => {
    setSave(!save);
  }

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify({completed, pageItems, sort}));
  }, [save]);

  const values = {
    completed,
    pageItems,
    sort,
    save,
    showCompleted,
    changeItems,
    sortBy,
    storeSettings
  }

  return(
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;
