import React from "react"
import LoginForm from "./LoginForm/index"
import RegisterForm from "./RegisterForm/index"

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
      userId: user.id
    })
  }

  isLoggedIn = () => (
    this.state.accessToken && this.state.userId
  )

  render() {
    return (
      <div>
        <LoginForm
          SuccessfullLogin={this.handleLoginSuccess} />
        <RegisterForm />
      </div>
    )
  }

}

export default App
