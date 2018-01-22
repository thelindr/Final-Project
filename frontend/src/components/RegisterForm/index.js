import React from "react"

class RegisterForm extends React.Component {

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

    fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.status === 201) {
        this.setState({
          username: "",
          password: ""
        }, () => { console.log("State reset") })
      } else if (response.status === 400) {
        console.log(response.status, response.message)
      } else {
        console.log("Unexpected error")
      }
    }).catch(err => {
      console.log("Error", err)
    })
  }

  render() {
    return (
      <div>
        Register
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

          <button type="submit">Save</button>
        </form>
      </div>
    )
  }

}

export default RegisterForm
