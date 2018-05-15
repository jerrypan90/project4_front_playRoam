import React, { Component } from 'react';

class Activityform extends Component {
  render() {
    return (
      <div>
        <h2>Create Activity</h2>
        <form onSubmit={this.handleCreate}>
          <div>
            <input type="hidden" value={this.props.user_id} />
            <input type="text" placeholder="Title" /><br />
            <input type="text" placeholder="Genre" /><br />
            <input type="text" placeholder="Venue" /><br />
            <input type="text" placeholder="Time" /><br />
            <input type="text" placeholder="Max Pax" /><br />
            <input type="text" placeholder="Current Pax" />
          </div>
          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

export default Activityform;