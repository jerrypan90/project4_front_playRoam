import React, {Component} from 'react';

class Register extends Component {
  render(){
    return(
      <div>
        <h2>Register</h2>
        <form onSubmit={this.props.handleRegister}>
          <div>
            <input type="username" placeholder="Username" />
            <br />
            <input type="email" placeholder="Email" />
            <br />
            <input type="password" placeholder="Password" />
          </div>
          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

export default Register;