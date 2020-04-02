import React, {Component} from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
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

class Students extends React.Component {
  state = {
    students: []
  }
  
  getStudent = student => {
    this.setState({student})
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
      
  handleAddStudent = student => {
    const copyStudents = [...this.state.students];
    copyStudents.unshift(student);
    this.setState({
      students: copyStudents,
      name: '',
      imageUrl: '',
      grade: '',
      student: {},
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
      
  render() {
    return (
      <BrowserRouter>
      <div className="dashboard">
        <h3>Class Students</h3>
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
      </div>
      </BrowserRouter>
    );
  }
  componentDidMount() {
    this.getStudents();
  }
}

class Assignments extends React.Component {

  state = {
    assignments: []
  }

  getAssignment = assignment => {
    this.setState({assignment})
  }


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

  render() {
    return (
      <BrowserRouter>
      <div className="dashboard">
        <h3>Class Assignments</h3>
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
      </BrowserRouter>
    );
  }
  componentDidMount() {
    this.getAssignments();
  }
}



class Index extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <div className="dashboard">
        <h3>Dashboard</h3>
        <div className="linkToPage">
          <Link to="/students/"><img src="https://t3.ftcdn.net/jpg/02/95/63/32/240_F_295633293_GXc2GNTuM88snKOU6TU8zViOOnIkSOnZ.jpg" alt="" className="pageLinkImage"/></Link>
          <h3 className="imageLinkText">Students</h3>
        </div>
        <div className="linkToPage">
          <Link to="/assignments/"><img src="https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" className="pageLinkImage"/></Link>
          <h3 className="imageLinkText">Assignments</h3>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}








class RenderRoutesFromRouter extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Index} />
        <Route path="/students/" exact component={Students} />
        <Route path="/assignments/" component={Assignments} />
      </div>
    );
  }
}




class App extends React.Component {
  
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
      <BrowserRouter>
      <div className="App">
        <div className="navBar">
          <div className="logo">
            <img src="logo.png" alt="iGradus logo" className="logo" height="50" width="50"/>
            <h1>iGradus</h1>
          </div>
          <button type="button" class="btn btn-warning btn-sm" id="nav-bar-button">Log Out</button>
          <Link to="/assignments/"><button type="button" class="btn btn-warning btn-sm" id="nav-bar-button">Assignments</button></Link>
          <Link to="/students/"><button type="button" class="btn btn-warning btn-sm" id="nav-bar-button">Students</button></Link>
          <Link to="/"><button type="button" class="btn btn-warning btn-sm" id="nav-bar-button">Home</button></Link>
        </div>
        <div className="container">
          <RenderRoutesFromRouter/> 
        </div>
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
