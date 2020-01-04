import React from 'react';
import './App.css';
import VehicleListing from './vehicleListing'
import * as vehicles from './vehicleData/vehicles.json';

function App() {
  return (
    <div className="App">
      <VehicleListing vehicles={vehicles}></VehicleListing>
    </div>
  );
}

export default App;
