import React, {Component} from 'react';
import './App.css';

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


class App extends React.Component {
  
  state = {
    students: []
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
        parsedData => this.setState({ students: parsedData }),
        err => console.log(err)
      );
  };
  
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
          {this.state.students.map(student => (
            <div key={student._id} className="studentCard">
              <img src={student.imageUrl} alt="" className="studentCardImage" height="35" width="35"/>
              <h5>{student.name}</h5>
            </div>
          )
        )}
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.getStudents();
  }
}

export default App;
