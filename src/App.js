import { useState } from 'react';
import AddButton from './components/AddButton/AddButton';
import './App.css';

import Modal from './components/Modal/Modal';

function App() {
  const [modalActive, setModalActive] = useState();
  return (
    <main>
      <AddButton onClick={() => setModalActive(true)}/>
      <Modal active={modalActive} setActive={setModalActive}/>
    </main>
  );
}

export default App;
