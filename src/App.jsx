import './App.css';
import { useState } from 'react';

function MyButton({ count, handleClick }) {
  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="App">
      <h1>Testing Codespaces</h1>
      <MyButton count={count} handleClick={handleClick} />
      <MyButton count={count} handleClick={handleClick} />
    </div>
  );
}

export default App;
