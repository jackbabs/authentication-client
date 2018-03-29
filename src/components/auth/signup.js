import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Signup extends Component {
  renderField(field){
    const { meta: { touched, error } } = field
    const className = `form-group ${touched && error ? 'has-danger' : '' }`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
        <div className="text-help">
          { touched ? error : '' }
        </div>
      </div>
    )
  }

  handleFormSubmit(values){
    this.props.signupUser(values, () => {
      this.props.history.push('/feature')
    })
  }

  renderAlert(){
    if(this.props.errorMessage){
      return ( 
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render(){
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
        label="Email"
        name="email"
        type="text"
        component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          component={this.renderField}
        />
        <Field
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    )
  }
}

function validate(values){
  const errors = {}

  if(!values.email){
    errors.email = "Please enter an email"
  }
  if(!values.password){
    errors.password = "Please enter a password"
  }
  if(!values.passwordConfirm){
    errors.passwordConfirm = "Please confirm your password"
  }

  if(values.password !== values.passwordConfirm){
    errors.passwordConfirm = "Passwords must match"
  }

  return errors
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  validate,
  form: 'signup'
})(
  connect(mapStateToProps, actions)(Signup)
)
