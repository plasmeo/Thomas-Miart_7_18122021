import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header';
import Signup from './Components/Auth/Signup';
import Login from './Components/Auth/Login';
import CreatePost from './Components/Posts/Create';
import Options from './Components/Options/options';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />

      <Switch>
      <Route exact path="/">
        <Home />        
      </Route>
      <Route exact path="/auth/signup">
        <Signup />
      </Route>
      <Route exact path="/auth/login">
        <Login />
      </Route>
      <Route exact path="/post">
        <CreatePost />
      </Route>
      <Route exact path="/options">
        <Options />
      </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
