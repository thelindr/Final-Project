import React from "react"
import "./visualize.css"

class Visualize extends React.Component {

  render() {
    const totalAmountofDays = (this.props.dayspassed + this.props.daysleft)
    const percentageDone = parseInt(((this.props.dayspassed / totalAmountofDays) * 100), 10)
    return (
      <div className="wrapper">
        <div className="progressBar">
          <span className="progressBarFill" style={{ width: percentageDone * 3 }} />
        </div>
        {percentageDone} %
      </div>
    )
  }

}

export default Visualize
