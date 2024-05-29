import logo from './logo.svg';
import './App.css';

import NavBar from './components/NavBar';
import Typing from './components/Typing';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NavBar />
      </header>
      <body>
        <Typing
          text = {[
            "Hi this is a typing demo",
            "I am a typing effect with React and CSS",
            ""
          ]}
          typingSpeed={100}
          deletingSpeed={50}
          duration={1000}
        />
      </body>
    </div>
  );
}

export default App;
