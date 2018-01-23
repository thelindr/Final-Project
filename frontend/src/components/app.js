import React from "react"
import LoginForm from "./LoginForm/index"
import RegisterForm from "./RegisterForm/index"
import UserData from "./UserData/index"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      accessToken: "",
      userId: ""
    }
  }

  handleLoginSuccess = user => {
    this.setState({
      accessToken: user.accessToken,
      userId: user._id
    })
    // localStorage.setItem("userSettings", JSON.stringify(this.state))
  }

  isLoggedIn = () => (
    this.state.accessToken && this.state.userId
  )

  render() {
    return (
      <div>
        {/* <RegisterForm /> */}
        {this.isLoggedIn()
          ? <UserData />
          : <LoginForm SuccessfullLogin={this.handleLoginSuccess} />}
      </div>
    )
  }

}

export default App
