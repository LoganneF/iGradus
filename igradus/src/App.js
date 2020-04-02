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
    students: [],
    showFormModal: false
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
        { this.state.student ? <ShowStudent student={this.state.student} deleteStudent={this.deleteStudent} closeInfoModal={this.handleCloseInfoModal}/> : null}
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
    showFormModal: false
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
          { this.state.assignment ? <ShowAssignment assignment={this.state.assignment} deleteAssignment={this.deleteAssignment} closeInfoModal={this.handleCloseInfoModal}/> : null}
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
            <img src="logo.png" alt="iGradus logo" className="logo-img" height="50" width="50"/>
            <h1>iGradus</h1>
          </div>
          <div className="nav-links-container">
            <Link to="/"><h4 id="nav-bar-button">Home</h4></Link>
            <Link to="/students/"><h4 id="nav-bar-button">Students</h4></Link>
            <Link to="/assignments/"><h4 id="nav-bar-button">Assignments</h4></Link>
            <button type="button" class="btn btn-warning btn-sm" id="log-out-button">Log Out</button>
          </div>
        </div>
        <RenderRoutesFromRouter/> 
      </div>
      </BrowserRouter>
    )
  }
}

export default App;
