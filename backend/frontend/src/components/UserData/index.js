import React from "react"
import { Link } from "react-router-dom"
import Visualize from "./visualize"
import Header from "../header"
import "./style.css"

class UserData extends React.Component {

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

  componentDidMount() {
    const headers = new Headers()
    headers.append("token", this.props.accessToken)

    fetch(`http://localhost:8080/users/${this.props.userId}`, { headers }).then(response => (
      response.json()
    )).then(json => {
      this.setState({
        bodyweight: json.bodyweight,
        dailydose: json.dailydose,
        goaldose: json.goaldose,
        dayspassed: json.dayspassed,
        dosetaken: json.dosetaken
      })
    }).catch(err => {
      console.log("Error", err)
    })
  }

  updateCounter = () => {
    const newAmountOfDays = this.state.dayspassed + 1
    const doseTakenSaved = this.state.dosetaken + this.state.dailydose
    this.setState({
      dayspassed: newAmountOfDays,
      dosetaken: doseTakenSaved
    })
    const headers = new Headers()
    headers.append("token", this.props.accessToken)
    fetch(`http://localhost:8080/users/${this.props.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.status === 201) {
        console.log("State updated")
      } else if (response.status === 400) {
        console.log(response.status, response.message)
      } else {
        console.log("Unexpected error")
      }
    }).catch(err => {
      console.log("Error", err)
    })
  }

  logoutButtonClicked = () => {
    this.props.Logout()
  }

  render() {
    const totaldose = this.state.bodyweight * this.state.goaldose
    const daysleft = (totaldose - this.state.dosetaken) / this.state.dailydose

    return (
      <div>
        <Header />
        <div className="userData">
          <h3>{this.state.bodyweight} kg</h3>
          <h3>{this.state.dailydose} mg/day</h3>
          <h3>{this.state.goaldose} mg/kg</h3>
          <h3>totaldose: {totaldose} mg</h3>
          <h3>Days passed: {this.state.dayspassed}</h3>
          <h3>Days left: {daysleft} </h3>
          <h3>Dose taken: {this.state.dosetaken} mg</h3>
          <Visualize
            dayspassed={this.state.dayspassed}
            daysleft={daysleft} />
          <button
            id="dayspassed"
            onClick={this.updateCounter}> Take dose
          </button>
          <button onClick={this.logoutButtonClicked}>Logout</button>
          <button><Link to="/settings">Settings</Link></button>
        </div>
      </div>
    )
  }

}

export default UserData
