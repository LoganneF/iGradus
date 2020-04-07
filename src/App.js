import React, {Component} from 'react';
import { BrowserRouter, Route, Link, Redirect, useHistory } from "react-router-dom";
import './App.css';
import NewStudentForm from "./components/NewStudentForm.js";
import NewAssignmentForm from "./components/NewAssignmentForm.js";
import ShowStudent from "./components/ShowStudent.js";
import EditStudent from "./components/EditStudent.js";
import ShowAssignment from "./components/ShowAssignment.js";
import EditAssignment from "./components/EditAssignment.js";
let baseURL = process.env.REACT_APP_BASEURL;
if (process.env.NODE_ENV === "development") {
  baseURL = "https://igradus.herokuapp.com/";
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
fetch(baseURL + "/users")
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
      gpa: '',
      email: ''
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
      copyStudents[findIndex].gpa = resJson.gpa
      copyStudents[findIndex].email = resJson.email
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
      average: '',
      description: ''
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
    copyAssignments[findIndex].average = resJson.average
    copyAssignments[findIndex].description = resJson.description
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
class RenderRoutesFromRouter extends React.Component {
  render() {
    return (
      <div>
        <Route path="/students/" exact component={Students} />
        <Route path="/assignments/" component={Assignments} />
      </div>
    );
  }
}

class App extends React.Component {
  
  state = {
    loginForm: true,
    userLoggedIn: false
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  signUpBoxTrigger = () => {
    this.setState({
      signUpForm: true,
      loginForm: false
    })
  }
  signUpBoxClose = () => {
    this.setState({
      signUpForm: false,
      loginForm: true
    })
  }
  userLogInSuccess = () => {
    this.setState({
      loginForm: false,
      signUpForm: false,
      userLoggedIn: true,
      password: false
    })
  }
  wrongLogin = () => {
    this.setState({
      wrongPassword: true
    })
  }
  //Code for signup
 
  handleSignUp = event => {
    event.preventDefault();
    fetch(baseURL + "/users", {
      method: "POST",
      body: JSON.stringify({ 
          username: this.state.username,
          password: this.state.password
          }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(this.userLogInSuccess())
    .catch(error => console.log(error));
  };
  //Code for login
  
  handleLogin = event => {
    console.log("handleLogin fired");
    event.preventDefault();
    fetch(baseURL + "/sessions", {
      method: "POST",
      body: JSON.stringify({ 
          username: this.state.username,
          password: this.state.password
          }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then( (response) => {
      if (response.ok) {
        console.log("login success")
        this.userLogInSuccess();
      } else {
        console.log("invalid login")
        this.wrongLogin();
      }
    }
    )     
    //conditional
    .catch(err => console.log("Error", err)); 
  };


  logOut = () => {
    this.setState({
      loginForm: true,
      userLoggedIn: false,
      username: '',
      password: ''
    })
  }


  render() {
    console.log(this.state)
    return (
      <BrowserRouter>
      <div className="App">
        <div className="navBar">
          <div className="logo">
            <img src="logo.png" alt="iGradus logo" className="logo-img" height="50" width="50"/>
            <h1>iGradus</h1>
          </div>
          { !this.state.signUpForm && !this.state.loginForm && this.state.userLoggedIn ? 
          <div className="nav-links-container">
            <Link to="/students/"><h4 id="nav-bar-button">Students</h4></Link>
            <Link to="/assignments/"><h4 id="nav-bar-button">Assignments</h4></Link>
            <button type="button" onClick={this.logOut} class="btn btn-light" id="log-out-button">Log Out</button>
          </div>
          : null}
        </div>
        <div className="home-container">
        { this.state.loginForm ?
          <div className="login-container">
            <h4>Login</h4>
            { this.state.wrongPassword ? <p className="incorrect-login-tag">Incorrect username or password</p> : null}
            <form onSubmit={this.handleLogin} className="login-form">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" onChange={this.handleChange} placeholder="username" />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" onChange={this.handleChange} placeholder="password" />
              <button type="submit" class="btn btn-primary" id="login-button">Login</button>
            </form>
            <button type="submit" onClick={this.signUpBoxTrigger} class="btn btn-outline-primary" id="login-button">Sign Up</button>
          </div>
        : null}
        { this.state.signUpForm ?
          <div className="login-container">
            <h4>Sign Up</h4>
            <form onSubmit={this.handleSignUp} className="login-form">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" onChange={this.handleChange} placeholder="username" />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" onChange={this.handleChange} placeholder="password" />
              <button type="submit" class="btn btn-primary" id="login-button">Sign Up</button>
            </form>
            <button type="submit" onClick={this.signUpBoxClose} class="btn btn-outline-primary" id="login-button">Login</button>
          </div>
          : null}
          { this.state.userLoggedIn ?
          <div>
            <h2 className="welcome-user">Welcome, {this.state.username}</h2>
          </div>
          : null}
          </div>
        <RenderRoutesFromRouter/> 
      </div>
      </BrowserRouter>
    )
  }
}
export default App;
