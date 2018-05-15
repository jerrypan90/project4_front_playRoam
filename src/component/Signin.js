import React, {Component} from 'react';
import axios from 'axios';

class Signin extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    
    axios.post('http://localhost:5000/tokens', {
      email: this.refs.email.value,
      password: this.refs.password.value
    })
    .then((res) => {
      (console.log(res.data.jwt), window.localStorage.setItem('jwt', res.data.jwt))
    })
    .then(() => {
      this.props.history.push('/welcome')
    })
    .catch((err) => {
      console.log('Error in Signin: ', err.response)
    });
  }

  render(){
    return(
      <div>
        <h2>Sign In</h2>
        <form onSubmit={this.handleSubmit}>
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