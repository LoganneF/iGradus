import React from 'react'

class ShowAssignment extends React.Component {
  render () {
    return (
      <>
        <div className="assignment-details">
         <h3>Assignment Information:</h3>
         <h4>{this.props.assignment.name}</h4>
         <h5>Due: {this.props.assignment.date}</h5>
         <p><span>Average Grade: </span>{this.props.assignment.grade}</p>
         <button type="button" class="btn btn-danger" id="modify-assignment-button" onClick={() => this.props.deleteAssignment(this.props.assignment._id)}>Delete Assignment</button>
         <button type="button" class="btn btn-info" id="modify-assignment-button" onClick={this.props.editButtonClick}>Edit Assignment</button> <br />
         <button type="button" class="btn btn-outline-secondary" id="close-button" onClick={this.props.closeInfoModal} >Close</button>
       </div>
      </>
    )
  }
 }
export default ShowAssignment