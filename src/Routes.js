import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ErrorPage from './components/error-page/ErrorPage'
import Rounding from './components/rounding/Rounding'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path={'/rounding'} component={Rounding} />
                <Route path={'/'} component={ErrorPage} />
            </Switch>
        </Router>
    )
}

export default Routes
