import logo from './logo.svg';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Routes from './components/Routes';
import { useHistory } from 'react-router-dom'
import { AppContext } from './libs/useContext';
import './App.css';



function App() {
  const history = useHistory();
  
  const [mainState, setMainState] = useState({
    articles: null,
    loading: false,
    error: null,
    userHasSearched: history.location.state ? true : false
  })


  return (
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
     
  );
}

export default App;
