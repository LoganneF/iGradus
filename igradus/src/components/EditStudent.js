import React from 'react'

class EditStudent extends React.Component {
  
  state = {
    name: '',
    imageUrl: '',
    grade: 0
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
          grade: this.state.grade
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
              <input type="boolean" id="grade" name="grade" onChange={this.handleChange} placeholder={this.props.student.grade}/>
              <input type="submit" class="btn btn-success" id="submit-button" value="Submit Edit"/>
          </form>
          <button type="button" class="btn btn-danger" id="submit-button" onClick={this.props.closeEditForm}>Cancel</button>
        </div>
      </>
    )
  }
 }
export default EditStudent