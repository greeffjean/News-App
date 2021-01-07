
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';


function App() {

  return (
    <Router>
      <Provider store={store} >
        <div className="App">
          <SearchBar />
          <Switch>
            <Route
              path="/search"
              render={(props) => (
                <Results {...props} />
              )}
            />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
};

export default App;
