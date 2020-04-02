import React from 'react';

class NewAssignmentForm extends React.Component {
    state = {
      date: '',
      name: '',
      grade: ''
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
              date: '',
              name: '',
              grade: ''
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
          <h3>Add A New Assignment</h3>
          <form onSubmit={this.handleSubmit}>
              <input type="text" id="date" name="date" onChange={this.handleChange} placeholder="Date"/>
              <input type="text" id="name" name="name" onChange={this.handleChange} placeholder="Name"/>
              <input type="text" id="grade" name="grade" onChange={this.handleChange} placeholder="Grade"/>
              <input type="submit" class="btn btn-success" id="submit-button" value="Enter"/>
          </form>
          <button type="button" class="btn btn-danger" id="submit-button" onClick={this.props.cancelForm}>Cancel</button>
        </div>
        );
      }
  }

  export default NewAssignmentForm