import React, {Component} from 'react';
// import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import './App.css';
import NewStudentForm from "./components/NewStudentForm.js";
import NewAssignmentForm from "./components/NewAssignmentForm.js";
import ShowStudent from "./components/ShowStudent.js";
import ShowAssignment from "./components/ShowAssignment.js";

let baseURL = process.env.REACT_APP_BASEURL;

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3003";
}

console.log("current base URL:", baseURL);

fetch(baseURL + "/students")
  .then(
    data => {
      return data.json();
    },
    err => console.log(err)
  )
  .then(
    parsedData => console.log(parsedData),
    err => console.log(err)
);

fetch(baseURL + "/assignments")
  .then(
    data => {
      return data.json();
    },
    err => console.log(err)
  )
  .then(
    parsedAssignmentData => console.log(parsedAssignmentData),
    err => console.log(err)
);

class App extends React.Component {
  
  state = {
    students: [],
    assignments: []
  }

  getStudent = student => {
    this.setState({student})
  }

  getAssignment = assignment => {
    this.setState({assignment})
  }

  getStudents = () => {
    fetch(baseURL + "/students")
      .then(
        data => {
          return data.json();
        },
        err => console.log(err)
      )
      .then(
        parsedStudentData => this.setState({ students: parsedStudentData }),
        err => console.log(err)
      );
  };

  getAssignments = () => {
    fetch(baseURL + "/assignments")
      .then(
        data => {
          return data.json();
        },
        err => console.log(err)
      )
      .then(
        parsedAssignmentData => this.setState({assignments: parsedAssignmentData}),
        err => console.log(err)
    );
  };

  handleAddStudent = student => {
    const copyStudents = [...this.state.students];
    copyStudents.unshift(student);
    this.setState({
      students: copyStudents,
      name: '',
      imageUrl: '',
      passing: Boolean,
      student: {},
    });
  };

  handleAddAssignment = assignment => {
    const copyAssignments = [...this.state.assignments];
    copyAssignments.unshift(assignment);
    this.setState({
      assignments: copyAssignments,
      date: String,
      name: String,
      grade: String,
      assignment: {}
    });
  };

  deleteStudent = id => {
    fetch(baseURL + "/students/" + id, {
      method: 'DELETE'
    }).then( res => {
      const studentArr = this.state.students.filter( student => {
        return student._id !== id
      })
      this.setState({students: studentArr})
    })
  }

  deleteAssignment = id => {
    fetch(baseURL + "/assignments/" + id, {
      method: 'DELETE'
    }).then( res => {
      const assignmentsArr = this.state.assignments.filter( assignment => {
        return assignment._id !== id
      })
      this.setState({assignments: assignmentsArr})
    })
  }

  // showStudent = (student) => {
  //   fetch(baseURL + '/students/' + student._id, {
  //     method: 'PUT',
  //     body: JSON.stringify({celebrated: !holiday.celebrated}),
  //     headers: {
  //       'Content-Type' : 'application/json'
  //     }
  //   }).then(res => res.json())
  //   .then(resJson => {
  //        const copyHolidays = [...this.state.holidays]
  //         const findIndex = this.state.holidays.findIndex(holiday => holiday._id === resJson._id)
  //         copyHolidays[findIndex].celebrated = resJson.celebrated
  //         this.setState({holidays: copyHolidays})
  //   })
  // }
  
  render() {
    return (
      <div className="App">
        <div className="navBar">
          <img src="logo.png" alt="iGradus logo" className="logo" height="50" width="50"/>
          <h1>iGradus</h1>
          <button type="button" class="btn btn-warning" id="log-out-button">Log Out</button>
        </div>
        <div className="classroomIntroduction">
          <h3>My Classroom</h3>
        </div>
        <div className="studentList">
          <h4 className="section-title">Students</h4>
        <div className="new-form-container">
          <NewStudentForm baseURL={baseURL} handleAddStudent={this.handleAddStudent} />
        </div>
        { this.state.student ? <ShowStudent student={this.state.student} deleteStudent={this.deleteStudent}/> : null}
          {this.state.students.map(student => (
            <div key={student._id} onClick={() => this.getStudent(student)} className="studentCard">
              <img src={student.imageUrl} alt="" className="studentCardImage" height="35" width="35"/>
              <h5>{student.name}</h5>
            </div>
          )
        )}
        </div>
        <div className="assignmentList">
          <h4 className="section-title">Assignments</h4>
          <div className="new-form-container">
            <NewAssignmentForm baseURL={baseURL} handleAddAssignment={this.handleAddAssignment} />
          </div>
          { this.state.assignment ? <ShowAssignment assignment={this.state.assignment} deleteAssignment={this.deleteAssignment}/> : null}
          {this.state.assignments.map(assignment => (
            <div key={assignment._id} onClick={() => this.getAssignment(assignment)} className="assignmentCard">
              <h4>{assignment.name}</h4>
              <h6>{assignment.date}</h6>
            </div>
          )
        )}
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.getStudents();
    this.getAssignments();
  }
}

export default App;
