import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      showModal: false,
      isLoggedIn: false,
      userInfo: ''
    };
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleLogout() {
    window.localStorage.removeItem('jwt');
    this.setState({ isLoggedIn: false, userInfo: '' })
  }

  handleSubmit(e){
    e.preventDefault();
    this.handleCloseModal();
    
    axios.post('http://localhost:5000/tokens', {
      email: e.target[0].value,
      password: e.target[1].value
    })
    .then((res) => {
      (this.setState({userInfo: res.data.jwt, isLoggedIn: true}), window.localStorage.setItem('jwt', res.data.jwt))
    })
    .catch((err) => {
      console.log('Error in Signin: ', err.response)
    });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div className="App">
        <Router>
          <div>
            {isLoggedIn ? (
              <div>
                <Activity userInfo={this.state.userInfo} isLoggedIn={this.state.isLoggedIn} />
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
              <Register />
              {/* <Signin closeModal={this.handleCloseModal} updateLoginStatus={this.handleLogin} handleSubmit={this.handleSubmit} /> */}
              <Signin handleSubmit={this.handleSubmit} />
            </Modal>

            {/* <Route exact path='/activity' component={Activity} /> */}
            <Activitylist />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
