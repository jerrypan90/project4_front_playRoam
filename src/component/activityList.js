import React, {Component} from 'react';
import axios from 'axios';

class List extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <p>Date: {this.props.date}</p>
        <p>Venue: {this.props.venue}</p>
        <p>From: {this.props.startTime} to {this.props.endTime}</p>
      </div>
    );
  }
}

class Activitylist extends Component {
  constructor(props){
    super(props);
    //console.log('props from activityList.js', props);
    this.state = {
      activityInfo: []
    }
  }

  componentDidMount(){
    //console.log('CDM in activityList.js');
    //console.log(this.props.updateActivity);
    this.getActivity()
  }

  componentDidUpdate(){
    if(this.props.updateActivity){
      //console.log('CDU in activityList.js');
      this.getActivity();
      this.props.stopUpdateActivity();
    }
  }

  getActivity(){
    axios.get('http://localhost:5000/activities.json')
    .then((res) => {
      //console.log('the res from axios is', res.data);
      this.setState({
        activityInfo: res.data.map((obj) => {
          return <List
            key={obj.id}
            title={obj.title}
            date={obj.date}
            startTime={obj.start_time}
            endTime={obj.end_time}
            venue={obj.venue}
          ></List>;
        })
      })
      //console.log('this.state.ai from AL', this.state.activityInfo);
    })
    .catch((err) => {
      console.log('Error in Getting Activities: ', err.response)
    })
  }

  render(){
    return(
      <div>
        <h1>Activity Content</h1>
        {this.state.activityInfo}
      </div>
    )
  }
}

export default Activitylist;