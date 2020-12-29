
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';


function App() {
 // const history = useHistory();
  
  const [mainState, setMainState] = useState({
    articles: null,
    loading: false,
    error: null,
  //  userHasSearched: history.location.state ? true : false
  })


  return (
    <Provider store={store} >
      <div className="App">
        <SearchBar />
        <Results />
      </div>
      </Provider>
     
  );
}

export default App;
