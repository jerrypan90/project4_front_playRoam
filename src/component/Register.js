import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();

    // let formData = new FormData();
    // formData.append("username", this.refs.username.value);
    // formData.append("email", this.refs.email.value);
    // formData.append("password", this.refs.password.value);
    
    axios.post('http://localhost:5000/users', {
      user: {
        username: this.refs.username.value,
        email: this.refs.email.value,
        password: this.refs.password.value,
      }
    })
    .then((res) => {
      (console.log(res.data.jwt), window.localStorage.setItem('jwt', res.data.jwt))
    })
    .then(() => {
      this.props.history.push('/welcome')
    })
    .catch((err) => {
      console.log('Error in Registeration: ', err.response)
    });

    // fetch("http://localhost:3001/users", {method: 'POST', body: formData})
    //   .then(res => res.json())
    //   .then(res => (console.log(res.jwt), window.localStorage.setItem('jwt', res.jwt)))
    //   .then(() => this.props.history.push('/welcome'))
    //   .catch((err) => {console.log('There is an error: ', err)});
  }

  render(){
    return(
      <div>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="username" ref="username" placeholder="Username" />
            <br />
            <input type="email" ref="email" placeholder="Email" />
            <br />
            <input type="password" ref="password" placeholder="Password" />
          </div>
          <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

export default Register;