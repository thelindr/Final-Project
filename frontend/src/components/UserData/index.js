import React from "react"

class UserData extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
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

    fetch("http://localhost:8080/userdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.status === 201) {
        this.setState({
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
      <div>
        <h2>Userdata</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            name="bodyweight"
            placeholder="bodyweight"
            required
            onChange={this.handleInput}
            value={this.state.bodyweight} />
          <input
            type="number"
            name="dailydose"
            placeholder="dailydose"
            required
            onChange={this.handleInput}
            value={this.state.dailydose} />
          <input
            type="number"
            name="goaldose"
            placeholder="goaldose"
            required
            onChange={this.handleInput}
            value={this.state.goaldose} />

          <button type="submit">Save</button>
        </form>
      </div>
    )
  }

}

export default UserData
