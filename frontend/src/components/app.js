import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import LoginForm from "./LoginForm/index"
import UpdateUserData from "./UpdateUserData/index"
import UpdateDaysPassed from "./UpdateDaysPassed/index"
import UserData from "./UserData/index"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      accessToken: null,
      userId: null
    }
  }

  componentWillMount() {
    this.setState({
      userId: localStorage.getItem("userId"),
      accessToken: localStorage.getItem("accessToken")
    })
  }

  handleLoginSuccess = user => {
    this.setState({
      accessToken: user.accessToken,
      userId: user._id
    })
    localStorage.setItem("userId", this.state.userId)
    localStorage.setItem("accessToken", this.state.accessToken)
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
          {/* <UpdateUserData
            userId={this.state.userId}
            accessToken={this.state.accessToken} /> */}
          <Route
            exact
            path="/update"
            render={routeProps =>
              <UpdateUserData
                {...routeProps}
                userId={this.state.userId}
                accessToken={this.state.accessToken} />
            } />
        </div>
      </BrowserRouter>
    )
  }

}

export default App
