import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import Register from './component/register'
import Signin from './component/signIn'
import Activity from './component/activity'
import Activitylist from './component/activityList'

import './style.css';

Modal.setAppElement('#root')

class App extends Component {
  constructor(){
    super();
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleUpdateActivity = this.handleUpdateActivity.bind(this);
    this.stopUpdateActivity = this.stopUpdateActivity.bind(this);
    this.state = {
      showModal: false,
      isLoggedIn: false,
      updateActivity: false,
      username: '',
      user_id: ''
    };
  }

  componentDidMount() {
    if(window.localStorage.getItem('jwt') != null) {
      let userKey = jwtDecode(window.localStorage.getItem('jwt'));
      this.setState({
        isLoggedIn: true,
        username: userKey.username,
        user_id: userKey.id
      })
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleLogout() {
    window.localStorage.removeItem('jwt');
    this.setState({ 
      isLoggedIn: false, 
      username: '',
      user_id: ''
    })
  }

  handleSignIn(e){
    e.preventDefault();
    this.handleCloseModal();
    
    axios.post('http://localhost:5000/tokens', {
      email: e.target[0].value,
      password: e.target[1].value
    })
    .then((res) => {
      let userKey = jwtDecode(res.data.jwt);
      (this.setState({username: userKey.username, user_id: userKey.id, isLoggedIn: true}), window.localStorage.setItem('jwt', res.data.jwt))
    })
    .catch((err) => {
      console.log('Error in Signin: ', err.response)
    });
  }

  handleRegister(e) {
    e.preventDefault();
    this.handleCloseModal();

    axios.post('http://localhost:5000/users', {
      user: {
        username: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value
      }
    })
    .then((res) => {
      let userKey = jwtDecode(res.data.jwt);
      (this.setState({username: userKey.username, user_id: userKey.id, isLoggedIn: true}), window.localStorage.setItem('jwt', res.data.jwt))
    })
    .catch((err) => {
      console.log('Error in Registeration: ', err.response)
    });
  }

  handleUpdateActivity(){
    //console.log(this.state.updateActivity);
    this.setState({ updateActivity: true });
  }

  stopUpdateActivity(){
    //console.log(this.state.updateActivity);
    this.setState({ updateActivity: false });
  }

  render() {
    let isLoggedIn = this.state.isLoggedIn;
    return (
      <div className="App">
        <Router>
          <div>
            {isLoggedIn ? (
              <div>
                {/* <Activity userInfo={this.state.userInfo} isLoggedIn={this.state.isLoggedIn} /> */}
                <Activity {...this.state} handleUpdateActivity={this.handleUpdateActivity} />
                <button onClick={this.handleLogout}>Logout</button>
              </div>
            ) : (
              <button onClick={this.handleOpenModal}>Register/Login</button>
            )}
            
            <Modal
              isOpen={this.state.showModal}
              // contentLabel="Inline Styles Modal Example"
              className='modal'
              overlayClassName='overlay'
            >
              {/* <Route exact path='/' component={Register} />
              <Route exact path='/' component={Signin} /> */}
              <p className='cross' onClick={this.handleCloseModal}>X</p>
              <Register handleRegister={this.handleRegister} />
              <Signin handleSignIn={this.handleSignIn} />
            </Modal>

            {/* <Route exact path='/activity' component={Activity} /> */}
            <Activitylist {...this.state} getActivty={this.getActivty} stopUpdateActivity={this.stopUpdateActivity} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
