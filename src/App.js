import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Modal from 'react-modal';

import Register from './component/Register'
import Signin from './component/Signin'
import Welcome from './component/Welcome'

//import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path='/' component={Register} />
            <Route exact path='/' component={Signin} />
            <Route exact path='/welcome' component={Welcome} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
