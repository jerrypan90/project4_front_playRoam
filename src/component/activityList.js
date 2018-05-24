import React, {Component} from 'react';
import axios from 'axios';

import '../style.css';

class List extends Component {
  render() {
    let isLoggedIn = this.props.isLoggedIn;
    let creator = this.props.creator;
    let user_id = this.props.user_id;

    return (
      <div className='individualList'>
        <h3>{this.props.title}</h3>
        <p>Date: {this.props.date}</p>
        <p>Venue: {this.props.venue}</p>
        <p>From: {this.props.startTime} to {this.props.endTime}</p>
        {isLoggedIn && creator != user_id 
        ? <button className={`joinBtn${this.props.id}`} onClick={this.props.joinHandler} value={this.props.id}>Join</button>
        : null}
      </div>
    );
  }
}

class Activitylist extends Component {
  constructor(props){
    super(props);
    this.joinHandler = this.joinHandler.bind(this);
    this.state = {
      isLoggedIn: false,
      joinButton: false,
      username: '',
      user_id: '',
      activityInfo: [],
      rsvpInfo: []
    }
  }

  componentDidMount(){
    //console.log('CDM in activityList.js');
    this.getActivity();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('CWRP in AL', nextProps.updateActivity);
    this.setState({
      isLoggedIn: nextProps.isLoggedIn,
      username: nextProps.username,
      user_id: nextProps.user_id
    })
    this.getActivity()
  }

  componentDidUpdate(){
    if(this.props.updateActivity){
      // console.log('CDU in activityList.js');
      this.props.stopUpdateActivity();
      setInterval(() => this.getActivity(), 1000);
    };
  }

  joinHandler(e){
    axios.post('http://localhost:5000/rsvps', {
      user_id: this.props.user_id,
      activity_id: e.target.value,
      attendance: 'true'
    })
    .catch((err) => {
      console.log('Error in Joining Activity: ', err.response);
    });
    document.getElementsByClassName(`joinBtn${e.target.value}`)[0].style.display = 'none';
  }

  getActivity(){
    // console.log('axios get');
    axios.get('http://localhost:5000/activities.json')
    .then((res) => {
      this.setState({
        activityInfo: res.data.map((obj) => {
          return <List
            key={obj.id}
            id={obj.id}
            creator={obj.user_id}
            title={obj.title}
            date={obj.date}
            startTime={obj.start_time}
            endTime={obj.end_time}
            venue={obj.venue}
            joinHandler={this.joinHandler}
            isLoggedIn={this.state.isLoggedIn}
            user_id={this.state.user_id} />;
        })
      })
    })
    .catch((err) => {
      console.log('Error in Getting Activities: ', err.response)
    })
  }

  render(){
    return(
      <div>
        <h1 className='listHeader'>Play Room</h1>
        <div className='mainList'>
          {this.state.activityInfo}
        </div>
      </div>
    )
  }
}

export default Activitylist;