import React from 'react'

class EditStudent extends React.Component {
  
  state = {
    name: '',
    imageUrl: '',
    gpa: 0,
    email: ''
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch(this.props.baseURL + "/students/" + this.props.student._id, {
      method: "PUT",
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
        this.props.editStudent(resJson);
      })
      .then(event => {
        this.props.closeEditForm(event)
      })

      .catch(error => console.error({ Error: error }));
  };

  render () {
    return (
      <>
        <div className="form-details">
          <h3>Edit Student</h3>
          <form onSubmit={this.handleSubmit}>
              <input type="text" id="name" name="name" onChange={this.handleChange} placeholder={this.props.student.name}/>
              <input type="text" id="imageUrl" name="imageUrl" onChange={this.handleChange} placeholder={this.props.student.imageUrl}/>
              <input type="text" id="gpa" name="gpa" onChange={this.handleChange} placeholder={this.props.student.gpa}/>
              <input type="text" id="email" name="email" onChange={this.handleChange} placeholder={this.props.student.email}/>
              <input type="submit" class="btn btn-success" id="submit-button" value="Submit Edit"/>
          </form>
          <button type="button" class="btn btn-danger" id="submit-button" onClick={this.props.closeEditForm}>Cancel</button>
        </div>
      </>
    )
  }
 }
export default EditStudent