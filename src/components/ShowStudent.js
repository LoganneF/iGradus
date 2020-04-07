import React from 'react'

class ShowStudent extends React.Component {
  
  render () {
    return (
      <>
        <div className="student-details">
          <h3>Student Information:</h3>
          <h4>{this.props.student.name}</h4>
          <img src={this.props.student.imageUrl} alt="" className="student-info-image"/>
          <p><span>GPA:</span> { this.props.student.gpa } </p>
          <p><span>Email:</span> { this.props.student.email } </p>
          <button type="button" class="btn btn-danger" id="modify-student-button" onClick={() => this.props.deleteStudent(this.props.student._id)}>Remove Student</button>
          <button type="button" class="btn btn-info" id="modify-student-button" onClick={this.props.editButtonClick}>Edit Student</button> <br />
          <button type="button" class="btn btn-outline-secondary" id="close-button" onClick={this.props.closeInfoModal} >Close</button>
        </div>
      </>
    )
  }
 }
export default ShowStudent