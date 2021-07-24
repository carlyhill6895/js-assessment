import React, { useState, useEffect }  from 'react';
import logo from './logo.png';
import './App.css';
import {CareRequestForm} from './components/CareRequestForm';

function App() {
  const [name, setName] = useState('unknown');
  const [counter, setCounter] = useState(0);

  const fetchData = async () => {
    const response = await fetch('/api/data');
    const result = await response.json();
    setName(result.name);
    setCounter(result.counter);
  };

  useEffect (() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      <img src={logo} alt="" width="100" style={{padding: '10px'}}/><br />
      Hello {name}, you called the backend {counter} times.

      <CareRequestForm />
    </div>
  );
}

export default App;
