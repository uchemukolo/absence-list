import React from 'react';
import AbsenceList from './components/AbsenceList';
import './App.css';


const App = () => {
  return (
    <div className="container App">
      <h1 className="text-2xl font-bold text-center my-4">Absence List</h1>
      <AbsenceList />
    </div>
  );
};

export default App;