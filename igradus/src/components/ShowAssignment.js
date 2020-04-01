import React from 'react'

class ShowAssignment extends React.Component {
  render () {
    return (
      <>
        <div className="student-details">
         <h3>Assignment Information:</h3>
         <hr/>
         <h4>{this.props.assignment.name}</h4>
         <h5>{this.props.assignment.date}</h5>
         <p><span>Average Grade:</span> { this.props.assignment.grade } </p>
         <button type="button" class="btn btn-danger btn-sm" id="modify-assignment-button" onClick={() => this.props.deleteAssignment(this.props.assignment._id)}>Delete Assignment</button>
         <button type="button" class="btn btn-info btn-sm" id="modify-assignment-button" onClick={() => this.props.deleteStudent(this.props.student._id)}>Edit Assignment</button>
       </div>
      </>
    )
  }
 }
export default ShowAssignment