import React from "react"

class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => response.json()).then(userJson => {
      this.props.SuccessfullLogin(userJson)
      console.log(userJson)
    }).catch(err => {
      console.error("Promise rejected", err)
    })
    this.setState({
      username: "",
      password: ""
    })
  }

  render() {
    return (
      <div>
        Login
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            required
            onChange={this.handleInput}
            value={this.state.username} />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            onChange={this.handleInput}
            value={this.state.password} />
          <button type="submit">Login</button>
        </form>

      </div>
    )
  }

}

export default LoginForm
