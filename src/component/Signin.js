import React, {Component} from 'react';

class Signin extends Component {
  render(){
    return(
      <div>
        <h2>Sign In</h2>
        <form onSubmit={this.props.handleSignIn}>
          <div>
            <input type="email" ref="email" placeholder="Email" />
            < br />
            <input type="password" ref="password" placeholder="Password" />
          </div>
          <input type="submit" value="Sign In" />
        </form>
      </div>
    )
  }
}

export default Signin;