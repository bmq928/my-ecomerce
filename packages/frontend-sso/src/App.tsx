import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import withLazy from './shares/with-lazy'
import './App.scss'

const LoginPage = React.lazy(() => import('./pages/LoginPage'))

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={withLazy(LoginPage)} />
        </Switch>
      </Router>
    </div>
  )
}
