import React, { Component } from 'react';
import Modal from 'react-modal';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';

import Activityform from './activityForm';

import '../style.css';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.createActivity = this.createActivity.bind(this);
    this.state = {
      showModal: false,
      isLoggedIn: false,
      username: '',
      user_id: ''
    };
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  createActivity(e){
    e.preventDefault();
    this.handleCloseModal();
    this.props.handleUpdateActivity();

    axios.post('http://localhost:5000/activities', {
      activity: {
        user_id: e.target[0].value,
        title: e.target[1].value,
        genre: e.target[2].value,
        date: e.target[3].value,
        start_time: e.target[4].value,
        end_time: e.target[5].value,
        venue: e.target[6].value,
        max_pax: e.target[7].value,
        current_pax: e.target[8].value
      }
    })
    .catch((err) => {
      console.log('Error in Creating ActivityList: ', err.response)
    });
  }

  render() {
    return (
      <div className='activityDiv'>
        <h3 className='hello'>Hello {this.props.username}</h3>
        {/* <button className='create'><Link to='/view'>View</Link></button> */}
        <button className='create' onClick={this.handleOpenModal}>Create</button>

      <Modal
        isOpen={this.state.showModal}
        // contentLabel="Inline Styles Modal Example"
        className='modal'
        overlayClassName='overlay'
      >
        <p className='cross' onClick={this.handleCloseModal}>X</p>
        <Activityform user_id={this.props.user_id} createActivity={this.createActivity} />
      </Modal>

      </div>
    );
  }
}

export default Activity;