import React, {Component} from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import './App.css';
import NewStudentForm from "./components/NewStudentForm.js";
import NewAssignmentForm from "./components/NewAssignmentForm.js";
import ShowStudent from "./components/ShowStudent.js";
import EditStudent from "./components/EditStudent.js";
import ShowAssignment from "./components/ShowAssignment.js";
import EditAssignment from "./components/EditAssignment.js";

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
    students: [],
    showFormModal: false,
    editStudent: false
  }
  
  getStudent = student => {
    this.setState({
      student,
      showFormModal: false
    })
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
      grade: ''
    });
  };

  handleOpenFormModal = () => {
    this.setState({
      showFormModal: true,
      student: false
    })
  }

  handleCloseFormModal = () => {
    this.setState({
      showFormModal: false
    })
  }

  handleCloseInfoModal = () => {
    this.setState({
      student:false
    })
  }


      
  deleteStudent = id => {
    fetch(baseURL + "/students/" + id, {
      method: 'DELETE'
    }).then( res => {
      const studentArr = this.state.students.filter( student => {
        return student._id !== id
      })
      this.setState({
        students: studentArr,
        student: false
      })
    })
  }

  editStudent = (resJson) => {
      const copyStudents = [...this.state.students]
      const findIndex = this.state.students.findIndex(student => student._id === student._id)
      copyStudents[findIndex].name = resJson.name
      copyStudents[findIndex].imageUrl = resJson.imageUrl
      copyStudents[findIndex].grade = resJson.grade
      this.setState({students: copyStudents})
  }

  handleEditStudentButtonClick = () => {
    this.setState({
      editStudent: true
    });
  }

  handleEditStudentSubmit = () => {
    this.setState({
      editStudent: false
    });
  }
      
  render() {
    return (
      <BrowserRouter>
      <div className="studentList">
        <div className="student-list-heading">
          <h3>Students</h3>
          <button type="button" onClick={this.handleOpenFormModal} class="btn btn-warning" id="add-new-button">Add Student</button>
        </div>
          {this.state.students.map(student => (
            <div key={student._id} onClick={() => this.getStudent(student)} className="studentCard">
              <img src={student.imageUrl} alt="" className="studentCardImage" height="35" width="35"/>
              <h5>{student.name}</h5>
            </div>
          )
        )}
      </div>
      <div className="information-section">
        { this.state.student &&! this.state.editStudent ? <ShowStudent baseURL={baseURL} student={this.state.student} closeInfoModal={this.handleCloseInfoModal} editButtonClick={this.handleEditStudentButtonClick} deleteStudent={this.deleteStudent} /> : null}
        { this.state.student && this.state.editStudent ? <EditStudent baseURL={baseURL} student={this.state.student} closeEditForm={this.handleEditStudentSubmit} editStudent={this.editStudent} /> : null}
        { this.state.showFormModal ? <NewStudentForm baseURL={baseURL} handleAddStudent={this.handleAddStudent} handleCloseFormModal={this.handleCloseFormModal} cancelForm={this.handleCloseFormModal} /> : null}
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
    assignments: [],
    showFormModal: false,
    editAssignment: false
  }

  getAssignment = assignment => {
    this.setState({
      assignment,
      showFormModal: false
    })
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
      date: '',
      name: '',
      grade: ''
    });
  };

  handleOpenFormModal = () => {
    this.setState({
      showFormModal: true,
      assignment: false
    })
  }

  handleCloseFormModal = () => {
    this.setState({
      showFormModal: false
    })
  }

  handleCloseInfoModal = () => {
    this.setState({
      assignment:false
    })
  }


  deleteAssignment = id => {
    fetch(baseURL + "/assignments/" + id, {
      method: 'DELETE'
    }).then( res => {
      const assignmentsArr = this.state.assignments.filter( assignment => {
        return assignment._id !== id
      })
      this.setState({
        assignments: assignmentsArr,
        assignment: false
      })
    })
  }

  editAssignment = (resJson) => {
    const copyAssignments = [...this.state.assignments]
    const findIndex = this.state.assignments.findIndex(assignment => assignment._id === assignment._id)
    copyAssignments[findIndex].name = resJson.name
    copyAssignments[findIndex].date = resJson.date
    copyAssignments[findIndex].grade = resJson.grade
    this.setState({assignments: copyAssignments})
  }

  handleEditAssignmentButtonClick = () => {
    this.setState({
      editAssignment: true
    });
  }

  handleEditAssignmentSubmit = () => {
    this.setState({
      editAssignment: false
    });
  }


  render() {
    return (
      <BrowserRouter>
        <div className="assignmentList">
          <div className="assignment-list-heading">
            <h3>Assignments</h3>
            <button type="button" onClick={this.handleOpenFormModal} class="btn btn-warning" id="add-new-button">Add Assignment</button>
          </div>
          {this.state.assignments.map(assignment => (
              <div key={assignment._id} onClick={() => this.getAssignment(assignment)} className="assignmentCard">
                <h3>{assignment.name}</h3>
                <h5>{assignment.date}</h5>
              </div>
            )
          )}
        </div>
        <div className="information-section">
          { this.state.assignment &&! this.state.editAssignment ? <ShowAssignment baseURL={baseURL} assignment={this.state.assignment} deleteAssignment={this.deleteAssignment} closeInfoModal={this.handleCloseInfoModal} editButtonClick={this.handleEditAssignmentButtonClick} /> : null}
          { this.state.assignment && this.state.editAssignment ? <EditAssignment baseURL={baseURL} assignment={this.state.assignment} closeEditForm={this.handleEditAssignmentSubmit} closeInfoModal={this.handleCloseInfoModal} editAssignment={this.editAssignment} /> : null}
          { this.state.showFormModal ? <NewAssignmentForm baseURL={baseURL} handleAddAssignment={this.handleAddAssignment} handleCloseFormModal={this.handleCloseFormModal} cancelForm={this.handleCloseFormModal} /> : null}
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
        <Route path="/home" exact component={Index} />
        <Route path="/students/" exact component={Students} />
        <Route path="/assignments/" component={Assignments} />
      </div>
    );
  }
}


class App extends React.Component {
  
  state = {
    loginForm: true
  }


  
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <div className="navBar">
          <div className="logo">
            <img src="logo.png" alt="iGradus logo" className="logo-img" height="50" width="50"/>
            <h1>iGradus</h1>
          </div>
          <div className="nav-links-container">
            <Link to="/home"><h4 id="nav-bar-button">Home</h4></Link>
            <Link to="/students/"><h4 id="nav-bar-button">Students</h4></Link>
            <Link to="/assignments/"><h4 id="nav-bar-button">Assignments</h4></Link>
            <button type="button" class="btn btn-light" id="log-out-button">Log Out</button>
          </div>
        </div>
        <div className="login-container">
          <h3>Login</h3>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
            <button type="submit" class="btn btn-primary" id="login-button">Login</button>
          </div>
          <button type="submit" class="btn btn-outline-primary" id="login-button">Sign Up</button>
        </div>
        <div className="login-container">
          <h3>Sign Up</h3>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
            <button type="submit" class="btn btn-primary" id="login-button">Sign Up</button>
          </div>
          <button type="submit" class="btn btn-outline-primary" id="login-button">Login</button>
        </div>

        <RenderRoutesFromRouter/> 
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
