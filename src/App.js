import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToDo from './Components/Todo';
import Header from './Components/Header';
import SettingsForm from './Components/SettingsForm';
import { AuthContext } from './Context/Auth';
import { When } from 'react-if';


const App = () => {
  const [incomplete, setIncomplete] = useState([]);

  return (
    <BrowserRouter>
      <Header incomplete={incomplete} />
      <Routes>
        <Route path="/" element={<ToDo incomplete={incomplete} setIncomplete={setIncomplete} />} />
        <Route path='/settings' element={<SettingsForm />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
