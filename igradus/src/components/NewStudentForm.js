import React from 'react';

class NewStudentForm extends React.Component {
    state = {
      name: '',
      imageUrl: String,
      grade: Number
    }
  
    handleChange = event => {
      this.setState({ [event.target.id]: event.target.value });
    };
  
    handleSubmit = event => {
        event.preventDefault();
        fetch(this.props.baseURL + "/students", {
          method: "POST",
          body: JSON.stringify({ 
              name: this.state.name,
              imageUrl: this.state.imageUrl,
              grade: this.state.grade
             }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(resJson => {
            this.props.handleAddStudent(resJson);
            this.setState({
              name: String,
              imageUrl: String,
              grade: Number
            });
          })
          .catch(error => console.error({ Error: error }));
      };
  
    render() {
      return (
        <div className="add-student-form">
          <h5>Add Student</h5>
          <form onSubmit={this.handleSubmit}>
              <input type="text" id="name" name="name" onChange={this.handleChange} value={this.state.name} placeholder="Name"/>
              <input type="text" id="image" name="image" onChange={this.handleChange} value={this.state.imageUrl} placeholder="Image URL"/>
              <input type="boolean" id="grade" name="grade" onChange={this.handleChange} value={this.state.grade} placeholder="Grade"/>
              <input type="submit" id="submitButton" value="Submit" />
          </form>
        </div>
        );
      }
  }

  export default NewStudentForm