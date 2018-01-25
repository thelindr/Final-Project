import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import LoginForm from "./LoginForm/index"
import RegisterForm from "./RegisterForm/index"
import UserData from "./UserData/index"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      accessToken: null,
      userId: null
    }
  }

  // componentWillMount() {
  //   localStorage.getItem("userId")
  //   this.setState(JSON.parse(localStorage.getItem("userId")))
  // }

  handleLoginSuccess = user => {
    this.setState({
      accessToken: user.accessToken,
      userId: user._id
    })
    localStorage.setItem("userId", JSON.stringify(this.state.userId))
    localStorage.setItem("accessToken", JSON.stringify(this.state.accessToken))
  }

  isLoggedIn = () => (
    this.state.accessToken && this.state.userId
  )

  handleLogout = () => {
    this.setState({
      accessToken: null,
      userId: null
    })
    localStorage.clear()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {this.isLoggedIn()
            ? <UserData
              userId={this.state.userId}
              accessToken={this.state.accessToken}
              Logout={this.handleLogout} />
            : <LoginForm
              SuccessfullLogin={this.handleLoginSuccess} />}
          <Route
            exact
            path="/register"
            component={RegisterForm} />
        </div>
      </BrowserRouter>
    )
  }

}

export default App
