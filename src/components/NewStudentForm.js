import React from 'react';

class NewStudentForm extends React.Component {
    state = {
      name: '',
      imageUrl: String,
      gpa: 0,
      email: ''
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
            gpa: this.state.gpa,
            email: this.state.email
            }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(resJson => {
          this.props.handleAddStudent(resJson);
          this.setState({
            name: '',
            imageUrl: String,
            gpa: Number,
            email: ''
          });
        })
        .then(event => {
          this.props.handleCloseFormModal(event)
        })

        .catch(error => console.error({ Error: error }));
    };


  
    render() {
      return (
        <div className="form-details">
          <h3>Add A New Student</h3>
          <form onSubmit={this.handleSubmit}>
              <input type="text" id="name" name="name" onChange={this.handleChange} placeholder="Name"/>
              <input type="text" id="imageUrl" name="imageUrl" onChange={this.handleChange} placeholder="Image URL"/>
              <input type="text" id="gpa" name="gpa" onChange={this.handleChange} placeholder="GPA"/>
              <input type="text" id="email" name="email" onChange={this.handleChange} placeholder="Email"/>
              <input type="submit" class="btn btn-success" id="submit-button" value="Enter"/>
          </form>
          <button type="button" class="btn btn-danger" id="submit-button" onClick={this.props.cancelForm}>Cancel</button>
        </div>
        );
      }
  }

  export default NewStudentForm