import logo from './logo.svg';
import './App.css';
import Profile from './Profile';
import { useState } from 'react';

function App() {
  const [counter, setCounter] = useState(5467)
  const a = "<3";
  return (
    <div className="App">
      <Profile
      name = "Shashwat💌🍺"
      bio = "Miniproject Developer"
      />
      {counter}
      <div>
        <button onClick={() => setCounter(counter+1)}>Increment</button>
        <button onClick={() => setCounter(counter-1)}>Decrement</button>
      </div>
    </div>
  );
}

export default App;
