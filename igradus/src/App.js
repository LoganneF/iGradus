import React, {Component} from 'react';
import './App.css';

class StudentCard extends React.Component {
  render() {
    return (
      <div className="studentCard">
        <img src="favicon.ico" alt="Sudent Image" className="studentCardImage" height="35" width="35"/>
        <h5>Phillip Morris</h5>
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
        <div className="classroomContent">
          <h3>My Classroom</h3>
          <StudentCard />
        </div>
      </div>
    )
  }
}

export default App;
