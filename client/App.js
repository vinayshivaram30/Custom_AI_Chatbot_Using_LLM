import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Chat from './Chat';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;