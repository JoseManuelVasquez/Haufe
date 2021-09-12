import styles from '../styles/App.module.css';
import React from 'react'
import CharactersList from "./CharactersList";
import {Switch, Route} from 'react-router-dom';
import Login from "./Login";
import Signup from "./Signup";
import Nav from "../components/Nav";
import NotFound from "./NotFound";
import LoginRequired from "./LoginRequired";

const App = () => {
  return (
      <div className={styles.theme}>
          <Nav/>
          <Switch>
              <LoginRequired exact path="/" component={CharactersList}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Signup}/>
              <Route path="*" component={NotFound}/>
          </Switch>
      </div>
  );
};

export default App;
