import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import Activityform from './activityForm';

import '../style.css';

class Activity extends Component {
  constructor(props) {
    super(props);
    //console.log('props from activity.js', props);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.createActivity = this.createActivity.bind(this);
    this.state = {
      showModal: false,
      user_id: this.props.user_id
    };
  }

  // componentDidMount() {
  //   console.log('CDM in activity.js');
  //   if(this.props.isLoggedIn) {
  //     this.getUserInfo()
  //   }
  // }

  // getUserInfo(){
  //   console.log('get user info from activity.js');
  //   // let result = jwtDecode(this.props.userInfo);
  //   // this.setState({username: result.username, user_id: result.id});
  //   this.setState({
  //     username: this.props.username,
  //     user_id: this.props.user_id
  //   })
  // }

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
      <div>
        <h3>Hello {this.props.username}</h3>
        <button onClick={this.handleOpenModal}>Create</button>

      <Modal
        isOpen={this.state.showModal}
        // contentLabel="Inline Styles Modal Example"
        className='modal'
        overlayClassName='overlay'
      >
        <p className='cross' onClick={this.handleCloseModal}>X</p>
        <Activityform user_id={this.state.user_id} createActivity={this.createActivity} />
      </Modal>

      </div>
    );
  }
}

export default Activity;