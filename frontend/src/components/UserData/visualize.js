import React from "react"
import "./visualize.css"

class Visualize extends React.Component {

  render() {
    const totalAmountofDays = (this.props.dayspassed + this.props.daysleft)
    const percentageDone = parseInt(((this.props.dayspassed / totalAmountofDays) * 100), 10)
    return (
      <div className="wrapper">
        <div className="progressBar">
          <span className="progressBarFill" style={{ width: `${percentageDone}%` }}>{percentageDone} % Done!</span>
        </div>
      </div>
    )
  }

}

export default Visualize
