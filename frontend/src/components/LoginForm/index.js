import React from "react"
import RegisterForm from "../RegisterForm/index"
import "./style.css"

class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      isHidden: true
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("https://isotretinoin-log.herokuapp.com/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => response.json()).then(json => {
      this.props.SuccessfullLogin(json)
      console.log(json)
    }).catch(err => {
      console.error("Login failed", err)
    })
    this.setState({
      username: "",
      password: ""
    })
  }

  getButtontext = () => {
    if (this.state.isHidden) {
      return "New User?"
    } else {
      return "Close"
    }
  }

  handleClick = () => {
    const toggleMode = !this.state.isHidden
    this.setState({ isHidden: toggleMode })
  }

  render() {
    return (
      <div className="LoginForm">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            required
            onChange={this.handleInput}
            value={this.state.username} />
          <label>Username</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            onChange={this.handleInput}
            value={this.state.password} />
          <label>Password</label>
          <button type="submit">Login</button>
        </form>
        <button onClick={this.handleClick}>{this.getButtontext()}</button>
        {!this.state.isHidden && <RegisterForm />}
      </div>
    )
  }

}

export default LoginForm
