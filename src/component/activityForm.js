import React, { Component } from 'react';

class Activityform extends Component {
  constructor(props) {
    super(props);
    //console.log('props from activityForm.js', props);
    this.state = {
      todayDate: ''
    }
  }

  componentDidMount() {
    let today = new Date();
    let minDate = new Date(today.setDate(today.getDate() + 1)).toISOString().split("T")[0];
    this.setState({ todayDate: minDate })
  }

  render() {
    return (
      <div>
        <h2>Create Activity</h2>
        <form onSubmit={this.props.createActivity}>
          <div>
            <input type="hidden" value={this.props.user_id} />
            <input type="text" placeholder="Title" /><br />
            <input type="text" placeholder="Genre" /><br />
            <input type="date" min={this.state.todayDate} /><br />
            Start: <input type="time" />End: <input type="time" /><br />
            <input type="text" placeholder="Venue" /><br />
            <input type="number" placeholder="Max Pax" /><br />
            <input type="number" placeholder="Current Pax" />
          </div>
          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

export default Activityform;