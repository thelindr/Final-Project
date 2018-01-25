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
      goaldose: ""
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    fetch("http://localhost:8080/users", {
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
          goaldose: ""
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
      <div className="RegisterForm">
        <h2>Create User</h2>
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
          <input
            type="number"
            name="bodyweight"
            placeholder="bodyweight in kg"
            required
            onChange={this.handleInput}
            value={this.state.bodyweight} />
          <input
            type="number"
            name="dailydose"
            placeholder="daily dose in mg"
            required
            onChange={this.handleInput}
            value={this.state.dailydose} />
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
