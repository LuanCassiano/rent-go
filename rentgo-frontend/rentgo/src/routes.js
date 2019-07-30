import React from 'react'

import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import DriversPage from './pages/Drivers'
import PassengersPage from './pages/Passengers'

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/passengers" component={PassengersPage}/>
        <Route path="/drivers" component={DriversPage}/>
    </Switch>
)

export default Routes;