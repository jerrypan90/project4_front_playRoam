import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import Activityform from './activityForm';

import '../style.css';

class Activity extends Component {
  constructor() {
    super();
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.state = {
      showModal: false,
      username: '',
      user_id: ''
    };
  }

  componentDidMount() {
    console.log('C D M in AL');
    if(this.props.isLoggedIn) {
      this.getUserInfo()
    }
  }

  getUserInfo(){
    console.log('get user info from AL');
    let result = jwtDecode(this.props.userInfo);
    this.setState({username: result.username, user_id: result.id});
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  createActivity(){
    
  }

  render() {
    return (
      <div>
        <h3>Hello {this.state.username}</h3>
        <button onClick={this.handleOpenModal}>Create</button>

      <Modal
        isOpen={this.state.showModal}
        // contentLabel="Inline Styles Modal Example"
        className='modal'
        overlayClassName='overlay'
      >
        <p className='cross' onClick={this.handleCloseModal}>X</p>
        <Activityform user_id={this.state.user_id} />
      </Modal>

      </div>
    );
  }
}

export default Activity;