import React from "react"
import { withRouter, Link } from "react-router-dom"
import "./style.css"

class UpdateUserData extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      bodyweight: "",
      dailydose: "",
      goaldose: "",
      dayspassed: "",
      dosetaken: ""
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const headers = new Headers()
    headers.append("token", this.props.accessToken)

    fetch(`https://isotretinoin-log.herokuapp.com/users/${this.props.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.status === 201) {
        this.setState({
          bodyweight: "",
          dailydose: "",
          goaldose: "",
          dayspassed: "",
          dosetaken: ""
        }, () => {
          console.log("State reset")
          this.props.history.push("/")
        })
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
      <div className="UpdateForm">
        <h2>Settings</h2>
        <form onSubmit={this.handleSubmit}>
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
            name="dayspassed"
            placeholder="days passed"
            required
            onChange={this.handleInput}
            value={this.state.dayspassed} />
          <label>Days passed</label>
          <input
            type="number"
            name="dosetaken"
            placeholder="dose taken"
            required
            onChange={this.handleInput}
            value={this.state.dosetaken} />
          <label>Dose taken</label>
          <input
            type="number"
            name="goaldose"
            placeholder="goaldose per kg"
            required
            onChange={this.handleInput}
            value={this.state.goaldose} />
          <label>Recommended cumulative dose is 120-150 mg/kg</label>

          <button type="submit">Update</button>
        </form>
        <div className="buttonholder">
          <div className="divider">
            <button id="closebutton"><Link to="/">exit</Link></button>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(UpdateUserData)
