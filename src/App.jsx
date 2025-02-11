import './App.css';

function MyButton(){
  function handleClick(){
    alert('You clicked me!');
  }
  return(
    <button onClick={handleClick}>
      Im a button
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Testing Codespaces</h1>
      <MyButton />
      
    </div>
  );
}

export default App;
