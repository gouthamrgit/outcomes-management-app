import React from 'react';
import './styles/App.css';
import OutcomeList from './components/OutcomeList';
import MeasurementList from './components/MeasurementList';

function App() {
  return (
    <div className="App">
      <h1>Outcomes and Measurements Management</h1>
      <OutcomeList />
      <MeasurementList />
    </div>
  );
}

export default App;
