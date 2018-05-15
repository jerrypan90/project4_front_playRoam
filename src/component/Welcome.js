import React, {Component} from 'react';
import jwtDecode from 'jwt-decode';

class Welcome extends Component {
  state = {
      username: ''
  }
  
  componentDidMount(){
    let jwt = window.localStorage.getItem('jwt');
    console.log(jwt);
    let result = jwtDecode(jwt);
    this.setState({username: result.username});
    console.log(result);
  }

  render(){
    return(
      <div>
        <h1>Hello {this.state.username}</h1>
      </div>
    )
  }
}

export default Welcome;