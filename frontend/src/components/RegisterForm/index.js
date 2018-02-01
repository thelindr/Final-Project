import React from "react"
import "./style.css"

class RegisterForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      bodyweight: "",
      dailydose: "",
      goaldose: "",
      message: ""
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    fetch("https://isotretinoin-log.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.status === 201) {
        this.setState({
          username: "",
          password: "",
          bodyweight: "",
          dailydose: "",
          goaldose: "",
          message: "User created! You should now be able to log in."
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

  getMessagereply = () => {
    if (this.state.message) {
      return <p>{this.state.message}</p>
    }
  }

  render() {
    return (
      <div className="RegisterForm">
        <h2>Create User</h2>
        <form onSubmit={this.handleSubmit}>
          <div id="message">
            <p>{this.getMessagereply()}</p>
          </div>
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
          <input
            type="number"
            name="bodyweight"
            placeholder="bodyweight in kg"
            required
            onChange={this.handleInput}
            value={this.state.bodyweight} />
          <label>Bodyweight in kg</label>
          <input
            type="number"
            name="dailydose"
            placeholder="daily dose in mg"
            required
            onChange={this.handleInput}
            value={this.state.dailydose} />
          <label>Daily dose in mg</label>
          <input
            type="number"
            name="goaldose"
            placeholder="goaldose per kg"
            required
            onChange={this.handleInput}
            value={this.state.goaldose} />
          <label>Recommended cumulative dose is 120-150 mg/kg</label>
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }

}

export default RegisterForm
