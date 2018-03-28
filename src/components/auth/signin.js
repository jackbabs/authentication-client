import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Signin extends Component {
  renderField(field){
    const className = "form-group"
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
      </div>
    )
  }
  handleFormSubmit({ email, password }){
    this.props.signinUser({ email, password }, () => {
      this.props.history.push('/feature')
    })
  }
  render(){
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          component={this.renderField}
        />
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(
  connect(null, actions)(Signin)
)