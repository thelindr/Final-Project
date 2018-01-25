import React from "react"
import "./style.css"

class UserData extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      bodyweight: "",
      dailydose: "",
      goaldose: ""
    }
  }

  componentDidMount() {
    const headers = new Headers()
    headers.append("token", this.props.accessToken)
    // (JSON.parse(localStorage.getItem("accessToken")))
    // (JSON.parse(localStorage.getItem("userId"))) Why cant I fetch these from localStorage?

    fetch(`http://localhost:8080/users/${this.props.userId}`, { headers }).then(response => (
      response.json()
    )).then(json => {
      this.setState({
        bodyweight: json.bodyweight,
        dailydose: json.dailydose,
        goaldose: json.goaldose
      })
    }).catch(err => {
      console.log("Error", err)
    })
  }

  logoutButtonClicked = () => {
    this.props.Logout()
  }

  // handleInput = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }
  //
  // handleSubmit = event => {
  //   event.preventDefault()
  //
  //   fetch(`http://localhost:8080/users/${this.props.userId}`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(this.state)
  //   }).then(response => {
  //     if (response.status === 201) {
  //       this.setState({
  //         bodyweight: "",
  //         dailydose: "",
  //         goaldose: ""
  //       }, () => { console.log("State was reset") })
  //     } else if (response.status === 400) {
  //       console.log(response.status, response.message)
  //     } else {
  //       console.log("Unexpected error")
  //     }
  //   }).catch(err => {
  //     console.log("Error", err)
  //   })
  // }

  render() {
    return (
      <div className="userData">
        <h2>Userdata</h2>
        <h1>{this.state.bodyweight} kg</h1>
        <h1>{this.state.dailydose} mg/day</h1>
        <h1>{this.state.goaldose} mg/kg</h1>
        <button onClick={this.logoutButtonClicked}>Logout</button>
      </div>
    )
  }

}

export default UserData
