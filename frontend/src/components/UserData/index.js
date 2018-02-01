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

    fetch(`https://isotretinoin-log.herokuapp.com/users/${this.props.userId}`, { headers }).then(response => (
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
    }, () => { // Callback function, invoked after lines above
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
          console.log("State updated")
        } else if (response.status === 400) {
          console.log(response.status, response.message)
        } else {
          console.log("Unexpected error")
        }
      }).catch(err => {
        console.log("Error", err)
      })
    })
  }

  logoutButtonClicked = () => {
    this.props.Logout()
  }

  showMessage = () => (
    this.state.dosetaken === (this.state.goaldose * this.state.bodyweight)
  )

  render() {
    const totaldose = this.state.bodyweight * this.state.goaldose
    const daysleft = (totaldose - this.state.dosetaken) / this.state.dailydose
    const Completemessage = () => (
      <div className="completeMessage">
        <h2>YOU ARE DONE!</h2>
      </div>
    )

    return (
      <div className="userData">
        <Header />
        <div className="stateWrapper">
          <p>Weight: {this.state.bodyweight} kg</p>
          <p>Dose per day: {this.state.dailydose} mg/day</p>
          <p>Goaldose: {this.state.goaldose} mg/kg</p>
        </div>
        <div className="calcWrapper">
          <div className="card" id="first"><h3>Dose Taken:</h3><p>{this.state.dosetaken} mg</p></div>
          <div className="card" id="second"><h3>Total Dose:</h3><p>{totaldose} mg</p></div>
          <div className="card" id="third"><h3>Days Passed:</h3><p>{this.state.dayspassed}</p></div>
          <div className="card" id="fourth"><h3>Days Left:</h3><p>{daysleft}</p></div>
        </div>
        <Visualize
          dayspassed={this.state.dayspassed}
          daysleft={daysleft} />
        <div className="buttonWrapper">
          <button
            id="dayspassed"
            disabled={this.state.dosetaken === totaldose}
            onClick={this.updateCounter}> Take dose
          </button>
          <div className="buttonFoot">
            <button onClick={this.logoutButtonClicked}>Logout</button>
            <button><Link to="/settings">Settings</Link></button>
          </div>
        </div>
        {this.showMessage() ? <Completemessage /> : null}
      </div>
    )
  }

}

export default UserData
