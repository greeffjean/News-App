import { Route, Switch } from 'react-router-dom';
import Results from './Results';
import { useAppContext } from '../libs/useContext';

function Routes() {
    const  { mainState } = useAppContext();
    
    return (
            <Switch>
            <Route
                path="/"
                render={(props) => <Results {...props} />}
            />
            </Switch>
           
      
    );
}

export default Routes;
