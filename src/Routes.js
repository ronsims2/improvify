import React from 'react'
import { HashRouter as Router, Switch, Route} from 'react-router-dom'
import ErrorPage from './components/error-page/ErrorPage'
import Rounding from './components/rounding/Rounding'
import Places from './components/places/Places'
import StartPage from './components/start-page/StartPage'
import EstimateLine from "./components/estimate-line/EstimateLine";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path={'/home'} component={StartPage}/>
                <Route path={'/places'} component={Places} />
                <Route path={'/rounding'} component={Rounding} />
                <Route path={'/estimate-line'} component={EstimateLine} />
                <Route path={'/'} component={ErrorPage} />
            </Switch>
        </Router>
    )
}

export default Routes
