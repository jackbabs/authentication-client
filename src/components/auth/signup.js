import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import * as actions from '../../actions'

class Signup extends Component {
  renderField(field){
    const className = "form-group"
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
      </div>
    )

  }
  render(){
    return (
      <form>
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
          name="confirmpassword"
          type="password"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'signup',
})(Signup)
