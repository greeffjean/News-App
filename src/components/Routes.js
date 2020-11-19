import { Route, Switch } from 'react-router-dom';
import Results from './Results';

function Routes() {
 
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
