import { Route, BrowserRouter as Router } from 'react-router-dom';
import Results from './Results'

function Routes() {
    return (
        <Router>
            <Route
                exact
                path={`headlines/:id`}
                render={(props) => <Results {...props} />}
            />
        </Router>
    );
}

export default Routes;
