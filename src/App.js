import logo from './logo.svg';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Routes from './components/Routes';
import { AppContext } from './libs/useContext';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';



function App() {
  const [mainState, setMainState] = useState({
    articles: null,
    loading: false,
    error: null
  })


  return (
    <Router>
    <AppContext.Provider
      value={{
        mainState,
        setMainState
      }}
    >
      <div className="App">
        <SearchBar />
        <Routes />
      </div>
      </AppContext.Provider>
      </Router>
  );
}

export default App;
