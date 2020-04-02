import React from 'react';

class NewAssignmentForm extends React.Component {
    state = {
      date: String,
      name: String,
      grade: String
    }
  
    handleChange = event => {
      this.setState({ [event.target.id]: event.target.value });
    };
  
    handleSubmit = event => {
        event.preventDefault();
        fetch(this.props.baseURL + "/assignments", {
          method: "POST",
          body: JSON.stringify({ 
              date: this.state.date,
              name: this.state.name,
              grade: this.state.grade
             }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(resJson => {
            this.props.handleAddAssignment(resJson);
            this.setState({
              date: String,
              name: String,
              grade: String
            });
          })
          .catch(error => console.error({ Error: error }));
      };
  
    render() {
      return (
        <div className="add-student-form">
          <h5>Add Assignment</h5>
          <form onSubmit={this.handleSubmit}>
              <input type="text" id="date" name="date" onChange={this.handleChange} value={this.state.date} placeholder="Date"/>
              <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} placeholder="Name"/>
              <input type="text" id="grade" name="grade" onChange={this.handleChange} value={this.state.grade} placeholder="Grade"/>
              <input type="submit" id="submitButton" value="Submit" />
          </form>
        </div>
        );
      }
  }

  export default NewAssignmentForm