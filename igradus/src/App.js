import React, {Component} from 'react';
import './App.css';

class StudentCard extends React.Component {
  render() {
    return (
      <div>
        <div className="studentCard">
          <img src="favicon.ico" alt="Student Image" className="studentCardImage" height="35" width="35"/>
          <h5>Chris South</h5>
        </div>
        <div className="studentCard">
          <img src="favicon.ico" alt="Student Image" className="studentCardImage" height="35" width="35"/>
          <h5>Loganne Featherston</h5>
        </div>
        <div className="studentCard">
          <img src="favicon.ico" alt="Student Image" className="studentCardImage" height="35" width="35"/>
          <h5>Marco Riesgo</h5>
        </div>
        <div className="studentCard">
          <img src="favicon.ico" alt="Student Image" className="studentCardImage" height="35" width="35"/>
          <h5>Chris Murphy</h5>
        </div>
        <div className="studentCard">
          <img src="favicon.ico" alt="Student Image" className="studentCardImage" height="35" width="35"/>
          <h5>Ira Herman</h5>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="navBar">
          <img src="logo.png" alt="iGradus logo" className="logo" height="50" width="50"/>
          <h1>iGradus</h1>
        </div>
        <div className="classroomIntroduction">
          <h3>My Classroom</h3>
        </div>
        <div className="studentList">
          <StudentCard />
        </div>
      </div>
    )
  }
}

export default App;
