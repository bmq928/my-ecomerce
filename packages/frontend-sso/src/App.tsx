import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import withLazy from './shares/with-lazy'
import './App.scss'

const LoginPage = React.lazy(() => import('./pages/LoginPage'))
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'))

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={withLazy(LoginPage)} />
          <Route exact path="/register" component={withLazy(RegisterPage)} />
        </Switch>
      </Router>
    </div>
  )
}
