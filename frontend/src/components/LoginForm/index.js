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
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => response.json()).then(json => {
      this.props.SuccessfullLogin(json)
      console.log(json)
      localStorage.setItem("userid", JSON.stringify(json._id))
      localStorage.setItem("token", JSON.stringify(json.accessToken))
    }).catch(err => {
      console.error("Login failed", err)
    })
    this.setState({
      username: "",
      password: ""
    })
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
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
